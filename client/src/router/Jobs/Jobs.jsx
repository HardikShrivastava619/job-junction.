import React from 'react'
import './Jobs.css'
import { Link } from 'react-router-dom'
import { IoLocation } from 'react-icons/io5'
import { useState } from 'react'
import { useEffect } from 'react'
import { getPreciseDateOldness } from '../../helper'
const Jobs = () => {
  
  const [jobs,setJobs] = useState([])


//


  const handleGetOurJob = async () => {
  try {
    const res = await fetch(`http://localhost:1800/api/job/getAllJobs` ) 
  
  const data = await res.json()
  
    const filtArr = data?.result?.filter(o=> o?.is_hiring == true)
  
  
  setJobs(filtArr)

  } catch (error) {
    console.log(error);
    
  }  
  }
  

  
  
  useEffect(()=>{
   handleGetOurJob()
  },[])

  return (
 
     <main className='jobs-main' > 
 
 
 
 {  !jobs   ?    <div style={{display:'flex' , justifyContent:'center' , alignItems:'center' , flexDirection:'column'}}>
 <img src='public/images/nojob.jpg' width='50%' height='50%'  alt="no_img" />
 <h2 style={{fontFamily:'fantasy' , boxShadow:'10px 10px 10px blueViolet' }} >Your company hasn’t listed any public vacancies yet.</h2></div>    
 : jobs?.map((j,i)=> <Link  to={`/JobDetail/${j?.job_Id}`}  key={i} class="col  job-card ">
     <div class="card h-100" >
       <img src={j?.institute_Logo } class="card-img-top-job" alt="..."/>
       <div class="card-body-job">
        <h5 > {j?.title} </h5>
         <p class="card-job-descr">
 { j?.description?.trim()?.length == 0 || j?.description == null  ?  "No description of this Job is Provided"        :` ${j?.description?.substring(0,190)} ...`  }
 
         </p>
     <div className='card-body-loc-cont'   > 
     <Link className='card-body-salary' ><IoLocation  className='job-location-icon' />  {j?.location?.trim()?.length == 0 ?  'not Provided'  :j?.location }   </Link>
   
         <Link className='card-body-date' > {getPreciseDateOldness(j?.created_at)}  </Link>
   
         </div>
       </div>
     </div>
   </Link>
  )
 }
     </main>
   )
}

export default Jobs