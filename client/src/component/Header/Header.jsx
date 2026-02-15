import React, { useEffect } from 'react'
import './Header.css'
import { FaUserTie } from "react-icons/fa";
import { IoIosNotifications } from "react-icons/io";
import { IoHomeSharp } from "react-icons/io5";
import { BiSolidMessageRoundedEdit } from "react-icons/bi";
import { CgMenuLeft } from "react-icons/cg";
import SideBar from '../SideBar/SideBar';
import { useState } from "react"
import { MdAccountCircle } from 'react-icons/md';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { RxCross1 } from "react-icons/rx";
import { GiOfficeChair } from "react-icons/gi";
import { SlLogin } from "react-icons/sl";
import {useDispatch, useSelector} from 'react-redux'
import { searchSliceAction } from '../../store/SearchSlice';
import socket from '../../socket';
import { convertUTCToIST,  getPreciseDateOldness, handleGetNotification } from '../../helper.js';
import { BiCheckDouble } from "react-icons/bi";
import {gsap} from 'gsap';
import {useGSAP} from '@gsap/react'

const Header = () => {

useGSAP(()=>{

const tl = gsap.timeline(); 

tl.from('.CgMenuLeft',{
y:-50,
  delay:.8,
    duration:.5

})


tl.from('.headers-links',{
  y:-50,
stagger:.2,
opacity:0,
  duration:.5

} )


tl.from('form',{
  y:-50,
  opacity:0,
  duration:.5
} )

})


  const [sideBar ,setSideBar ] = useState(false)
  const [key ,setKey ] = useState(false)
  const [notifications ,setNotifications ] = useState([])

  const unseenMsgData = useSelector(s=>s.unseenMsgData)


const loginData =  useSelector(s=>s.loginData)


const dispatch = useDispatch()
const navigate = useNavigate()

const searchCall = async (e) => {
  try {
e.preventDefault()

    const res = await fetch(`http://localhost:1800/api/user/getSearchedUser/${key}`)

const data = await res.json();
dispatch(searchSliceAction.saveSearchRes(data?.result))

navigate('/SearchResult')
  } catch (error) {
    console.log(error);
    
  }
}

useEffect(()=>{
  
const func = async () => {
  const notificationArr =  await handleGetNotification(loginData?.id)


setNotifications(notificationArr?.rows)
}  

func()

},[loginData])




 const deleteNotf = async (nid) => {
try {
        
        const res = await fetch(`http://localhost:1800/api/notf/deleteNotif/${nid}`,{
          method:'DELETE'
        } )

const data = await res.json();


if (data?.success) {
const newArr = notifications?.filter(o=> o?.notf_id !== nid )
return setNotifications(newArr)

}

  } catch (error) {
    console.log(error);
    
  }
}


 const addNotfSeen = async () => {
try {
        
        const res = await fetch(`http://localhost:1800/api/notf/addSeenNotif/${loginData?.id}`,{
          method:'PUT',
          headers:{
            'Content-Type': 'application/json'
          },

        } )

const data = await res.json();

if (data?.success) {
const notificationArr =  await handleGetNotification(loginData?.id)


setNotifications(notificationArr?.rows)
}

  } catch (error) {
    console.log(error);
    
  }
}



const addSelecNotfSeen = async (nid) => {
try {
        

        const res = await fetch(`http://localhost:1800/api/notf/addSeenSelcNotif/${nid}`,{
          method:'PUT',
          headers:{
            'Content-Type': 'application/json'
          },

        } )

const data = await res.json();
console.log(data);

if (data?.success) {
const notificationArr =  await handleGetNotification(loginData?.id)


setNotifications(notificationArr?.rows)
}


  } catch (error) {
    console.log(error);
    
  }
}



useEffect(()=>{
socket.on('recievenotf',(data)=>{

setNotifications(prev=>[...prev,data[0] ] )

  }
)
  return ()=>{
 socket.off('recievenotf') 
}

},[])


const unSeenNotf = notifications?.filter(n=>n?.is_read != true )






  return (
    <>
<main className='header-main' >

<nav className="navbar navbar-expand-sm navbar header "   >
  <div   className="header-div  container-fluid">
    <button className="navbar-brand    " to=""   onClick={()=>{setSideBar(!sideBar)}} ><CgMenuLeft className='CgMenuLeft' />  </button>
    <form className=" form-sm "  role="search">
        <input   className="  form-control me-2 search-second " type="search" placeholder="Search" aria-label="Search"/>
      </form>
   
      <ul className="navbar-nav me-auto header-ul-small ">
        <li className="nav-item header-li-sm ">
          <Link className="nav-link headers-links-sm " to='/Jobs' > <FaUserTie  className='FaUserTie-sm' /> <p className='head-p-sm'>Jobs</p> </Link>
        </li>
        
        <li className="nav-item header-li-sm ">
          <Link className="nav-link headers-links-sm "  to="" > <IoIosNotifications className='FaUserTie-sm' /> <p className='head-p-sm'>  notifications</p> </Link>
        </li>
        <li className="nav-item header-li-sm">
          <Link className="nav-link headers-links-sm "  to="/Messages"  >  <BiSolidMessageRoundedEdit className='FaUserTie-sm' /> <p className='head-p-sm'>  messages  </p> </Link>
        </li>
        <li className="nav-item header-li-sm ">
          <Link className="nav-link headers-links-sm " to=""> < MdAccountCircle  className='MdAccountCircle-sm' /> <p className='head-p-sm'>Sign-in  </p> </Link>
        </li>
      
      </ul>
     
   
    <div     className="collapse   navbar-collapse header-sec-div " id="navbarTogglerDemo02">
      <ul  className="navbar-nav  me-auto header-ul ">
        <li   className="nav-item header-li  ">
          <Link className="nav-link  headers-links "  to=""> <IoHomeSharp className='FaUserTie' /> <p> Home </p>  </Link>
        </li>
        <li  className="nav-item header-li  ">
          <Link className="nav-link headers-links " to={loginData?.role == 'Enterprise' ? '/EnterpriseJobs'  :   '/Jobs'}  > <GiOfficeChair   className='FaUserTie' /> <p>  Jobs</p> </Link>
        </li>
    {  loginData !== null ?  <>     <div  class="dropdown  ">
  <Link className=" nav-link headers-links "  to="" data-bs-toggle="dropdown" aria-expanded="false"  > <IoIosNotifications className='FaUserTie'   /> {unSeenNotf?.length == 0 ? <></>  :  <small className='notifNotif' > { unSeenNotf?.length} </small>  } <p>  notifications</p> </Link>
  <ul class="dropdown-menu  notific-ul ">
{notifications?.length == 0 ? <div style={{width:'100%',height:"100%",display:'flex',justifyContent:'center',alignItems:'center'  }} >

<img src="../../../public/images/nonotf.png"  height='50%' alt="" />

</div>   : <><li className="markallRead" >
  <small className='mx-1 markallReadsmall' onClick={(e)=>{ e.stopPropagation();addNotfSeen()}} > <BiCheckDouble /> Mark All Read</small>
</li>
   {[...notifications]?.reverse()?.map((n,i)=> <li  key={i}  >
 
    
    <Link
  to={
    n?.type === 'like' || n?.type === 'comment'
      ? `/notifPost/${n?.receiver_id}/${n?.entity_id}`
      : n?.type === 'follow' || n?.type === 'views'
      ? `/OtherUserPosts/${n?.sender_id}`
      : ''
  }
  className={ `dropdown-item  ${n?.is_read ? 'notifc-dropdown-item'  :  'notifc-dropdown-item-unseen' } ` }   

onClick={ n?.is_read ?  <></> : (e)=>{ e?.stopPropagation(); addSelecNotfSeen(n?.notf_id)  }      }

>  {n?.profile_photo ? <img className='img-notiifc' src={n?.profile_photo } alt="" />: <MdAccountCircle className='MdAccountCircle-notiifc'  />  }
     <div className='notific-large-div' > <h6 className='notific-user-name' > {n?.name} </h6>
     <div className='notific-large-div-para' > <p className='notf-text' >
      {n?.type  == 'like' ?  n?.text?.replace('user', n?.name )  :n?.type  == 'follow' ? n?.text.replace('user', n?.name )  :n?.type  == 'views' ? n?.text.replace('user', n?.name  )?.replace( 'time' , 'at '+  convertUTCToIST(n?.created_at)?.split(', ')[1]  )
      
      : n?.type  == 'comment'?  n?.text?.replace('user' , n?.name) : <></> }  </p> </div> <small className='notific-small' > 
        
        { convertUTCToIST(n?.created_at)?.split(', ')[0] == 'Today' ? convertUTCToIST(n?.created_at) 
         :  getPreciseDateOldness(n?.created_at)} </small>     </div>  <RxCross1 className='RxCross1-notifc' onClick={(e)=>{e.preventDefault(), e.stopPropagation(),deleteNotf(n?.notf_id)}}  /> </Link></li>
   ) } 
</> }



  </ul>
</div>

        <li className="nav-item header-li">
          
          <Link className="nav-link headers-links "  to="/chat" >  <BiSolidMessageRoundedEdit className='FaUserTie' /> {unseenMsgData?.length == 0 ? <></>  :<small className='msgNotif' > { unseenMsgData?.length} </small> } <p>  messages   </p>   </Link>
          
        </li>
    </>  :  <li className="nav-item  header-li  ">
          <Link className="nav-link  headers-links "  to="/Login"> <SlLogin className='FaUserTie' /> <p> SignIn </p>  </Link>
        </li>
         }  
      </ul>
      <form className="d-flex  "  role="search">
        <input className="form-control me-2 search-bar-form    " onChange={(e)=>{setKey(e.target.value)}}   type="search" placeholder="Search" aria-label="Search"/>
        <button className="btn btn-success search-bar-form "  onClick={searchCall}  type="submit">Search</button>
      </form>
    </div>
  </div>
</nav>
</main>


{ sideBar ? <SideBar/>: <></> }
</>
)
}
export default Header