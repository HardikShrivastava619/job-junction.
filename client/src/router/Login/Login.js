import { useEffect, useRef, useState } from "react"
import {useDispatch} from 'react-redux'
import { loginSliceAction } from "../../store/loginSlice"
import { useNavigate } from "react-router-dom"
export const loginLogic = ()=>{
    try {
        
const emailRef = useRef('')
const passwordRef = useRef('')
const captchaRef = useRef('')
 const [captcha,setCaptcha] = useState('');
 const [loadCaptcha, setLoadCaptcha] = useState(0);
const [captchaVerified, setCaptchaVerified] = useState(false);

const dispatch = useDispatch()

  const generateCaptcha = (length = 5) => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%^&*';
    let captcha = '';
    for (let i = 0; i < length; i++) {
      captcha += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return captcha;
  };

useEffect(() => {
  setCaptcha(generateCaptcha());
}, [loadCaptcha]);

const navigate = useNavigate()


const handleLoginSubmit = async (e) => {
    try {
        e.preventDefault()


const captchaCode = captchaRef?.current?.value;




if (captchaCode != captcha) {
    return alert('Please enter Valid Captch Code')
}

setCaptchaVerified(true)


const email = emailRef?.current?.value;

const password = passwordRef?.current?.value;



        const res = await fetch(`http://localhost:1800/api/user/login`,{
            method:"POST",
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({email , password})
        });
const data = await res.json();


alert(data?.message)

if (data?.success) {
   dispatch(loginSliceAction.loginUser(data?.existingUser))
     localStorage.setItem("jobJuncToken", JSON.stringify(data?.token));

   return  navigate('/')

  }


    } catch (error) {
        console.log(error);
        
    }
}











return {captchaVerified,
 emailRef,passwordRef,captchaRef,generateCaptcha,handleLoginSubmit,captcha,setLoadCaptcha
}


    } catch (error) {
          console.log(`Error in registration logic: ${error}`)
  
    }
}