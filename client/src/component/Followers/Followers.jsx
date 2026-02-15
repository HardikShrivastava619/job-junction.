import React from 'react';
import './Followers.css';
import { MdAccountCircle } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { RxCross1 } from 'react-icons/rx';
import { followersLogic } from './Followers.js';


const Followers = ({getFollowers,loginData,followers,checkFollows,setShowFollower}) => {


const {handleUnfollow} = followersLogic(getFollowers,checkFollows)



const isLoginUserFollow = followers?.findIndex( f=>  f?.followers_id == loginData?.id  )
console.log(followers);




  return (
    <main className='follwersMain' >
<small  style={{alignSelf:'end', cursor:'pointer',fontSize:'1rem' }}  onClick={()=>{setShowFollower(false)}}  > <RxCross1/> </small>
<form action="  "  className='searchFollowersForm' >   
   <input   placeholder=  'Search here'  type="search" className='searchFollowers form-control ' />

 </form>



{isLoginUserFollow !== -1  ? <div className='self-user' >

<Link  className='follwers-name-link' >
 {followers[isLoginUserFollow]?.profile_photo ? <img className='follwers-img' src={followers[isLoginUserFollow]?.profile_photo?.split('..\\client\\')?.join('..\\..\\..\\') } alt="" />  : <MdAccountCircle className='follwersMdAccountCircle' />  
   }  

   <small> {followers[isLoginUserFollow]?.name  } </small>
<button className=' btn btn-outline-danger follow-page-btn' onClick={()=>{handleUnfollow(followers[isLoginUserFollow]?.id)}}  >
    unfollow
</button>
  </Link>


</div>
  :  <></>  }




<div className='folliwers-ul  '   >

{followers?.length > 0  ?  followers?.map((f,i)=> f?.followers_id == loginData?.id  ?   <></> : <Link key={i} className='follwers-name-link' >
{f?.profile_photo ?   <img  className='follwers-img' src={f?.profile_photo} alt="" /> : <MdAccountCircle className='follwersMdAccountCircle' /> }
 
   <small> {f?.name} </small>
<button className=' btn btn-outline-danger follow-page-btn' onClick={()=>{handleUnfollow(f?.id)}}  >
    unfollow
</button>

  </Link>  
) :    <span style={{ color: 'gray', fontStyle: 'italic' }}>
      No One Is Following you
    </span>
  }




</div>
    </main>
  )
}

export default Followers



//