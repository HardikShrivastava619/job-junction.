import { matchPath, Outlet, useLocation, useNavigate } from "react-router-dom"
import Header from "./component/Header/Header"
import Loading from "./component/Loading.jsx"

import LoginUser from "./component/LoginUser/LoginUser"
import {  useEffect, useState } from "react"
import Followers from "./component/Followers/Followers.jsx"
import OtherUserSideBar from "./component/otherUserSideBar/OtherUser.jsx"
import socket from "./socket.js"
import { useDispatch, useSelector } from "react-redux"
import { unSeenMsgsAction } from "./store/unseenMsgsNumber.js"

function App() {
const loginData = useSelector(s=>s.loginData)


useEffect(()=>{
  socket.emit('register-user',loginData?.id)
},[loginData])






const location = useLocation()
const unSeenMsgData = useSelector(s=>s.unseenMsgData)
const dispatch = useDispatch()
const msgRoute = ['/chat']
const executeFunc = msgRoute.some((r)=>matchPath({path:r,exact:true},location.pathname ))



useEffect(()=>{
  
  if (!executeFunc) {
      socket.on('receiveMessage'  , async(data) => {
      
if (data?.receiverId == loginData?.id) {
  
  
     const updatedUnseen = [...unSeenMsgData, data];
  dispatch(unSeenMsgsAction.unSeenMsgNumb(updatedUnseen));

     const audio = new Audio("../../../public/audioFiles/msgCamesound.mp3");
       
audio.play();

  
}
      

      })
  }
  return () => {
  socket.off('receiveMessage');
};

},[executeFunc])




const route = [ '/MoreDetails/:id', '/JobForm', '/chat','/OtherUserPosts/:id','/OtherUserProjects/:id' ]
const hideLoginUser = route?.some((r)=> matchPath({path:r , exact:true}, location.pathname  )  )


const routeSec = [ '/OtherUserPosts/:id' , '/OtherUserProjects/:id' ]
const showOtherUserSideBar = routeSec?.some((r)=> matchPath({path:r , exact:true}, location.pathname  )  )



const [showFollowers , setFollwers] = useState(false)



const entryroutes = [ '/login' , '/Register' ]
const isEntryroutes = entryroutes?.some((r)=> matchPath({path:r , exact:true}, location.pathname  )  )







const [isLoad , setLoad] = useState(false)

const navigate = useNavigate();
const token = JSON.parse(localStorage.getItem('jobJuncToken'))



useEffect(()=>{
if (token) {
  console.log('jai ram ji ki');
  
}
else{
  console.log('jai ram ji ki bolo har bar');
console.log("entryroutes",isEntryroutes)
  if (!isEntryroutes) {
    setLoad(true)
  


setTimeout(()=>{    navigate('/login')
},5000)
  }
}

},[token])


  return (
    <main style={{ backgroundColor:'whitesmoke', height:"100vh",width:'100vw',position:'fixed',  }} >
  
  {isLoad ? <Loading/>  :<></>    }
   <Header/> 
<div className="outlet-cont">  { showFollowers === true  ? <div style={{  position:'absolute', left:'25vw',  zIndex:'5',top:'4.8vh',  }} >  <Followers  ></Followers>
 </div>  :<></>  }    
   <Outlet></Outlet>

{hideLoginUser ?   <></>  :        <LoginUser  setFollwers={setFollwers} showFollowers ={showFollowers} >  </LoginUser>  }
{showOtherUserSideBar ?   <OtherUserSideBar></OtherUserSideBar>   : <></>  }
</div>
    </main>
  )
}

export default App
