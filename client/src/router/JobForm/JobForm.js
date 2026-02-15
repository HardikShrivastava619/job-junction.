import { useState } from "react";
import {useSelector} from 'react-redux';
import { useNavigate } from "react-router-dom";


export const jobFormLogic = ()=>{

    try {

  const [title , setTitle] = useState('');
  const [degrees , setDeg] = useState([]);
  const [reqDeg , setReqDeg] = useState([]);
  
  const [location , setLocation] = useState('');
const [jobtype , setjobType] = useState('FullTime');
const [remote , setRemote] = useState('No');
const [description , setDescription] = useState(null);
const [annual_Salary,setAnnual_Salary] = useState('');
 const [reqskills,setReqskills] = useState(null)

const loginData = useSelector(s=>s.loginData)

const navigate = useNavigate()

const createJob = async () => {
  

  
  const jobData = {
    title,
     jobtype,
    institute_Name: loginData?.name ,
    institute_Logo: loginData?.logo_url,
    annual_Salary ,
    reqskills ,
    location,
    reqDegree: reqDeg?.length == 0  ?   null : reqDeg ,
    remote,
    description
  };

  try {
    const response = await fetch(`http://localhost:1800/api/job/createJob/${loginData?.id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(jobData)
    });

    const data = await response.json();
    if (data?.success) {
      alert(" Vacancy is now Published :");
      return navigate('/EnterpriseJobs')
    } else {
      console.error("Error in Publishing job:", data);
    }
  } catch (err) {
    console.error("Network or server error:", err);
  }
};
































return {createJob,description , setDescription ,reqskills,setReqskills,title , setTitle,degrees , setDeg,location , setLocation,jobtype , setjobType
    ,remote , setRemote,annual_Salary,setAnnual_Salary,reqDeg , setReqDeg



}



    } catch (error) {
        console.log(error);
        
    }
}