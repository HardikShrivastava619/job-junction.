import React from 'react'
import { RxCross1 } from "react-icons/rx";
import { ProjectFormLogic } from './ProjedctForm.js';
import './ProjedctForm.css'

const ProjedctForm = ({setProjectForm,handleGetProject}) => {

const {handleRemovePic, handleUpload,setdescription,photoPreview,url , setURL , setPhotoPreview,title , setTitle,  tech,startDate,setStartDate,endDate,setEndDate ,description,photo,setPhoto,commentsOn,setCommentsOn } = ProjectFormLogic(setProjectForm,handleGetProject)



  return (
    <main className='projectFormMain' >


<form className='mainProjectForm' onSubmit={handleUpload} >

<div className={`projectForm-uploadeimgCont ${photo?.length > 0 ? ''  :   'postForm-uploadeimgCont-bgimg'  }`}  >
{ photo?.map((f,i)=>   <div key={i} className='uploadedprojecImgVerificaton-subCont' >
  <RxCross1 style={{cursor:'pointer'}}  onClick={()=>{handleRemovePic(i)}} />
  <img   className='uploadedImgVerificatonproj'    src={URL.createObjectURL(f)}
 alt="not_uploaded" />
 
 </div>
)
}
</div>
<input type="file" className='form-control' multiple accept="image/*" onChange={(e) => setPhoto((prevPhotos) => [...prevPhotos, ...Array.from(e.target.files)])  }/>
<input type="text" className='form-control text-center ' placeholder='@Project Titile'  onChange={(e)=>{setTitle(e.target.value)}}  />
<textarea className='form-control anyDescript ' placeholder='Derscribe Your Project' rows={4}  name="" id=""  onChange={(e)=>{setdescription(e.target.value)}}  ></textarea>
  <input
  type="text"
  className="form-control text-center w-75"
  placeholder="Enter technologies (e.g. ReactNative, NodeJS)"
  ref={tech}
/>
<div className="form-text">
  Enter technologies without spaces between words unless the full name is complete.
</div>

<input type="text" placeholder='#projectURL'  className='form-control text-center' onChange={(e)=>{setURL(e?.target?.value)}}  />

<div className='d-flex gap-4' >  <div className='text-center' >    <label class="form-control-label  " for="checkNativeSwitch">
Project Started
  </label> 
 <input type="date" className='form-control'  onChange={(e)=>{setStartDate(e?.target?.value)}} /> </div>
 
 <div className='text-center' >    <label class="form-control-label  " for="checkNativeSwitch">
Project Ended
  </label> 
  <input type="date"className='form-control'  onChange={(e)=>{setEndDate(e?.target?.value)}}   />    </div>
</div>

 <div class="form-check  form-switch">
  <label class="form-check-label  " for="checkNativeSwitch">
   Comments On

  </label> 
  <input class="form-check-input  " type="checkbox"   value="" id="checkNativeSwitch" switch checked={commentsOn}  onChange={(e)=>{setCommentsOn(e.target.checked)}}    />
</div>

<button className='btn btn-primary w-50' > Upload </button>

  </form>      


    </main>

  )
}

export default ProjedctForm