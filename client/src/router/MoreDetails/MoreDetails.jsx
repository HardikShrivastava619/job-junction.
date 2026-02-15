import React, { useState } from 'react'
import './MoreDetails.css'
import { MdAccountCircle, MdStarOutline } from 'react-icons/md';
import { Link} from 'react-router-dom';
import { TbEdit } from "react-icons/tb";
import { MoreDetailsLogic } from './MoreDetails';
import { useEffect } from 'react';
import { FaCodeBranch, FaFacebook, FaGithub, FaInstagram,  FaTwitter } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { GiMoneyStack } from "react-icons/gi";
import EditNameModal from '../../component/Modals/EditNameModal/EditNameModal';
import { FaRegEye } from "react-icons/fa";
import EditOtherDet from '../../component/Modals/EditOtherDet/EditOtherDet';
import { RxCross1, RxCross2, RxMinus, RxPlus } from 'react-icons/rx';
import { MdStarRate } from "react-icons/md";
import RecentUploads from '../../component/RecentUploads/RecentUploads.jsx';
import { MoreDetailsPageFooter } from '../../component/Footer/MoreDetailsPageFooter.jsx';
import Followers from '../../component/Followers/Followers.jsx';
import Followings from '../../component/Followings/Followings.jsx';
import ContactDetails from './ContactDetails.jsx';
import EntpContactDet from './EntpContactDet.jsx';
import EntpLicenceDetails from './EntpLicenceDetails.jsx';
import { confirmAlert } from "react-confirm-alert";
import { HiUserGroup } from 'react-icons/hi';
import { useRef } from 'react';


