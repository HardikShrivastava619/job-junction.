import React from 'react'
import './PostForm.css'
import { PostFormLogic } from './PostForm.js'
import { RxCross1 } from "react-icons/rx";

const PostForm = ({setPostForm,handleGetPosts}) => {

const {photoPreview  ,handleRemovePic,setPhotoPreview,handleUpload,setdescription,description,photo,setPhoto,commentsOn,setCommentsOn} = PostFormLogic(setPostForm,handleGetPosts)



  return (
    <main className='postFormMain' >


<form className='mainPostForm' >

<div  className={`postForm-uploadeimgCont ${photo?.length > 0 ? ''  :   'postForm-uploadeimgCont-bgimg'  }`}  >
{ photo?.map((f,i)=>   <div key={i} className='uploadedImgVerificaton-subCont' >
  <RxCross1 style={{cursor:'pointer'}}  onClick={()=>{handleRemovePic(i)}} />
  <img   className='uploadedImgVerificaton'    src={URL.createObjectURL(f)}
 alt="not_uploaded" /></div>
)
}
</div>
<input type="file" className='form-control' multiple accept="image/*" onChange={(e) => setPhoto((prevPhotos) => [...prevPhotos, ...Array.from(e.target.files)])  }/>

<textarea className='form-control anyDescript ' rows={4}  name="" id=""  onChange={(e)=>{setdescription(e.target.value)}}  ></textarea>
  

<div className='d-flex w-100 h-25'  >

<div className='d-flex flex-column h-100 w-50'style={{justifyContent:'end' }} >  
  
 <div class="form-check  form-switch">
  <label class="form-check-label  " for="checkNativeSwitch">
   Comments   </label> 
  <input class="form-check-input  " type="checkbox"   value="" id="checkNativeSwitch" switch checked={commentsOn}  onChange={(e)=>{setCommentsOn(e.target.checked)}}    />
</div>
    </div>
<div className=' h-100 w-50 d-flex ' style={{justifyContent:'end',alignItems:'end'  }} >   <button className='btn btn-primary w-50 h-20'  onClick={handleUpload} > Upload  </button>  </div>

</div>

  </form>      


    </main>

  )
}

export default PostForm