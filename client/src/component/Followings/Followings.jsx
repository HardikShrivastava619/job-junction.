import React from 'react';
import './Followings.css';
import { MdAccountCircle } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { CiSearch } from "react-icons/ci";
import { RxCross1 } from 'react-icons/rx';
import { followeingsLogic } from './Followings.js';
import { useEffect } from 'react';


const Followings = ({getFollowings,paramsId,loginData,setShowFollowings,followings}) => {


const {handleUnfollow,handleGetName,name} = followeingsLogic(getFollowings,paramsId)


useEffect(()=>{
handleGetName()

},[paramsId])



  return (
    <main className='follwersMain' >
<small  style={{alignSelf:'end', cursor:'pointer',fontSize:'1rem' }}  onClick={()=>{setShowFollowings(false)}}  > <RxCross1/> </small>
<form action="  "  className='searchFollowersForm' >   
   <input   placeholder=  'Search here'  type="search" className='searchFollowers form-control ' />

 </form>

<div className='folliwers-ul' >

{followings?.length > 0  ?  followings?.map((f,i)=> <Link key={i} className='follwers-name-link' >
{f?.profile_photo ?   <img  className='follwers-img' src={f?.profile_photo} alt="" /> : <MdAccountCircle className='follwersMdAccountCircle' /> }
 
   <small> {f?.name} </small>

{

  paramsId == loginData?.id ?  <button className=' btn btn-outline-danger follow-page-btn' onClick={()=>{handleUnfollow(f?.id)}}  >
    unfollow
</button>
 : <></>
 }

  </Link>
) :    <span style={{ color: 'gray', fontStyle: 'italic' }}>

{loginData?.id == paramsId ? 'You are not Following any one'  : ` ${name} is not Following any one`   }

    </span>
  }




</div>
    </main>
  )
}

export default Followings