const MoreDetails = () => {

const {role,cover_image_url,sector,netWorth,setEmp,chairman,chro,hq,designation,branches,totEmp,description,license_doc_url,official_site_url,title,
getFollowings,followings,followers,showFollowings,setShowFollowings,showFollower,setShowFollower
,getFollowers,checkFollows,profile_photo,handleSaveLang,getLang,deleteLang,setBranches,updateViewers,
langText,langData,setLangData,setLangText,langForm,setLagForm,skillData,deleteSkills,getSkills
,ratings,setRatings,skillText,setskillText,handleSaveSkills,setSkillForm,skillForm,pinCode,setPinCode
,handleDeleteeducdet, getEducDet,handleSaveChanges,instituteName,setInstituteName,degree,setDegree,startDate,setStartDate,
endDate,isFollow,setEndDate,loginData,certificate,setCertificate, fillEducationDet,handleEducationDetAddBtn ,
setFillEduc,educationDetails, edit,setEdit,editProf,setEditProf,currStatus,handleEditModals,editNameModal,setEditNameModal, expectedCTC
,setExpectedCTC,setCurrStatus,gender , setGender,handleMoreDetails,name,formattedDate,email,aboutMe,setClickedStar,clickedStar,
phnum,deg,company,post,state,city,landMark,insta,git,fb,twitter,params,handleFollowBtn 
} = MoreDetailsLogic()




const paramsId = parseInt(params?.id, 10); 


















const hasUpdatedView = useRef(false);

useEffect(() => {
  getFollowers();
  getFollowings();

  if (loginData?.id !== params?.id && !hasUpdatedView.current) {
    hasUpdatedView.current = true; 
    updateViewers();
  }
}, [params]);
useEffect(()=>{
  handleMoreDetails()
  getSkills()
  getLang()
},[])



useEffect(() => {
  const today = new Date().toDateString(); 
  const lastAlertDate = localStorage.getItem("titleAlertShownDate");
  
  if (  loginData?.id == params?.id  &&   loginData?.role === 'Employee' &&    title == null && lastAlertDate !== today) 
    {alert("Please give yourself a title so companies can understand your preference");
      localStorage.setItem("titleAlertShownDate", today);
    }
  }, [loginData, title]);
  
  useEffect(()=>{
    checkFollows()
  },[loginData])
  
  
  useEffect(()=>{
    getEducDet()
  },[fillEducationDet])
  
  
  
  const [editEmp , setEditEmp ] = useState(false)
  
  
  
  return (
    <main className='more-details-main'    >
      {showFollower  ?  <Followers   getFollowers={getFollowers}  loginData={loginData}  checkFollows={checkFollows} setShowFollower={setShowFollower}  followers={followers} /> :  <></> }


{showFollowings ?  <Followings paramsId={paramsId} loginData={loginData} setShowFollowings={setShowFollowings} followings={followings}   getFollowings={getFollowings} /> :  <></> }


{  editProf ?   <EditOtherDet    edit={edit} setEditProf={setEditProf} editProf={editProf}  handleMoreDetails={handleMoreDetails} />  : <></> }

{ editNameModal ?   <EditNameModal   setEditNameModal={setEditNameModal} paramsId={paramsId}  handleEditModals={handleEditModals}   handleMoreDetails={handleMoreDetails}   />     : <></> }


<div    className='  more-details-main-subdiv'   >
 <small> {paramsId === loginData?.id  ? <TbEdit  className='tbeditsec' onClick={handleEditModals} />    : <></>  }    </small>
<div className='more-details-background-img' > 
  </div>


<div  className='more-details-user-name' >  
<h2   >  {name?.toUpperCase() }  </h2>
<h6> {title} </h6>
<div className='mediLinksAndFollBtnCont' >

<div className='socialMediaLinks' > 
  
{ loginData?.role === 'Enterprise' ?   <></> : insta !== 'null' ?  <Link  to={insta}  > <FaInstagram />   </Link>  : <Link  onClick={()=>{alert('user has not provided url to access his Insta account')}}   > <FaInstagram className='text-secondary' />   </Link> }
{loginData?.role === 'Enterprise' ?   <></> :fb !== 'null' ?   <Link  to={fb}  ><FaFacebook /></Link  >            : <Link onClick={()=>{alert('user has not provided url to access his FaceBook account')}}  ><FaFacebook    className='text-secondary'/></Link>}
{loginData?.role === 'Enterprise' ?   <></> :git !== 'null' ?  <Link  to={git} ><FaGithub /></Link>                : <Link  onClick={()=>{alert('user has not provided url to access his Git account')}}    ><FaGithub className='text-secondary' /></Link> }
{twitter !== 'null'  ?  <Link
  style={{width:loginData?.role === 'Enterprise' ? '28%' :'0%' ,
  }}
  to={twitter}
>
  <FaTwitter />
</Link>
    : <Link  onClick={()=>{alert('user has not provided url to access his Twitter account')}}   > <FaTwitter  className='text-secondary' /> </Link> }
 </div>

{paramsId === loginData?.id ?  <></> : <button className={`${!isFollow ? 'btn btn-primary'  :  'btn btn-danger'   } follwBtn`}     onClick={handleFollowBtn}  > {isFollow ? 'UnFollow' : 'Follow' } </button>
  } 
</div>


</div>

{loginData?.profile_photo ?  <img src={ profile_photo} alt="err" className='img-details-page' />  :<MdAccountCircle  className='MdAccountCircle-details-page' />}
<div className='detalis-aboutme-container' >  
<p className='detalis-aboutme-para'>
  {aboutMe && aboutMe.trim() !== '' ? (
    aboutMe
  ) : (
    <span style={{ color: 'gray', fontStyle: 'italic' }}>
      Not Described by {name}
    </span>
  )}
</p>
</div>




<div className='more-details-info-container' > 
<div className='deta-cont' >
<div className='user-info-moredetailpage' > <h5 className='info-para-headings'   > Followers </h5>  <p className= {`${paramsId === loginData?.id  ?   'info-para'  : 'info-para-other-user'  }`}  > {followers?.length} </p>  <FaRegEye onClick={()=>{setShowFollower(!showFollower)}}  className='more-detai-TbEdit' />
</div> 


<div className='user-info-moredetailpage' > <h5 className='info-para-headings' > Birth </h5>  <p className='info-para'> {formattedDate}  </p> {paramsId === loginData?.id  ? <TbEdit className='more-detai-TbEdit' onClick={()=>{setEditProf(!editProf), setEdit('dob')  }}  />    : <></>  } 
</div> 
{loginData?.role === 'Enterprise' ?  <div className='user-info-moredetailpage' > <h5 className='info-para-headings' > Sector </h5> <p className='info-para'>
  {sector?.charAt(0).toUpperCase() + sector?.slice(1) }
</p>  {paramsId === loginData?.id  ? <TbEdit className='more-detai-TbEdit'  onClick={()=>{setEditProf(!editProf), setEdit('Sector')  }}  />   : <></>  }
 </div> 
  : <div className='user-info-moredetailpage' > <h5 className='info-para-headings' > Gender </h5> <p className='info-para'>
  {gender}
</p>  {paramsId === loginData?.id  ? <TbEdit className='more-detai-TbEdit'  onClick={()=>{setEditProf(!editProf), setEdit('gender')  }}  />   : <></>  }
 </div> 
 }
{loginData?.role === 'Enterprise' ?  <div className='user-info-moredetailpage' > <h5 className='info-para-headings' > Designation </h5> <p className='info-para'>
  {designation}
</p>  {paramsId === loginData?.id  ? <TbEdit className='more-detai-TbEdit'  onClick={()=>{setEditProf(!editProf), setEdit('Designation')  }}  />   : <></>  }
 </div> 
  : <div className='user-info-moredetailpage' > <h5 className='info-para-headings' > Currently </h5>  <p className='info-para'> {currStatus} </p>  {paramsId === loginData?.id  ?<TbEdit   onClick={()=>{setEditProf(!editProf), setEdit('currently')  }}  className='more-detai-TbEdit'/> : <></>  } 
 </div> 
 
 }


</div> 
<div className='deta-cont' >

<div className='user-info-moredetailpage' > <h5 className='info-para-headings'   > Following </h5>  <p className= {`${paramsId === loginData?.id  ?   'info-para'  : 'info-para-other-user'  }`}  >  {followings?.length} </p>  <FaRegEye   onClick={()=>{setShowFollowings(!showFollowings)}} className='more-detai-TbEdit' />
</div> 

{loginData?.role === 'Enterprise' ?  <div className='user-info-moredetailpage' > <h5 className='info-para-headings' > Chairman </h5> <p className='info-para'>
  {chairman?.charAt(0).toUpperCase() + chairman?.slice(1) }
</p>  {paramsId === loginData?.id  ? <TbEdit className='more-detai-TbEdit'  onClick={()=>{setEditProf(!editProf), setEdit('Chairman')  }}  />   : <></>  }
 </div> :
 <div className='user-info-moredetailpage' > <h5 className='info-para-headings' > Company </h5>  <p className='info-para'> {company } </p>   {paramsId === loginData?.id  ? <TbEdit onClick={()=>{setEditProf(!editProf), setEdit('company')  }} className='more-detai-TbEdit'/> : <></>  } 
</div> 

 }

{loginData?.role === 'Enterprise' ?  <div className='user-info-moredetailpage' > <h5 className='info-para-headings' > CHRO </h5> <p className='info-para'>
  {chro?.charAt(0).toUpperCase() + chro?.slice(1) }
</p>  {paramsId === loginData?.id  ? <TbEdit className='more-detai-TbEdit'  onClick={()=>{setEditProf(!editProf), setEdit('CHRO')  }}  />   : <></>  }
 </div> :
<div className='user-info-moredetailpage' > <h5 className='info-para-headings' > Post </h5>  <p className='info-para'> {post} </p>   {paramsId === loginData?.id ?  <TbEdit onClick={()=>{setEditProf(!editProf), setEdit('post')  }} className='more-detai-TbEdit'/> : <></>  }   
</div> 

 }

{loginData?.role === 'Enterprise' ?  <div className='user-info-moredetailpage' > <h5 className='info-para-headings' > Net Worth </h5> <p className='info-para'>
  {netWorth?.trim()?.length > 0  ?   netWorth  :   <>
      <GiMoneyStack className='moredet-malefemal' />
      <span style={{ color: 'gray', fontStyle: 'italic' }}>Not Provided</span>
    </>
     }
</p>  {paramsId === loginData?.id  ? <TbEdit className='more-detai-TbEdit'  onClick={()=>{setEditProf(!editProf), setEdit('netWorth')  }}  />   : <></>  }
 </div> :
<div className='user-info-moredetailpage' > <h5 className='info-para-headings' > Expected CTC  </h5>  <p className='info-para'>
  {expectedCTC != 'null'   ? (
    expectedCTC
  ) : (
    <>
      <GiMoneyStack className='moredet-malefemal' />{' '}
      <span style={{ color: 'gray', fontStyle: 'italic' }}>Not Provided</span>
    </>
  )}
</p>
  {paramsId === loginData?.id ?   <TbEdit className='more-detai-TbEdit' onClick={()=>{setEditProf(!editProf), setEdit('ctc')  }} /> : <></>  }

</div>
 }


 
</div>

     </div>







</div>


<div className='profile-second-mainddiv' >



{ paramsId == loginData?.id  ? loginData?.role !== 'Enterprise'  ? 
<div className='educ-div'  >

<div className='RxPlus-cont'   > <h1 className='m-4' >Education Details     </h1>
{paramsId === loginData?.id ? <div className='RxPlus-subCont' >

  <RxPlus className='RxPlus'  onClick={handleEducationDetAddBtn} ></RxPlus>  
 <span className="tooltipAdd" > Add More </span>
 
 </div>
    : <></> }
 </div>
<div  className='form-educdetcont' >

  
{   fillEducationDet ? <form      onSubmit={handleSaveChanges} className='newEducFormModal' > 
<div>  
<RxCross1  style={{ float:'right' , cursor:'pointer'}}  onClick={()=>{setFillEduc(false)}} ></RxCross1>
</div>
<div><label htmlFor="" className='form-label' > Institution Name </label>
<input type="text"  required className='form-control'  onChange={(e)=>{setInstituteName(e.target.value)}} />
</div>
<div><label htmlFor="" className='form-label' > Degree </label>
<input type="text"required className='form-control'  onChange={(e)=>{setDegree(e.target.value)}} />
</div>



<div className='educFormDateCont' >

<div  > <label htmlFor="" className='form-label' > Start date </label>

  <input type="date" required className='form-control' onChange={(e)=>{setStartDate(e.target.value)}} />
</div>

<div><label htmlFor="" className='form-label' > End date</label>
<input type="date" required className='form-control'  onChange={(e)=>{setEndDate(e.target.value)}} />



</div>

</div>


<div>
<label htmlFor="" className='form-label' > Upload Certificate </label>
    <input type="file" required  className='form-control educFormFileInout'  onChange={(e)=>{setCertificate(e.target.files[0])}} />

</div>

<button className='btn btn-primary '  >save changes </button>

   </form> :<></> }

{

educationDetails?.length ===0 ?       <div style={{  width:'70%',textAlign:'center',marginTop:'10vh'}} >  <span style={{ color: 'gray',marginLeft:'8vw',marginTop:'2vh' ,fontStyle: 'italic' }}>
      Not Provided by {name}
    </span> </div>
 : [...educationDetails]?.reverse().map((e,i)=>{
 const start = new Date(e?.startDate).toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });

    const end = new Date(e?.endDate).toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });

    return(
  <div  key={i} className='educ-det-cont' > 
  <div >  
<RxCross1  style={{ float:'right' ,cursor:'pointer'}}  onClick={()=>{handleDeleteeducdet(e?.id)}} ></RxCross1>
</div>

  <h5 className='collage-head'> {e?.instituteName} </h5>
  <p className='degree-para' > {e?.degree}  </p>
<div style={{display:'flex'  , justifyContent:'space-between' , width:'60%'}} >
<small className='duration-small'> {start}  <RxMinus></RxMinus>     {end} </small>   
  
<img src={e?.certificate?.split('.\\client\\').join('..\\..\\..\\') }  className='marksheet-img' alt="" />


</div>
   </div> 

    )


}
)

}
</div>



