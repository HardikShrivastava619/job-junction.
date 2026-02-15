import './Login.css'
import Footer from '../../component/Footer/Footer'
import { loginLogic } from './Login'
import { IoReloadOutline } from "react-icons/io5";
import { Link } from 'react-router-dom';


const Login = ( ) => {



const {emailRef,setLoadCaptcha,passwordRef,captchaRef,generateCaptcha,handleLoginSubmit,captcha,captchaVerified} = loginLogic()






  return (


<main className='login_main' >








<form    className='login-form' onSubmit={handleLoginSubmit} >
  <div className="mb-3  "  >
    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
    <input type="email"  ref={emailRef} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
  </div>
  <div className="mb-3">
    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
    <input type="password"  ref={passwordRef} className="form-control" id="exampleInputPassword1"/>
  </div>
  <div className="mb-3">
  <label className="form-label">
    Captcha Code:
    <input type="text"  disabled value={captcha} />
    <IoReloadOutline onClick={() => setLoadCaptcha(prev => prev + 1)} className='mx-1 IoReloadOutline-captcha' />
  </label>
  <input
    type="text"
    placeholder="Enter Captcha Code"
    ref={captchaRef}
    className="form-control"
    id="captcha"
  />
</div>


 <small className="captcha_info"   >  { captchaVerified ?  'Correct Captcha Code' : <></>  } </small>  
 <button type="submit" className=" btn-Login_Submit"   >Submit </button>  
 <Link  className='create-acc'  to='/register'  >  Create New Account </Link>  



</form>


<Footer></Footer>


    </main>
  )
}

export default Login;