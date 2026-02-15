import './Projects.css'
import {Link} from 'react-router-dom'
import { SlDislike, SlLike } from 'react-icons/sl'
import { FaRegCommentDots } from 'react-icons/fa'
import { MyProjectLogic } from './Project'
import { PiDotsThreeVerticalBold } from 'react-icons/pi'
import { RiDeleteBin6Line } from 'react-icons/ri'
import { useEffect } from 'react'
import { RxPlus } from 'react-icons/rx'
import ProjedctForm from '../../component/Modals/ProjectUploadation/ProjedctForm.jsx'
import { BiSolidDislike, BiSolidLike } from "react-icons/bi";

const Viewers = () => {

const {hanldeprojectDisLike,  hanldeprojectLike,handleGetProject,loginData,projects,showProjectForm,setProjectForm,handleDeleteProject} =  MyProjectLogic();




useEffect(()=>{
  handleGetProject()
},[loginData])



  return (
    <main className='projects-main'  >   
    
<div className='add_post_plus-icon-cont'  > <RxPlus className='add_project_plus-icon' onClick={()=>{setProjectForm(!showProjectForm)}}  />
</div>

{showProjectForm ?  <ProjedctForm  setProjectForm={setProjectForm} handleGetProject={handleGetProject} ></ProjedctForm> : <></>  }

<div className='mainSubDivProject'   >


{  projects?.length > 0 ?  [...projects]?.reverse().map((p,i)=><> <div  key={i}  className='project-cont card'> 
         <div class="dropdown dots-contProjectPage "  >
    <div className='dots-projectpage mb-1'   data-bs-toggle="dropdown" aria-expanded="false" >
      <PiDotsThreeVerticalBold     />
    </div>
        <ul class="dropdown-menu  "  >
        <li onClick={()=>{handleDeleteProject(p?.id)} }  ><a class="dropdown-item-home dropdown-item " href="#"><RiDeleteBin6Line/>   Delete Post  </a></li>
       </ul>
    </div>

        
                 <div id={`carouselExampleIndicators${i}`} class="carousel carousel-project   slide">
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
        
          <div style={{minHeight:'45vh',maxHeight:'45vh' }}  class="carousel-inner" >
            {JSON.parse(p?.photo_uploads || '[]').map((imgPath, index) => (
              <div key={index}  style={{minHeight:'100%'}} class={`carousel-item ${index === 0 ? 'active' : ''}`}>
                <img style={{minHeight:'45vh',maxHeight:'45vh' }}
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
 
        
    <div className='projecttitle' >

    <h4> {p?.title} </h4>
    <Link>  {p?.projectUrl}  </Link>

      </div>
    <div className='post-info' >  
    
        
      
    <div className='projectDescription' > <p> Description- </p> 
<small className='project-post-descrip'   > {p?.description}.  </small>    
     </div>
    
    <div className='projectThirdCont' > 
<div className='sub-container' > <p > Techniques- </p>  <p   className='home-post-descrip'> {JSON.parse(p?.tech_used)  }  </p></div>
<div className='sub-container-sec' > <span> 12/02/2025 </span>  <span> 12/02/2025 </span></div>

    </div>
    
    
<div className='project-duration' > 

  <div  className='project-date' >    </div>

     </div>
    

        
      

    </div>

 <div  className='d-flex projectpagelikecont'   >   <div className='mx-3 mb-2 mypost-likedislikecont'>
           <div  > { JSON.parse(p?.likes)?.includes(loginData?.id?.toString()) === false  || p?.likes === null  ? <SlLike  style={{cursor:'pointer',marginBottom:"1vh"}}  onClick={()=>{hanldeprojectLike( {pid:p.id,id:loginData?.id} )}} />  : <BiSolidLike  style={{cursor:'pointer',marginBottom:"1vh"}}  onClick={()=>{hanldeprojectLike({pid:p.id,id:loginData?.id})}} />  }  {p?.likes === null ? 0  : JSON.parse(p?.likes)?.length }  </div>
            <div> 
              {JSON.parse(p?.disLikes)?.includes(loginData?.id?.toString()) === false ||  p?.disLikes === null   ? <SlDislike className='mx-1' onClick={()=>{hanldeprojectDisLike({pid:p.id, id:loginData?.id })}}  /> :  <BiSolidDislike onClick={()=>{hanldeprojectDisLike({pid:p.id, id:loginData?.id })}}  ></BiSolidDislike> } 
{p?.disLikes === null  ?  0 :  JSON.parse(p?.disLikes).length }  
 </div>    
  <div> <FaRegCommentDots /> 42 </div> </div>   <small className=' text-secondary ' > 4 days ago </small>
        </div>
    
        </div>
</>  ) :  <div style={{height:'75vh',display:'flex', flexDirection:'column', justifyContent:'center', gap:'5vh',  alignItems:'center' }}>
<img style={{ }} src='../../../public\images\no_cont_yet.jpg' />
<h3> Not Post Yet </h3>  
</div> 
}
 
 </div>
               </main>
  )
}

export default Viewers