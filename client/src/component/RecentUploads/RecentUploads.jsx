import React from 'react'
import { SlDislike, SlLike } from 'react-icons/sl';
import { PiDotsThreeVerticalBold } from 'react-icons/pi';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { MdAccountCircle } from 'react-icons/md';
import { FaRegCommentDots } from 'react-icons/fa';
import { Link, useParams } from 'react-router-dom';
import './RecentUpload.css'
import {recentUploadLogic} from './RecentUploads.js';
import { useEffect } from 'react';

const RecentUploads = () => {



const {handleGetPosts,loginData,posts}= recentUploadLogic();





const params = useParams()
useEffect(()=>{
 handleGetPosts()
},[loginData])






  return (
<div  className=' profile-third-mainddiv'  >

<h1> Recent Uploads</h1>

{posts?.map((p,i)=> <div  key={i} style={{cursor:'pointer'}}  className='profilepost-cont' >



<div id={`carouselExampleIndicators${i}`} class="carousel post-pic carousel-home slide">
  <div class="carousel-indicators">
    {JSON.parse(p?.photo_uploads || '[]').map((_, index) => (
      <button
        key={index}
        type="button"
        data-bs-target={`#carouselExampleIndicators${i}`}
        data-bs-slide-to={index}
        className={index === 0 ? "active" : ""}
        aria-current={index === 0 ? "true" : undefined}
        aria-label={`Slide ${index + 1}`}
      ></button>
    ))}
  </div>

  <div  class="carousel-inner" >
    {JSON.parse(p?.photo_uploads || '[]').map((imgPath, index) => (
      <div key={index} class={`carousel-item ${index === 0 ? 'active' : ''}`}>
        <img
          src={imgPath.replace('../client/public', '')}
          class="d-block w-100 crousel-img-recent"
          alt={`Slide ${index + 1}`}
        />
      </div>
    ))}
  </div>

  <button class="carousel-control-prev" type="button" data-bs-target={`#carouselExampleIndicators${i}`} data-bs-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Previous</span>
  </button>

  <button class="carousel-control-next" type="button" data-bs-target={`#carouselExampleIndicators${i}`} data-bs-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Next</span>
  </button>
</div>


<div   className=' post-det-cont  ' >
  <div   className='profilepage-post-user-info' > {loginData?.profile_photo ? 
    <img src={loginData?.profile_photo } alt=""  className='post-user-info-img ' />   : <MdAccountCircle className='post-user-info-MdAccountCircle recent-Uploads-SlLike' />   }   
   <small> {loginData?.name} </small> 
  
   <div  class="dropdown">
    <div className='home-PiDotsThreeVerticalBold' data-bs-toggle="dropdown" aria-expanded="false" ><PiDotsThreeVerticalBold  className='recent-Uploads-SlLike'   />
    </div>
        <ul class="dropdown-menu home-dropdown ">
        <li><a class="dropdown-item-home dropdown-item " href="#"><RiDeleteBin6Line/>   Delete Post  </a></li>
       </ul>
    </div>
   
  
     </div>
<div   className='profilepage-post-info ' >  

<small className='profilepage-post-descrip'  > {p?.description} </small>    
   
   <div  className='home-div-first' > 
      <div   className='profilepage-likedislikecont' >  <div><SlLike className='mb-1 recent-Uploads-SlLike'  /> 20k  </div> <div> <SlDislike className='recent-Uploads-SlLike'  /> 50k </div>     <div> <FaRegCommentDots className='mb-1 recent-Uploads-SlLike' /> 42 </div> </div>
    </div>
  

<small  className= 'profilepage-post-timing text-secondary ' > 4 days ago </small>
    
</div>

  
   </div>


</div>
 ) }


<Link   to={ loginData?.id == params?.id ?  `/MyPost/${params?.id}`   :   `/OtherUserPosts/${params?.id}` }   className='show-all' >  {'<<< Show all >>>'} </Link>


</div>


  )
}

export default RecentUploads