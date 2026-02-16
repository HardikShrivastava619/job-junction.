import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import './JobForm.css'
import { FaPlus } from 'react-icons/fa';
import { RxCross2 } from 'react-icons/rx';
import { MdAccountCircle } from 'react-icons/md';
import { confirmAlert } from 'react-confirm-alert';
import { FaHandshake } from "react-icons/fa";
import { jobFormLogic } from './JobForm.js';

const JobForm = () => {

  
const {createJob,description , setDescription ,reqskills,setReqskills,title , setTitle,degrees , setDeg,location , setLocation,jobtype , setjobType
    ,remote , setRemote,annual_Salary,setAnnual_Salary,reqDeg , setReqDeg
} = jobFormLogic()

  
  const [page , setPage] = useState(1);
  const [photo , setPhoto] = useState();
const [load,setLoad] = useState(false)
const [back,setBack]= useState(false)


const handlGoBack = async () => {
  try {

setLoad(false)
    setBack(true)


setTimeout(() => {
setPage(p=>p-1)
return setBack(false)

}, 2000); 



} catch (error) {
    console.log(error);
    
  }
}



  const handleNext = async (e) => {
      e.preventDefault()
      try {


if (title?.trim()?.length == 0 ||annual_Salary?.trim()?.length == 0 ||location?.trim()?.length == 0) {
 return alert('Please Enter all details Before proceeding on next page')
}



setBack(false)
setLoad(true)

setTimeout(() => {
  if (page <2 ) {
  setPage(p => p+1 )
  return setLoad(false)
 }


else{  
  
if (description?.length > 350) {
  setLoad(false)
  return alert('Please keep the description under 150 characters.');
}
  
  
  confirmAlert({

  customUI : ({onClose})=>(
  <div  className='confirm-alert-cont'  > 
    <p  >  Great  🎉🎉 You're one click away from listing your vacancy! Confirm now and let the hiring journey begin.</p>
    
    <button type="submit" className="final-btn-Register" onClick={()=>{ createJob(); onClose() }    }  > Go Public </button>
    <button type="submit" className=" final-btn-Register" onClick={ onClose }  > Cancel  </button>
  
  
  
  
      </div>
  
  
  )
  
  
    }
      
  
  
  
    );
  }          
  
}, 2000);
        


  







}

catch (error) {
        console.log(error);
        
      }
    }
  



    const options = [
  { value: 'B.Tech', label: 'B.Tech' },
  { value: 'BSC', label: 'BSC' },
  { value: 'T.Tech', label: 'T.Tech' },
  { value: 'M.Tech', label: 'M.Tech' }
];
  
    return (
<main  className='jobForm-main' >

<div  className='job_icon' >
    <FaHandshake className='FaHandshake' />
<h1>  📝 Share  a New Opportunity</h1>

</div>



  <form className='job-form-div'>

{page === 1 ? (
  <h5 className="sign-Up_head">📝 These Information Matters — Fill Carefully</h5>
) : (
  <h5 className="sign-Up_head" onClick={handlGoBack}>⬅️ Return to Previous Section</h5>
)}

{                  page === 1  ? <> <div className='register_inputs-container'>
  <div className='registe-input-subcont' >
 
 
 
  <div className="mb-3 register-inputs-cont2 "  >
    <label  className=" form-label"> Job name </label>
    <input type="text" className="register-inputs  form-control"   placeholder='Enter Your Name'       onChange={(e)=>{setTitle(e?.target?.value)}}     required />
  </div>
<div className='profe-registe-input-subcont' >
  <div className="mb-3 register-inputs-cont2 "  >
    <label htmlFor="exampleInputEmail1" className=" form-label"> Remote </label>
    <select style={{width:'15vw'}}    className=" form-select" id="gender" onChange={(e)=>{setRemote(e?.target?.value)}}    >
    <option value="No"> No </option>
    <option value="Yes">Yes </option>
  </select>    
  </div>
 

    </div> 
    <div className="mb-3 register-inputs-cont2 "  >
    <label htmlFor="exampleInputEmail1" className="form-label"> Annual Salary in Rs. </label>
    <input type="currency" className="register-inputs  form-control"    required   id="password" placeholder='Enter in Rupees'       
    
    onChange={(e)=>{setAnnual_Salary(e?.target?.value)}} 
    aria-describedby="emailHelp"/>
  </div>
 

    </div> 
    <div className='registe-input-subcont' >


    <div className='profe-registe-input-subcont' >
  <div className="mb-3 register-inputs-cont2 "  >
    <label htmlFor="exampleInputEmail1" className=" form-label"> Job Type </label>
    <select style={{width:'15vw'}}  className=" form-select" id="gender" onChange={(e)=>{setjobType(e?.target?.value)}}   >
    <option value="FullTime">FullTime</option>
    <option value="PartTime">Part Time</option>
    <option value="Contract Based">Contract Based</option>

  </select>    
  </div>
 

    </div> 

   <div className="mb-3 register-inputs-cont2 "  >
    <label htmlFor="exampleInputEmail1" className=" form-label"> Skills req.  </label>
    <input type="text"  className='form-control'  placeholder='Give Space b/w diff. skills'  onChange={(e)=>{setReqskills(e?.target?.value?.split(" "))}}   />
      </div><div className="mb-3 register-inputs-cont2 "  >
    <label htmlFor="exampleInputEmail1" className="form-label">  Location</label>
    <input type="text" className="register-inputs  form-control" id="confpassword" placeholder='Enter Job Site ' aria-describedby="emailHelp"
    onChange={(e)=>{setLocation(e?.target?.value)}} 
    />
  </div>

    </div>
  </div>

   </>:   page === 2 ?      <> 
 <div  className='proff-register_inputs-container'>
<textarea name="" id="" className='form-control'  placeholder='Describe Job or Duties' style={{border:'2px solid #9370db'}}  rows='6'  onChange={(e)=>{setDescription(e?.target?.value)}} ></textarea>

 </div>


<label className=" mx-auto degree-head  form-label" > Mention Required  Degrees </label>
<div   className='degree_btn-jobForm' >
  
<div className='FaPlus_btn-job-form' >     <button 
    type="button"
    className='FaPlus_btn'
    onClick={      () => {if (degrees.length < 6) {
      setDeg([...degrees, ""]);
    } else {
      alert("You can add a maximum of 6 degrees only.");
    } }   }
  >
    <FaPlus   />
  </button>
 </div>

  <div className='deginput-cont' >

    {degrees.map((degree, index) => (
    <div className='deg_input'  key={index}>
    <input
  type="text"
  value={reqDeg[index] || ""}
  onChange={(e) => {
    const updated = [...reqDeg];
    updated[index] = e.target.value;
    setReqDeg(updated);
  }}
  className='degree_input'
  placeholder={`Enter Degrees `}
/>
  <RxCross2
        className='RxCross2-deg'
      />
    </div>
  ))}
  </div>

</div>

 
 
 
 </>  : <>
     </>  

      }

<div className='next-btn-cont' >
<button type="submit" className="btn-Next" onClick={handleNext  }>  Next {`>>>`} </button>
</div>

{load && <div className='job_loader'></div>}
{back && <div className='job_loader-goBack'></div>}

</form>   

</main>


    )
}

export default JobForm