import React, { useEffect, useState } from 'react'
import { BiSolidMessageRoundedEdit } from 'react-icons/bi'
import { BsFileEarmarkPost } from 'react-icons/bs'
import { GiGraduateCap } from 'react-icons/gi'
import { IoFolderOpenSharp } from 'react-icons/io5'
import { MdAccountCircle } from 'react-icons/md'
import { Link, useParams } from 'react-router-dom'
import { OtherUserSidebarLogic } from './OtherUser.js'
import Followers from '../Followers/Followers.jsx'

const OtherUserSideBar = ({setFollwers,showFollowers}) => {
    



const {handleMore,profilePhoto,name} = OtherUserSidebarLogic()

    const params = useParams()
    const [followers,setUserFollwers] = useState([])
    console.log(followers);
    

const getFollowers = async () => {
    try {



        const res = await fetch(`http://localhost:1800/api/follow/getAllFollowers/${params?.id}`) 
const data = await res.json()


console.log('followers',data);

if (data?.result) {

    return  setUserFollwers(data?.result)
}

} catch (error) {

        console.log(error);
        
    }
}



const [followings,setFollwings] = useState([])



const getFollowings = async () => {
    try {



        const res = await fetch(`http://localhost:1800/api/follow/getAllFollowings/${params?.id}`) 
const data = await res.json()

console.log(data);

if (data?.result) {

    return  setFollwings(data?.result)
}

} catch (error) {

        console.log(error);
        
    }
}


useEffect(()=>{
  getFollowers()
  getFollowings()
},[])



  const convertName = (name) => {
  try {
    return name
      ?.split(" ")
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ");
  } catch (error) {
    console.log(error);
    return name; }
}






useEffect(()=>{
handleMore()
},[])


  return (
    <main className='loginUser-main'   >
<div className='user-pic-main-container'> 
<div  className='user-pic-container' >      {profilePhoto ?  <img src={ profilePhoto } alt="err" className='userprofilepic-login_user' />  :   <MdAccountCircle className='MdAccountCircle-login_user' />     }  </div> 
 <h5 className='login-user-name' >  {convertName(name)} </h5>
  </div>
  <div  className='loginUser-ul' >
 <Link className='login_user-link'  to={`/MoreDetails/${params?.id}`} > <div className='login-user-link-sm-box' > <IoFolderOpenSharp className='loginuser-link-icons' /> User Profile </div></Link>   
 <Link className='login_user-link'  to='/chat' > <div className='login-user-link-sm-box' > <BiSolidMessageRoundedEdit className='loginuser-link-icons' />  Message </div></Link>   
 
 <Link className='login_user-link' to={`/OtherUserProjects/${params?.id}`}   > <div className='login-user-link-sm-box' > <GiGraduateCap className='loginuser-link-icons' />  Projects </div></Link>   
 <Link className='login_user-link' to={`/OtherUserPosts/${params?.id}`} > <div className='login-user-link-sm-box' > <BsFileEarmarkPost className='loginuser-link-icons' /> Uploads  </div></Link>   
 <div  onClick={()=>{{setFollwers(!showFollowers)} }} className='login_user-link' > <div className='login-user-link-sm-box' > <p className='loginuser-link-numbers' > {followers?.length} </p>  Followers  </div></div>   
 <div className='login_user-link' > <div className='login-user-link-sm-box' ><p className='loginuser-link-numbers' > {followers?.length} </p>  Following </div></div>   
 
 </div>
 
 

    </main>
  )  
}

export default OtherUserSideBar