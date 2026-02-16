import { IoLocation } from "react-icons/io5";
import React from 'react'
import './Entp.css'
import { EntpLogic } from './Entp.js'
import { TbPasswordFingerprint } from "react-icons/tb";
import { ImOffice } from "react-icons/im";
import { IoIosArrowRoundBack } from "react-icons/io";
import { IoIosArrowRoundForward } from "react-icons/io";
import { MdAttachEmail, MdOutlinePassword } from "react-icons/md";
import { PiBuildingOfficeDuotone } from "react-icons/pi";
import { LuTypeOutline } from "react-icons/lu";
import { BsFillCalendarDateFill } from "react-icons/bs";
import { FaCodeBranch } from "react-icons/fa";
import { FaUsers } from "react-icons/fa6";
import { FaIndustry } from "react-icons/fa";
import { BsCurrencyDollar } from "react-icons/bs";
import { TbLicense } from "react-icons/tb";
import { VscVerifiedFilled } from "react-icons/vsc";
import { ImParagraphRight } from "react-icons/im";
import { HiLink } from "react-icons/hi";
import { IoLogoAndroid } from "react-icons/io";
  import { FaImage } from "react-icons/fa6";
import { FaTwitter } from "react-icons/fa";
import { TbPasswordMobilePhone } from "react-icons/tb";
import { BsFillPersonLinesFill } from "react-icons/bs";
import { FaChessKing } from "react-icons/fa6";
import { confirmAlert } from "react-confirm-alert";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { loginSliceAction } from "../../store/loginSlice.js";




const EntpForm = ({setBtnRemove}) => {





const  {logoPreview,imgPreview,setImgPreview,licensePreview,setLicensePreview,setLogoPreview,
load,setLoad,    email,setEmail,doi,setDoi,owner,setOwner,type,setType,chro,setChro,branches,setBranches
,hq,setHq,netWorth,setNetWorth ,totEmp,setTotEmp,logo,setLogo,offWeb,setOffWeb 
,img,setImg,industType,setIndustType,name,setName,company_description,setcompany_description
,password,setPassw,license_doc_url,setlicense_doc_url,license_verified,setlicense_verified
,twitter_url,settwitterUrl,box1,setBox1,inputNum , setInputNum,otp,setOtp,confPass,setConfPass
} = EntpLogic();



const dispatch = useDispatch()


const handleRegister = async () => {
  try {
   

if (branches === null) {
  setBranches(0)
}    

if (netWorth=== null) {
  setNetWorth(0)
}    



if (totEmp === null) {
  setTotEmp(0)
}


    const formData = new FormData();


    formData.append('name', name);
    formData.append('dob', doi);

    formData.append('owned_by', owner);
    formData.append('type', type);
    formData.append('chro', chro);
    formData.append('hq', hq);
    formData.append('total_branches', branches );
    formData.append('net_worth', netWorth);
    formData.append('total_employees', totEmp);
    formData.append('official_site_url',  offWeb);
    formData.append('industry_type', industType);
    formData.append('AboutME', company_description);
    formData.append('twitterURL', twitter_url);
    formData.append('license_verified', license_verified);
    formData.append('password', password);
    formData.append('role', 'Enterprise');

    if (img){
      formData.append('profile_photo', img);
    }9
    if (license_doc_url){
      formData.append('license_doc_url', license_doc_url);
    }
    if (img){ 
      formData.append('logo_url', logo);
    }



        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/user/complete_profile/${email}`, {
      method: 'PUT',
      body: formData,
    });

    const data = await res.json();
  
  

if (data?.success) {
   alert(data?.message)
   dispatch(loginSliceAction.loginUser(data?.updatedUser))
        localStorage.setItem("jobJuncToken", JSON.stringify(data?.token));

return navigate('/')

}



    if (data?.success === false) {
    return alert('some error in registration')
    }
  } catch (error) {
   console.log(error);
    
  }
}




const sendOtp = async () => {
  try {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/api/user/register`,{
          method:'POST',
headers:{
    "Content-Type": "application/json",
      },
    
    body:JSON.stringify({email})
    }
)

const data = await res.json();
console.log(data);


if (data?.code === 'otp is sent') {
 
  setBox1(!box1)    
 setInputNum(p=>p+1)
 setLoad(false)
return alert('Otp is sent at given email')
}

if (data?.code ==='INCOMPLETE_PROFILE') {
setBox1(box1)    
 setInputNum(p=>p+2)
 setLoad(false)
return alert(data?.message)
  
}


  } catch (error) {
    console.log(error);
    
  }
}


