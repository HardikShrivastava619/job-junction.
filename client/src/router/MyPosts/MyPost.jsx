import  { useEffect } from 'react'
import './MyPost.css'
import { SlDislike, SlLike } from 'react-icons/sl'
import { FaRegCommentDots } from 'react-icons/fa'
import { RxPlus } from 'react-icons/rx'
import { MyPostLogic } from './MyPost.js'
import { PiDotsThreeVerticalBold } from 'react-icons/pi'
import { RiDeleteBin6Line } from 'react-icons/ri'
import PostForm from '../../component/Modals/PostUploadationForm/PostForm.jsx'
import { BiSolidDislike, BiSolidLike } from 'react-icons/bi'


const MyPost = () => {
  
  
const {hanldepostLike,hanldepostDisLike,loginData,handleGetPosts,posts,showPostForm, handleDeletePost,setPostForm,getDateDifference } = MyPostLogic()



  useEffect(()=>{

handleGetPosts()

  },[loginData])
  
  
  return (
    

    <main className='myPost-main' >
      
{showPostForm ?  <PostForm handleGetPosts={handleGetPosts} setPostForm={setPostForm} /> : <></>  }



<div className='add_post_plus-icon-cont' > <RxPlus className='add_post_plus-icon' onClick={()=>{setPostForm(!showPostForm)}}  />
</div>
   
   
    {posts?.length > 0 ? <> { [...posts].reverse().map((p,i)=>      <div  key={i} class="card  card-myPost mb-3">
 <div class="dropdown PiDotsThreeVerticalBoldpost-page "  >
    <div className='PiDotsThreeVerticalBoldIcon-postpage  ' data-bs-toggle="dropdown" aria-expanded="false" >
      <PiDotsThreeVerticalBold     />
    </div>
        <ul class="dropdown-menu  "  >
        <li onClick={()=>{handleDeletePost(p?.id)} }  ><a class="dropdown-item-home dropdown-item " href="#"><RiDeleteBin6Line/>   Delete Post  </a></li>
       </ul>
    </div>

<div id={`carouselExampleIndicators${i}`}   class=" crouser-imgSlide  carousel slide">
  <div class="carousel-indicators"  >
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

  <div  style={{height:'105%'}} class="carousel-inner" >
    {JSON.parse(p?.photo_uploads || '[]').map((imgPath, index) => (
      <div key={index} class={`carousel-item ${index === 0 ? 'active' : ''}`}>
        <img style={{height:'50vh'}}
          src={imgPath.replace('../client/public', '')}
          class="d-block w-100 "
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
      <div class="card-body post-descrip-and-likecontai" >
    <p class="card-text post-descrip "  > {p?.description}.</p>
        <div  className='post-like-dilikecont'   >   <div className='mypost-likedislikecont'>
           <div>    { JSON.parse(p?.likes)?.includes(loginData?.id?.toString()) === false  || p?.likes === null  ? <SlLike  style={{cursor:'pointer',marginBottom:"1vh"}}  onClick={()=>{hanldepostLike( {pid:p.id,id:loginData?.id} )}} />  : <BiSolidLike   className='text-success' style={{cursor:'pointer',marginBottom:"1vh"}}  onClick={()=>{hanldepostLike({pid:p.id,id:loginData?.id})}} />  } {p?.likes === null ? 0  : JSON.parse(p?.likes)?.length }     </div> <div>       {JSON.parse(p?.disLikes)?.includes(loginData?.id?.toString()) === false ||  p?.disLikes === null   ? <SlDislike className='mx-1'  style={{cursor:'pointer'}} onClick={()=>{hanldepostDisLike({pid:p.id, id:loginData?.id })}}  /> :  <BiSolidDislike className='text-danger'   style={{cursor:'pointer'}} onClick={()=>{hanldepostDisLike({pid:p.id, id:loginData?.id })}}  ></BiSolidDislike> } 
           {p?.disLikes === null  ?  0 :  JSON.parse(p?.disLikes).length } </div>     <div> <FaRegCommentDots /> 42 </div> </div>   <small className='my-post-timing text-secondary ' >
             {getDateDifference(p?.created_at)?.days >= 1   ?  `${getDateDifference(p?.created_at)?.days} days ago `  :  getDateDifference(p?.created_at)?.hours >= 1 ?   `${getDateDifference(p?.created_at)?.hours} hours ago `   : getDateDifference(p?.created_at)?.minutes  >= 1  ? `${getDateDifference(p?.created_at)?.minutes} minutes ago `  : `${getDateDifference(p?.created_at)?.seconds} sec ago ` }    </small>
        </div>
    </div>
</div>)
     }
</> :  <div style={{height:'75vh',display:'flex', flexDirection:'column', justifyContent:'center', gap:'5vh',  alignItems:'center' }}>
<img style={{ }} src='../../../public\images\no_cont_yet.jpg' />
<h3> Not Post Yet </h3>  
</div> }

     
      
      </main>
  

  )
}

export default MyPost
