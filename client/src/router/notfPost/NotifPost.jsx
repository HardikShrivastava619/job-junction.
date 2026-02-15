import  { useEffect, useState } from 'react'
import './NotifPost.css'
import { SlDislike, SlLike } from 'react-icons/sl'
import { FaRegCommentDots } from 'react-icons/fa'
import { RxPlus } from 'react-icons/rx'
import { MyPostLogic } from '../MyPosts/MyPost.js'
import { PiDotsThreeVerticalBold } from 'react-icons/pi'
import { RiDeleteBin6Line } from 'react-icons/ri'
import { BiSolidDislike, BiSolidLike } from 'react-icons/bi'
import LikersModel from '../../component/Modals/LikersModel/LikersModel.jsx'
import { useParams } from 'react-router-dom'


const NotifPost = () => {
  
  
const {hanldepostLike,hanldepostDisLike,loginData,handleGetPosts,posts,showPostForm, handleDeletePost,setPostForm,getDateDifference } = MyPostLogic()

 const [likersModal,setLikersModal] = useState(false)
 const [cuurPost,setCurrPost] = useState(null)
 const [recvid,setRecvid] = useState(null)
 const [likers,setLikers] = useState([])

const [likedModal,setLikedModal] = useState(true)


  useEffect(()=>{

handleGetPosts()

  },[loginData])
  
const params = useParams()



const handleLikers = async (i) => {

  
  if (!posts || ![...posts].reverse()[i] || ![...posts].reverse()[i].likes) return;

  try {
    const likerIds = JSON.parse([...posts].reverse()[i].likes);
    
    
    const responses = await Promise.all(
      likerIds.map(async m => {
        const res = await fetch(`http://localhost:1800/api/user/get_ourProfile/${m}`);
        return await res.json();

      })
    );

    setLikers(responses);
  } catch (error) {
    console.log("Error fetching likers:", error);
  }
};



  
  return (
    

    <main className='notf-main' >
      

{ !likersModal ? <></> :<LikersModel  likedModal={likedModal}  cuurPost={cuurPost} recvid={recvid}  hanldepostDisLike={hanldepostDisLike} hanldepostLike={hanldepostLike}  setLikersModal={setLikersModal} likers={likers}  ></LikersModel>  }


   
   
    {posts?.length > 0 ? <> { [...posts].reverse().map((p,i)=>   p?.id == params?.pid ?  <div  key={i} class="card  card-myPost mb-3">
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
      <div class="card-body notf-descrip-and-likecontai" >
    <p class="card-text notf-descrip "  > {p?.description}.</p>
        <div  className='notf-like-dilikecontt '   >   <div className=' mypost-likedislikecont'>
           <div  >   

 { JSON.parse(p?.likes)?.includes(loginData?.id?.toString()) === false  || p?.likes === null  ? <SlLike  style={{cursor:'pointer',marginBottom:"1vh"}}  onClick={()=>{hanldepostLike( {pid:p.id,id:loginData?.id} )}} />  : <BiSolidLike   className='text-success' style={{cursor:'pointer',marginBottom:"1vh"}}  onClick={()=>{hanldepostLike({pid:p.id,id:loginData?.id})}} />  } {p?.likes === null ? 0  : JSON.parse(p?.likes)?.length }   

      
              </div> 
            
            
            

            <div>       {JSON.parse(p?.disLikes)?.includes(loginData?.id?.toString()) === false ||  p?.disLikes === null   ? <SlDislike className='mx-1'  style={{cursor:'pointer'}} onClick={()=>{hanldepostDisLike({pid:p.id, id:loginData?.id })}}  /> :  <BiSolidDislike className='text-danger'   style={{cursor:'pointer'}} onClick={()=>{hanldepostDisLike({pid:p.id, id:loginData?.id })}}  ></BiSolidDislike> } 
           {p?.disLikes === null  ?  0 :  JSON.parse(p?.disLikes).length } </div>     <div> <FaRegCommentDots /> 42 </div>
           
           
            </div>  



             <small className='notf-timing text-secondary ' >
             {getDateDifference(p?.created_at)?.days >= 1   ?  `${getDateDifference(p?.created_at)?.days} days ago `  :  getDateDifference(p?.created_at)?.hours >= 1 ?   `${getDateDifference(p?.created_at)?.hours} hours ago `   : getDateDifference(p?.created_at)?.minutes  >= 1  ? `${getDateDifference(p?.created_at)?.minutes} minutes ago `  : `${getDateDifference(p?.created_at)?.seconds} sec ago ` }    </small>
        </div>
     <small className='post-sjowlikers'  onClick={()=>{handleLikers(i); setLikersModal(true) ; setCurrPost(p?.id); setRecvid(p?.user_id)   }} >  show Likes..  </small>    
 
    </div>
</div> 
:<></>

)
     }
</> :  <div style={{height:'75vh',display:'flex', flexDirection:'column', justifyContent:'center', gap:'5vh',  alignItems:'center' }}>
<img style={{ }} src='../../../public\images\no_cont_yet.jpg' />
<h3> Not Post Yet </h3>  
</div> }

     
      
      </main>
  

  )
}

export default NotifPost