const verifEntpyOTP = async () => {
  try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/user/verifyOTP/${email}`,{
      method: 'PUT',
headers:{
        'Content-Type':'application/json',
      },
      body:JSON.stringify({otp})

    }

    )

const data = await res.json();
console.log(data);

if (data?.code== 'Invalid OTP.' ) {
 alert(data?.message)
  return  setLoad(false)
}
if (data?.success) {
    setBox1(!box1)    
 setInputNum(p=>p+1)
 setLoad(false)
return alert('Otp Verified succesfully')

}

  } catch (error) {
    console.log(error);
    
  }
}






const handleForward = async () => {
  try {
    
    setLoad(true)





return setTimeout(() => {

if (inputNum === 21 ) {
  if (owner?.trim().length < 1 ) {
    setLoad(false)
    return alert("Please Enter CHAIRMAN'S name")
  }
}


if (inputNum <= 20) {

if (inputNum === 3) {
  if (doi  == null) {
    
    setLoad(false)
    return alert('Please Enter Your Date of Incorporation')


  }
}


if (inputNum === 1 ) {
  if (name?.trim().length < 1 ) {
    setLoad(false)
    return alert('Please Enter Your Enterprise Name')
  }
}


if (inputNum === 2 ) {
  if (type?.trim().length === 0) {
    setLoad(false)
    return alert('Please Tell which  type of your entrprise is ')
  }
}




if (inputNum === 7 ) {
  if (industType?.trim().length === 0) {
    setLoad(false)
    return alert('Please Tell your comany work under which sector ')
  }
}


if (inputNum === 9 ) {
  if (!license_doc_url) {
    setLoad(false)
    return alert('Please Upload License of your Enterprise we do not allow unAuthorised Enterprises ')
  }
}




if (inputNum === 18) {
  if (password.trim().length < 6) {
     setLoad(false)
  return  alert(' Password of minimum 6 letters required ')

  }
}



if (inputNum === 19) {
  if (password.trim() !== confPass.trim()) {
     setLoad(false)
  return  alert(' Password do not matched')

  }
}




if (inputNum ===17) {
  if (otp === '') {
    setLoad(false)
return    alert('please fill otp first')
  }

return verifEntpyOTP() 

}








if (inputNum == 16) {

if (email==='' || !email.includes('@gmail.com') ) {
setLoad(false)
  return  alert('Email is required in correct format')
}
return  sendOtp()


}


  setBox1(!box1)    
 setInputNum(p=>p+1)
return setLoad(false)

}

 confirmAlert({

  customUI : ({onClose})=>(
  <div  className='confirm-alert-cont'  > 
    <p  > Great You are only one step behind of registeration just give Final Permission to save your details  </p>
    
    <button type="submit" className="final-btn-Register" onClick={()=>{ handleRegister(); onClose() }    }  > Register Me </button>
    <button type="submit" className=" final-btn-Register" onClick={ onClose }  > Cancel  </button>
  
  
  
  
      </div>
  
  
  )
  
  
    }
      
  
  
  
    );



}, 100);



} catch (error) {
    console.log(error);
    
  }
}





const navigate = useNavigate()

const handleBack = async () => {
  try {
if (inputNum === 1) {
  return setBtnRemove(false)
}


if (inputNum === 18) {
return setInputNum(p=>p-2)
  
}


setBox1(!box1)    
setInputNum(p=>p-1)

  } catch (error) {
    console.log(error);
    
  }
}


useEffect(() => {
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleForward();
    }
  };

  document.addEventListener('keydown', handleKeyDown);

  return () => {
    document.removeEventListener('keydown', handleKeyDown);
  };
}, [handleForward]);


  return (
    <form className='entForm' >  

    {box1 === true ?  <div className='box1'   >
  

{inputNum === 1   ?  <div class="reg-input">
    <label for="exampleInputEmail1" class="form-label">  Name of Enterprise </label>
    <input type="text"     class="form-control "   aria-describedby="emailHelp"   value={name}     onChange={(e)=>{setName(e.target.value)}}    />
    <div id="emailHelp" class="form-text"> eg-Tata Consultancy , Reliance , HCL , HAL   </div>
  </div>  
  
  :
  
inputNum === 3   ? <div class="reg-input">
    <label for="exampleInputEmail1" class="form-label">   Incorporation date </label>
    <input type="date" class="form-control "   aria-describedby="emailHelp"     value={doi}     onChange={(e)=>{setDoi(e.target.value)}}   />
    <div id="emailHelp" class="form-text"> eg-Tata Consultancy , Reliance , HCL , HAL   </div>
  </div>   :inputNum === 5   ? <div class="reg-input">
    <label for="exampleInputEmail1" class="form-label"> No. of Branches </label>
    <input type="number" class="form-control " value={branches}     onChange={(e)=>{setBranches(e.target.value)}}  aria-describedby="emailHelp"/>
    <div id="emailHelp" class="form-text"> eg-100 , 500, 700 , 1000   </div>   
  </div>  
   : 
       inputNum === 7   ? <div class="reg-input">
 <label for="industry">Select Industry:</label>
<select id="industry" className="form-select"  name="industry" value={industType}     onChange={(e)=>{setIndustType(e.target.value)}} >
  

  <optgroup label="Primary Sector">
    <option value="agriculture">Agriculture</option>
    <option value="forestry">Forestry</option>
    <option value="fishing">Fishing</option>
    <option value="mining">Mining & Minerals</option>
    <option value="oil_gas">Oil & Gas Extraction</option>
  </optgroup>

  <optgroup label="Secondary Sector">
    <option value="manufacturing">Manufacturing</option>
    <option value="automotive">Automotive</option>
    <option value="textiles">Textiles & Apparel</option>
    <option value="construction">Construction</option>
    <option value="aerospace">Aerospace & Defense</option>
    <option value="chemicals">Chemicals</option>
    <option value="electronics">Electronics & Semiconductors</option>
  </optgroup>

  <optgroup label="Tertiary Sector">
    <option value="retail">Retail</option>
    <option value="hospitality">Hospitality & Tourism</option>
    <option value="transportation">Transportation & Logistics</option>
    <option value="finance">Banking & Financial Services</option>
    <option value="insurance">Insurance</option>
    <option value="education">Education</option>
    <option value="healthcare">Healthcare</option>
    <option value="legal">Legal Services</option>
    <option value="media">Media & Publishing</option>
    <option value="entertainment">Entertainment</option>
    <option value="telecom">Telecommunications</option>
    <option value="real_estate">Real Estate</option>
    <option value="utilities">Utilities</option>
    <option value="food_beverage">Food & Beverage</option>
    <option value="sports">Sports & Recreation</option>
    <option value="wholesale">Wholesale & Distribution</option>
  </optgroup>

  <optgroup label="Quaternary Sector">
    <option value="technology">Information Technology & Software</option>
    <option value="biotechnology">Biotechnology</option>
    <option value="research">Scientific Research & Development</option>
    <option value="consulting">Consulting Services</option>
    <option value="market_research">Market Research</option>
  </optgroup>

  <optgroup label="Quinary Sector">
    <option value="non_profit">Non-Profit & NGOs</option>
    <option value="government">Government & Public Administration</option>
    <option value="international_orgs">International Organizations</option>
    <option value="think_tanks">Think Tanks & Policy Groups</option>
  </optgroup>
</select>
 </div>   :        inputNum === 9   ? <div class="reg-input">
    <input type="file" class="form-control "   aria-describedby="emailHelp" 
  accept="image/*"    onChange={(e) => {
    const file = e.target.files[0];
    if (file) {
setlicense_doc_url(file  ) ,setLicensePreview(URL.createObjectURL(file) )
    }
  } } />
    <div  class="form-text"> Upload File in - pdf , jpeg , png , jpg </div>   
  </div> : inputNum === 11   ? <div class="form-floating textarea-cont ">
  <textarea   rows="12" class="form-control form-control-textarea"           value={company_description}   onChange={(e)=>{setcompany_description(e.target.value)}}       placeholder="Leave a comment here" id="floatingTextarea"></textarea>
  <label for="floatingTextarea">  About your company</label>
  <div id="emailHelp" class="form-text "> Help others learn about your company—include your mission, services, or team    </div>
  </div> :      inputNum === 13   ? <div class="reg-input">
    <input type="file" class="form-control "  accept="image/*"  aria-describedby="emailHelp" onChange={(e) => {
    const file = e.target.files[0];
    if (file) {
setLogo(file) ,setLogoPreview(URL.createObjectURL(file) )
    }
  } } />
    <div  class="form-text"> Upload File in - pdf , jpeg , png , jpg </div>   
  </div>   :  inputNum === 15 ? <div  className='reg-input' >
    <label for="exampleInputPassword1" class="form-label"> Twitter's URL</label>
    <input type="text" class="form-control" id="exampleInputPassword1"  value={twitter_url}   onChange={(e)=>{settwitterUrl(e.target.value)}}   />
<div id="emailHelp" class="form-text">   Share your Twitter link so users can follow your updates and connect with you.</div>
 
  </div>     : inputNum === 17 ? <div  className='reg-input' >
    <label for="exampleInputPassword1" class="form-label">  Verify Email</label>
    <input type="number" class="form-control" id="exampleInputPassword1"  value={otp}   onChange={(e)=>{setOtp(e.target.value)}}   />
<div id="emailHelp" class="form-text">  An OTP is sent at your Provided email    </div>
 
  </div> :
  
  inputNum === 19  ?    <div  className='reg-input' >
    <label for="exampleInputPassword1" class="form-label"> Confirm Password </label>
    <input type="password" class="form-control" id="exampleInputPassword1" value={confPass}   onChange={(e)=>{setConfPass(e.target.value)}}  />
 <div id="confirmPasswordHelp" class="form-text">
  Re-enter the password exactly as above to confirm. This helps avoid typos and ensures security.
</div>
  </div> :
   <div  className='reg-input' >
    <label for="exampleInputPassword1" class="form-label"> Chairman's Name </label>
    <input type="text" class="form-control" id="exampleInputPassword1"  value={owner}   onChange={(e)=>{setOwner(e.target.value)}} />
 <div id="companyOwnerHelp" class="form-text">
  Enter the full legal name of the individual who owns or holds majority control of the company.
</div>
  </div>  }




  
  </div> : <div className='office-cont' >

    { inputNum === 2  ?  
 <LuTypeOutline  className='ImOffice'  />
 :   inputNum === 4  ? <IoLocation className='ImOffice' /> : inputNum === 6  ?
    <FaUsers className="ImOffice" />  :  inputNum === 8   ? 
      <BsCurrencyDollar className="ImOffice"  /> :  inputNum === 10  
       ? <VscVerifiedFilled  className="ImOffice"/>  
 :
  inputNum === 12  ?<HiLink className="ImOffice" />
   : inputNum === 14  ?  imgPreview  ?  <img src={imgPreview} alt="err" className="userprofpic"   /> :   <FaImage  className="ImOffice" />  
   : inputNum === 16  ?  <MdAttachEmail className="ImOffice" /> :  
 inputNum === 18  ?  <TbPasswordFingerprint className="ImOffice" /> :  
  inputNum === 20  ?  <BsFillPersonLinesFill  className="ImOffice chro-icon" /> :  <> </> 
    }





<div className='arrow-cont' >
  <IoIosArrowRoundBack className='reg-arrowbtn'  onClick={handleBack} />

    { inputNum === 2  ? <h4> Type of Company </h4>  : inputNum === 4  ? <h4> Based In </h4> :inputNum === 6    ? <h4> Total Employees </h4>   : inputNum === 8 ?  <h4> Net Worth </h4>    : inputNum === 10   ? 
      <h4>  License Verfication </h4> :  inputNum === 12  ? <h4>Offical URL </h4> 
       : inputNum === 14 ?  <h4>  Cover Frame </h4>:   inputNum === 16  ?   <h4>Email ID </h4>  
       : inputNum === 18  ?  <h4> Password </h4>  :
inputNum === 20  ?  <h4> CHRO</h4> :
<h4>  Email Id </h4>  
 
 
 }


<IoIosArrowRoundForward className='reg-arrowbtn'  onClick={handleForward} />
</div>  {load ?   <Link className='register_loader' ></Link>   :  <></>  } 

</div>   }

























{!box1 ? <div className='box2' >
 { inputNum === 2  ? <div  className='reg-input' >
    <label for="exampleInputPassword1" class="form-label">Company Type</label>
     <select class="form-select" aria-label="Default select example"   value={type}   onChange={(e)=>{setType(e.target.value)}}      >
  <option selected>Open this select menu</option>
  <option value="Pvt">Pvt </option>
  <option value="Ltd">Ltd</option>
  <option value="OPC">OPC</option>
  <option value="Govt">Govt</option>

</select>
  </div>
     : inputNum === 4 ? <div  className='reg-input' >
    <label for="exampleInputPassword1" class="form-label"> Headquarter Located   </label>
    <input type="text" class="form-control" id="exampleInputPassword1"  value={hq}   onChange={(e)=>{setHq(e.target.value)}} />
 <div id="emailHelp" class="form-text"> eg-NewYork , Paris , Londan , Mumbai   </div>
  
  </div> :   inputNum === 6  ?      <div  className='reg-input' >
    <label for="exampleInputPassword1" class="form-label"> No. of Employees  </label>
    <input type="number" value={totEmp}   onChange={(e)=>{setTotEmp(e.target.value)}}  class="form-control" id="exampleInputPassword1"/>

  </div>    :  inputNum === 8  ?      <div  className='reg-input' >
    <label for="exampleInputPassword1" class="form-label"> Total net worth   </label>
    <input type="number" class="form-control" id="exampleInputPassword1"  value={netWorth}   onChange={(e)=>{setNetWorth(e.target.value)}}  />
<div id="emailHelp" class="form-text">
  Enter your estimated net worth in million USD. Example: 50 = $50 million.
</div>

  </div>      :inputNum === 10  ?     <div class="form-check ent-reg-radio form-switch">
  <label class="form-check-label ent-reg-lable " for="checkNativeSwitch">
  License verified
  </label>
  <input class="form-check-input ent-reg-radio-input " type="checkbox"   checked={license_verified}    onChange={(e) => setlicense_verified(e.target.checked)}  value="" id="checkNativeSwitch" switch    />
</div>     :   inputNum === 12 ?   <div  className='reg-input' >
    <label for="exampleInputPassword1" class="form-label"> Official URL</label>
    <input type="text" class="form-control" id="exampleInputPassword1"   value={offWeb}   onChange={(e)=>{setOffWeb(e.target.value)}}   />
<div id="emailHelp" class="form-text">  Enter the full URL of your company's official website (e.g., https://yourcompany.com). </div>
 
  </div>   : 
inputNum === 14 ?  <div class="reg-input">
    <input type="file" class="form-control" accept="image/*"   onChange={(e)=>{ const file = e.target.files[0]

if (file) {
  setImg(file),
  setImgPreview(URL.createObjectURL(file))
}

     }}/>
    <div  class="form-text"> Upload File in - pdf , jpeg , png , jpg </div>   
  </div> :   inputNum === 16  ?  <div  className='reg-input' >
    <label for="exampleInputPassword1" class="form-label"> Email </label>
    <input type="email" class="form-control"  value={email}   onChange={(e)=>{setEmail(e.target.value)}}  id="exampleInputPassword1"/>
<div id="emailHelp" class="form-text">  
    Enter your company’s official email address (e.g., contact@yourcompany.com).</div>
 
  </div>    : inputNum === 18  ?    <div  className='reg-input' >
    <label for="exampleInputPassword1" class="form-label"> Enter Password </label>
    <input type="password" class="form-control" id="exampleInputPassword1"  value={password}   onChange={(e)=>{setPassw(e.target.value)}} />
 <div id="passwordHelp" class="form-text">
  Use 8–16 characters with a mix of letters, numbers, and symbols (e.g., @, #, $). Avoid common words or personal info.
</div>
  </div> : 
  inputNum === 20  ?  <div  className='reg-input' >
    <label for="exampleInputPassword1" class="form-label"> CHRO's Name</label>
    <input type="text" class="form-control" id="exampleInputPassword1"  value={chro}   onChange={(e)=>{setChro(e.target.value)}} />
 <div id="chroHelp" class="form-text">
  Enter the full name of the Chief Human Resources Officer responsible for HR strategy and organizational culture.
</div>
  </div> :
  <></>
  }  
 
  </div> :<div className='office-cont' >


    { inputNum === 1  ?   <PiBuildingOfficeDuotone className='ImOffice'  />
 :  inputNum === 3  ?   
<BsFillCalendarDateFill className='ImOffice' />  :  inputNum === 5   ?   <FaCodeBranch  className='fabranch ImOffice' />  : inputNum === 7  ?  <FaIndustry className="ImOffice"/> 
 :  inputNum === 9  ?  licensePreview ?  <img src={licensePreview} alt="err" className="userprofpic" /> : <TbLicense className="ImOffice"/>
  :  inputNum === 11  ? <ImParagraphRight className="ImOffice"  /> 
: inputNum === 13 ? logoPreview ?   <img src={logoPreview} alt="err" className="userprofpic" />  :    <IoLogoAndroid  className="ImOffice"/> :
inputNum === 15 ? <FaTwitter className="ImOffice" /> :
inputNum === 17 ?  <TbPasswordMobilePhone  className="ImOffice" />  : 
inputNum === 19  ?  <MdOutlinePassword  className="ImOffice"  />  :

<FaChessKing   className='ImOffice FaChessKing'/>  
 
 }




<div className='arrow-cont' >
  <IoIosArrowRoundBack className='reg-arrowbtn'  onClick={handleBack} />
  { inputNum === 1  ? <h4> Enterprise </h4>  :     inputNum === 3  ? <h4>   Date  </h4> : inputNum === 5  ?   <h4 > Total Branches </h4>  : inputNum === 7   ?   <h4> Industry Type</h4>  : inputNum === 9  ?   <h4> License</h4>  :  
  
  inputNum === 11  ? <h4>  About Company </h4>  :
  inputNum === 13  ?   <h4> Comapnie's Logo </h4> : 
 
inputNum === 15   ?  <h4> Twitter's URL </h4>
  :   inputNum === 17 ?  
 <h4> One Time Password </h4>
: inputNum === 19  ?   <h4> Confirm Password </h4> :
 <h4> Company ChairMan    </h4>  }
 <IoIosArrowRoundForward className='reg-arrowbtn'  onClick={ handleForward } />
</div>
{load ?   <Link className='register_loader' ></Link>   :  <></>  }</div>   


}

  </form>
  )
}

export default EntpForm


/*<div class="mb-3 form-check">
    <input type="checkbox" class="form-check-input" id="exampleCheck1"/>
    <label class="form-check-label" for="exampleCheck1">Check me out</label>
  </div>
  <button type="submit" class="btn btn-primary">Submit</button>
 */