</div>  :
 <EntpLicenceDetails  totEmp={totEmp}   setEdit={setEdit} setEditProf={setEditProf}   editProf={editProf}   branches={branches} setBranches={setBranches} editEmp={editEmp}  setEditEmp={setEditEmp }    /> :
 
 role != 'Enterprise' ?
  <div className='educ-div'  >

<div className='RxPlus-cont'   > <h1 className='m-4' >Education Details     </h1>
{paramsId === loginData?.id ? <div className='RxPlus-subCont' >

  <RxPlus className='RxPlus'  onClick={handleEducationDetAddBtn} ></RxPlus>  
 <span className="tooltipAdd" > Add More </span>
 
 </div>
    : <></> }
 </div>
<div  className='form-educdetcont' >

  
{   fillEducationDet ? <form      onSubmit={handleSaveChanges} className='newEducFormModal' > 
<div>  
<RxCross1  style={{ float:'right' , cursor:'pointer'}}  onClick={()=>{setFillEduc(false)}} ></RxCross1>
</div>
<div><label htmlFor="" className='form-label' > Institution Name </label>
<input type="text"  required className='form-control'  onChange={(e)=>{setInstituteName(e.target.value)}} />
</div>
<div><label htmlFor="" className='form-label' > Degree </label>
<input type="text"required className='form-control'  onChange={(e)=>{setDegree(e.target.value)}} />
</div>



<div className='educFormDateCont' >

<div  > <label htmlFor="" className='form-label' > Start date </label>

  <input type="date" required className='form-control' onChange={(e)=>{setStartDate(e.target.value)}} />
</div>

<div><label htmlFor="" className='form-label' > End date</label>
<input type="date" required className='form-control'  onChange={(e)=>{setEndDate(e.target.value)}} />



</div>

</div>


<div>
<label htmlFor="" className='form-label' > Upload Certificate </label>
    <input type="file" required  className='form-control educFormFileInout'  onChange={(e)=>{setCertificate(e.target.files[0])}} />

</div>

<button className='btn btn-primary '  >save changes </button>

   </form> :<></> }

