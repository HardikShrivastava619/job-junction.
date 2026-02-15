import React, { useState } from 'react'
import './EditOtherdet.css'
import { RxCross1 } from "react-icons/rx";
import { useDispatch, useSelector } from 'react-redux';
import { loginSliceAction } from '../../../store/loginSlice';

const EditOtherDet = ({edit,handleMoreDetails,setEditProf,editProf}) => {

  const loginData= useSelector(s=>s.loginData)

  const date = new Date(loginData?.dob);
const yyyy = date.getFullYear();
const mm = ('0' + (date.getMonth() + 1)).slice(-2);
const dd = ('0' + date.getDate()).slice(-2);



const [post,setPost] = useState(loginData?.post)
const [dob,setDOB] = useState(`${yyyy}-${mm}-${dd}`)
const [currently,setCurrently] = useState(loginData?.currentStatus)
const [company,setCompany] = useState(loginData?.company)
const [ctc,setCTC] = useState(loginData?.ExpectedCtC)
const [phone,setPhone] = useState(loginData?.phone)
const [city,setCity] = useState(loginData?.city)
const [landMark,setLandMark] = useState(loginData?.landMark)
const [pincode,setPincode] = useState(loginData?.pincode)
const [email,setEmail] = useState(loginData?.email)
const [gender,setGender] = useState(loginData?.gender)
const [state_or_UT,setState] = useState(loginData?.gender)
const [chairman,setChairman] = useState(loginData?.owned_by)
const [chro,setChro] = useState(loginData?.chro)
const [type,setType] = useState(loginData?.type)
const [netWorth,setNetWorth] = useState(loginData?.net_worth)
const [industry_type, setindustry_type] = useState(loginData?.industry_type)
const [branches,setBranches] = useState(loginData?.total_branches)
const [official_site_url,setOfficial_site_url] = useState(loginData?.official_site_url)
const [hq,setHQ] = useState(loginData?.hq)
const [emp,setEmp] = useState(loginData?.total_employees)

console.log(loginData);





const dispatch = useDispatch() 





 const handleSaveChanges  = async (e) => {
  try {
e.preventDefault()
    const formData = new FormData();




    formData.append('post', post);
    formData.append('dob', dob);
    formData.append('gender',gender );
    formData.append('currentStatus',currently );
    formData.append('ExpectedCtC', ctc);
    formData.append('company', company);
    formData.append('phone', phone);
    formData.append('email', email);
    formData.append('city', city);
    formData.append('landMark',landMark );
    formData.append('state_or_UT',state_or_UT );
    formData.append('pincode',pincode );
    formData.append('owned_by',chairman );
    formData.append('type',type );
    formData.append('net_worth',netWorth );
    formData.append('chro',chro );
formData.append('industry_type',industry_type );
formData.append('total_branches' , branches)
formData.append('official_site_url' ,official_site_url )
formData.append('hq' ,hq )
formData.append('total_employees',emp)


    const res = await fetch(`http://localhost:1800/api/user/complete_profile/${loginData?.email}`, {
      method: 'PUT',
      body: formData,
    });

    const data = await res.json();
    console.log(data);
    
    if (data?.success === true) {

      dispatch(loginSliceAction?.loginUser(data?.updatedUser))
      
      setEditProf(false)
      
      
      
      handleMoreDetails()
      
return   alert('Profile Updated Succesfully')
   
    }

    if (data?.success === false) {
   
setEditProf(false)
      return alert('some error in registration')
    }



  } catch (error) {
    console.log(error);
  }
};



console.log('branches',branches);

console.log('emp',emp);


  return (



    <main className='main0editdet'  >

<div  style={{height:'20%',borderBottom:'1px solid silver',padding:'0vh .5vw 0vh .5vw' , width:'100%',justifyContent:'space-between',display:'flex',alignItems:'center' } } >  
<h4>{edit === 'dob' ? 'Change Your DOB'
    : edit === 'gender' ? 'Change Gender'
    : edit === 'ctc' ? 'Change Expected CTC'
    : edit === 'post' ? 'Change Post'
    : edit === 'company' ? 'Change Company Name'
    : edit === 'currently' ? 'Change Your Current Status'
    :edit === 'phone' ? 'Change Your Phone Number'
    :edit === 'email' ? 'Change Your Email ID'
    :edit === 'city' ? 'Change Your Address'
    :edit === 'landMark' ? 'Change Your Landmark'
    :edit === 'pincode' ? 'Change Your Area Pincode'
    :edit === 'Branches' ? 'Change Number of Branches' 
    :edit === 'Sector' ? 'Change Sector'
    :edit === 'Designation' ? 'Change Designation'
    :edit === 'Official URL' ? 'Change Your Official URL'
    :edit === 'Chairman' ? "Change Chairman's Name"
    :edit === 'CHRO' ? "Change CHRO's Name"
    :edit === 'netWorth' ? "Change Companie's Net Worth"
    :edit === 'emp' ? "Change Employaes no."
    
    :edit === 'hq' ? "Change Head Quarter"
    :<></>
    
    }   </h4>
<RxCross1 className='RxCross1'  onClick={()=>{setEditProf(false)}}  />
</div>
<form  onSubmit={handleSaveChanges}  class="row g-3 formEditDet">
       <div         style={edit==='city' ?{display:'flex',flexDirection:'column'  ,alignItems:'center',  justifyContent:'space-between',borderBottom:'1px solid silver',height:'100%'} : {display:'flex',justifyContent:'center',  borderBottom:'1px solid silver',height:'100%'}   }   >

{edit === 'gender' ?  <select
  className="form-select editExtInput"
  value={gender}
  onChange={(e) => setGender(e.target.value)}
>
  <option value="Male">Male</option>
  <option value="Female">Female</option>
  <option value="Prefer Not to say">Prefer Not to say</option>
</select>

:edit === 'Sector' ? 
<select id="industry" className="form-select editExtInput"  name="industry" value={industry_type}     onChange={(e)=>{setindustry_type(e.target.value)}} >
  

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
 
:edit === 'Designation' ?   <select class="form-select editExtInput" aria-label="Default select example"   value={type}   onChange={(e)=>{setType(e.target.value)}}      >
  <option selected>Open this select menu</option>
  <option value="Pvt">Pvt </option>
  <option value="Ltd">Ltd</option>
  <option value="OPC">OPC</option>
  <option value="Govt">Govt</option>

</select>



  : edit === 'city'?  <> 
<input type="text" className='form-control editExtInput'  placeholder={city} onChange={()=>{setCity(e.target.value);}}  />

    <select className="form-select editExtInput" placeholder={state_or_UT}  onChange={(e)=>{setState(e?.target?.value)}} >
   <optgroup label='State' >
   
    <option value="Andhra Pradesh">Andhra Pradesh</option>
    <option value="Arunachal Pradesh">Arunachal Pradesh</option>
    <option value="Assam">Assam</option>
    <option value="Bihar">Bihar</option>
    <option value="Chhattisgarh">Chhattisgarh</option>
    <option value="Goa">Goa</option>
    <option value="Gujarat">Gujarat</option>
    <option value="Haryana">Haryana</option>
    <option value="Himachal Pradesh">Himachal Pradesh</option>
    <option value="Jharkhand">Jharkhand</option>
    <option value="Karnataka">Karnataka</option>
    <option value="Kerala">Kerala</option>
    <option value="Madhya Pradesh">Madhya Pradesh</option>
    <option value="Maharashtra">Maharashtra</option>
    <option value="Manipur">Manipur</option>
    <option value="Meghalaya">Meghalaya</option>
    <option value="Mizoram">Mizoram</option>
    <option value="Nagaland">Nagaland</option>
    <option value="Odisha">Odisha</option>
    <option value="Punjab">Punjab</option>
    <option value="Rajasthan">Rajasthan</option>
    <option value="Sikkim">Sikkim</option>
    <option value="Tamil Nadu">Tamil Nadu</option>
    <option value="Telangana">Telangana</option>
    <option value="Tripura">Tripura</option>
    <option value="Uttar Pradesh">Uttar Pradesh</option>
    <option value="Uttarakhand">Uttarakhand</option>
    <option value="West Bengal">West Bengal</option>
    </optgroup>
   
        <optgroup  label='UTs' > <option value="Andaman and Nicobar Islands">Andaman and Nicobar Islands</option>
    <option value="Chandigarh">Chandigarh</option>
    <option value="Dadra and Nagar Haveli and Daman and Diu">Dadra and Nagar Haveli and Daman and Diu</option>
    <option value="Delhi">Delhi</option>
    <option value="Jammu and Kashmir">Jammu and Kashmir</option>     
    <option value="Lakshadweep">Lakshadweep</option>
    <option value="Ladakh">Ladakh</option>
    <option value="Puducherry">Puducherry</option>
    </optgroup>
    



    
</select>    </> :  <input type={edit === 'dob' ?  'date' :  edit === 'phone' ||  edit === 'Branches' || edit === 'pincode' || edit === 'emp'   || edit === 'netWorth' ?  'number' : edit === 'email' ? 'email' : 'text'} className="form-control editExtInput" placeholder={edit === 'dob' ? 'Date of Birth'
    : edit === 'gender' ? 'Gender'
    : edit === 'ctc' ? ' Expected CTC'
    : edit === 'post' ? ' Post'
    : edit === 'company' ? ' Company Name'
    : edit === 'currently' ? ' Your Current Status'
    :edit === 'phone' ? 'Phone Number'
    :edit === 'email' ? ' Email ID'
    :edit === 'landMark' ? ' Landmark'
    :edit === 'pincode' ? ' Area Pincode'
   :edit === 'netWorth' ? 'Net Worth'
   :edit === 'hq' ? 'Head Quarter'
   :edit === 'emp' ? 'Enter Here'
   :edit === 'Chairman' ? 'Enter here' :edit === 'CHRO' ? 'Enter HERE'     :edit === 'Branches' ? 'ex.- 500 ,400 ' 
  : 'Chane URL'  }    onChange={(e) => {
    if (edit === 'dob') setDOB(e.target.value);
     
    else if (edit === 'ctc') setCTC(e.target.value);
    else if (edit === 'landMark') setLandMark(e.target.value);
    else if (edit === 'currently') setCurrently(e.target.value);
    else if (edit === 'post') setPost(e.target.value);
    else if (edit === 'company') setCompany(e.target.value);
    else if (edit === 'phone') setPhone(e.target.value);
    else if (edit === 'email') setEmail(e.target.value);
    else if (edit === 'pincode') setPincode(e.target.value);
 else if (edit === 'netWorth') setNetWorth(e.target.value)
 else if (edit === 'Chairman') setChairman(e.target.value)
 else if (edit === 'CHRO') setChro(e.target.value)
else if (edit === 'Branches') setBranches(e.target.value)
else if (edit === 'Official URL')   setOfficial_site_url(e.target.value)
else if (edit === 'hq')   setHQ(e.target.value)
else if (edit === 'emp')   setEmp(e.target.value)


 } }  />
}


</div>

</form>  <div class="col-auto">
    <button type="submit" class="btn btn-primary"  onClick={handleSaveChanges}>Save Changes</button>
  </div>


    </main>
  )
}

export default EditOtherDet