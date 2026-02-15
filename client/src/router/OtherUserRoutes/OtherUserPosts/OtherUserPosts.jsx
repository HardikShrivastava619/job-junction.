

import  { useEffect } from 'react'
import './OtherUserPosts.css'
import { SlDislike, SlLike } from 'react-icons/sl'
import { FaRegCommentDots } from 'react-icons/fa'
import { RxPlus } from 'react-icons/rx'
import { PiDotsThreeVerticalBold } from 'react-icons/pi'
import { RiDeleteBin6Line } from 'react-icons/ri'
import PostForm from '../../../component/Modals/PostUploadationForm/PostForm.jsx'
import { BiSolidDislike, BiSolidLike } from 'react-icons/bi'
import { otherUserPost } from './OtherUserPosts.js'
import { convertUTCToIST } from '../../../helper.js'
 

const OtherUserPosts = () => {
   
const {hanldepostLike,hanldepostDisLike,loginData,hanldeGetComment,commText,setText,hanldeComment, allComm,handleGetPosts,posts, getDateDifference } = otherUserPost()



  useEffect(()=>{

handleGetPosts()

  },[loginData])
  
  
  return (
    

    <main className='myPost-main  ' >
      
   
   
    {posts?.length > 0 ? <> { [...posts].reverse().map((p,i)=>      <div  key={i} class="card mt-5 card-myPost mb-3">
 
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
           {p?.disLikes === null  ?  0 :  JSON.parse(p?.disLikes).length } </div>     
           
           <div class="dropright" onClick={()=>{hanldeGetComment(p?.id) 
            }} >
             <div  data-bs-toggle="dropdown" aria-expanded="false">
           <FaRegCommentDots /> <small>{p?.commentCount} </small> </div>
             <ul class="dropdown-menu commnetUl" onClick={(e)=>{e.stopPropagation()}} >
               <li><div class="dropdown-item bg-light comment-search-div" >  
                  <img   src={loginData?.profile_photo?.split('..\\client\\')?.join('..\\..\\..\\') } alt="" className='comm-self-img' /> 
                 
                 <input type="text" value={commText}    className='coment-input'  onChange={(e)=>{setText(e?.target?.value)   }}  />
           <button className='btn btn-warning comment-btn'  onClick={()=>{   commText?.trim()?.length > 0  && hanldeComment({pid:p?.id ,text:  commText,uid:p?.user_id });  setText("")   }} >  Comment </button>
           
                   </div> </li>
           <div className='comm-div' >
           
           {
           [...allComm]?.reverse()?.map((c,i)=>    <div  key={i} className='other-comm-box  ' >
              <div className='comm-fisrtBox'  >
            <img   src={c?.profile_photo?.split('..\\client\\')?.join('..\\..\\..\\') }  alt="" className='comm-img' /> 
           
           <small className='comm-name '  > {c?.name} </small>
           <div class="dropup comm-thrredot " >
               <div  data-bs-toggle="dropdown" aria-expanded="false" ><PiDotsThreeVerticalBold    />
               </div>
                   <ul class="dropdown-menu  ">
                   <li onClick={()=>{hanldedeleteComment({cid:c?.comment_id , pid:p?.id} )}}>
           {p?.user_id == loginData?.id  || c?.sender_id == loginData?.id  ?<a class="dropdown-item-comm dropdown-item " href="#">  
           <RiDeleteBin6Line   />   Delete   </a> :
           <a class="dropdown-item-comm dropdown-item " href="#">
           <RiDeleteBin6Line   />   Report  </a> 
           
           
           
           } 
           
           
           
            </li>
                  </ul>
               </div>
             
           
             </div> 
                 <div className='comm-secBox' >
           
           
           <small className='comm-text'  >{c?.text}
           </small>
           
           <div className='commtimeCont ' >
           
           
           
           
           
           
           <small style={{fontSize:'x-small'}} >  {convertUTCToIST(c?.created_at)}  </small>
           </div>
                 </div>
               
               
               
               </div>
           
           
           )
           }
           
             </div>        
             </ul>
           </div>
           
           
           
            </div>   <small className='my-post-timing text-secondary ' >
             {getDateDifference(p?.created_at)?.days >= 1   ?  `${getDateDifference(p?.created_at)?.days} days ago `  :  getDateDifference(p?.created_at)?.hours >= 1 ?   `${getDateDifference(p?.created_at)?.hours} hours ago `   : getDateDifference(p?.created_at)?.minutes  >= 1  ? `${getDateDifference(p?.created_at)?.minutes} min ago `  : `${getDateDifference(p?.created_at)?.seconds} sec ago ` }    </small>
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

export default OtherUserPosts