{

educationDetails?.length ===0 ?       <div style={{  width:'70%',textAlign:'center',marginTop:'10vh'}} >  <span style={{ color: 'gray',marginLeft:'8vw',marginTop:'2vh' ,fontStyle: 'italic' }}>
      Not Provided by {name}
    </span> </div>
 : [...educationDetails]?.reverse().map((e,i)=>{
 const start = new Date(e?.startDate).toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });

    const end = new Date(e?.endDate).toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });

    return(
  <div  key={i} className='educ-det-cont' > 
  <div >  
<RxCross1  style={{ float:'right' ,cursor:'pointer'}}  onClick={()=>{handleDeleteeducdet(e?.id)}} ></RxCross1>
</div>

  <h5 className='collage-head'> {e?.instituteName} </h5>
  <p className='degree-para' > {e?.degree}  </p>
<div style={{display:'flex'  , justifyContent:'space-between' , width:'60%'}} >
<small className='duration-small'> {start}  <RxMinus></RxMinus>     {end} </small>   
  
<img src={e?.certificate?.split('.\\client\\').join('..\\..\\..\\') }  className='marksheet-img' alt="" />


</div>
   </div> 

    )


}
)

}
</div>



</div>   : <EntpLicenceDetails  totEmp={totEmp}   setEdit={setEdit} setEditProf={setEditProf}   editProf={editProf}   branches={branches} setBranches={setBranches} editEmp={editEmp}  setEditEmp={setEditEmp }    /> 

 }



