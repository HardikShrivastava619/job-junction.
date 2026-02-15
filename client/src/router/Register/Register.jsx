

import './Register.css'
import { RegisterLogic } from './Register.js'
import { useState } from 'react';
import EntpForm from '../../component/EnterpriseForm/EntpForm.jsx';
import RegFirst from '../../component/RegisterFirstPage/RegFirst.jsx';
import UserForm from '../../component/UserRegForm/UserForm.jsx';
import { useEffect } from 'react';


const Register = () => {
  
  const  {role, setRole  } = RegisterLogic()
  
  
  

useEffect(()=>{


},[])










  
const [btnRemove,setBtnRemove] = useState(false)




return (


<main className='register_main'    >




  { !btnRemove ?  
     <RegFirst     setBtnRemove={setBtnRemove}setRole={setRole} /> 
      
      : 
 role === 'Enterprise' ? <EntpForm   setBtnRemove={setBtnRemove}  />  : 
  role === 'Employee' ? <UserForm/> :  <></>
 }


 





    </main>
  )
}

export default Register;