{paramsId == loginData?.id  ?  loginData?.role === 'Enterprise'  ? <div style={{height:'100%', width:"50%" }} > <EntpContactDet  hq={hq}  official_site_url={official_site_url}   branches={branches} setEdit={setEdit}  editProf={editProf} setEditProf={setEditProf} paramsId={paramsId} loginData={loginData}  phnum={phnum}  email={email} city={city} landMark={landMark} state={state} pinCode={pinCode}  />    </div>
  :           <ContactDetails  deleteLang={deleteLang} setLangText={setLangText} handleSaveLang={handleSaveLang}  setClickedStar={setClickedStar}  deleteSkills={deleteSkills} setLagForm ={setLagForm } setRatings={setRatings} skillText={skillText} setskillText={setskillText}  clickedStar={clickedStar}  handleSaveSkills={handleSaveSkills}  setSkillForm={setSkillForm}      setEdit={setEdit}   editProf={editProf} setEditProf={setEditProf}   paramsId={paramsId} loginData={loginData}  phnum={phnum}  email={email} city={city} landMark={landMark} state={state} pinCode={pinCode} skillForm={skillForm}  skillData={skillData} langForm={langForm}   langData={langData}  />
: role =='Enterprise'?   <div style={{height:'100%', width:"50%" }} > <EntpContactDet  hq={hq}  official_site_url={official_site_url}   branches={branches} setEdit={setEdit}  editProf={editProf} setEditProf={setEditProf} paramsId={paramsId} loginData={loginData}  phnum={phnum}  email={email} city={city} landMark={landMark} state={state} pinCode={pinCode}  />    </div>
  :           <ContactDetails  deleteLang={deleteLang} setLangText={setLangText} handleSaveLang={handleSaveLang}  setClickedStar={setClickedStar}  deleteSkills={deleteSkills} setLagForm ={setLagForm } setRatings={setRatings} skillText={skillText} setskillText={setskillText}  clickedStar={clickedStar}  handleSaveSkills={handleSaveSkills}  setSkillForm={setSkillForm}      setEdit={setEdit}   editProf={editProf} setEditProf={setEditProf}   paramsId={paramsId} loginData={loginData}  phnum={phnum}  email={email} city={city} landMark={landMark} state={state} pinCode={pinCode} skillForm={skillForm}  skillData={skillData} langForm={langForm}   langData={langData}  />
  
}






    </div>


<RecentUploads></RecentUploads>
<MoreDetailsPageFooter/>

    </main>
  )
}

export default MoreDetails;