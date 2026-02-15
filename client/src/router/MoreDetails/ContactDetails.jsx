import React from 'react'
import { MdStarOutline, MdStarRate } from 'react-icons/md'
import { RxCross1, RxPlus } from 'react-icons/rx'
import { TbEdit } from 'react-icons/tb'

const ContactDetails = ({deleteLang,handleSaveLang,setLangText,setLagForm ,deleteSkills,setRatings,setskillText ,setClickedStar,clickedStar,handleSaveSkills,setSkillForm,setEdit,setEditProf,editProf,langData,langForm,skillData,skillForm,city,pinCode,state,landMark,email,phnum,loginData,paramsId}) => {
  
  return (


<div    className='  cont-main-div'  >

  <h1 className='m-4' >Contact Details </h1>
<div className='contact-details-cont'>
  <div className='contact-det'  > <h5  className='contact-para-headings' > Ph. no. </h5>
    <p className={`${paramsId === loginData?.id  ?  'contact-det-para'  :   'contact-det-para-other-user' }`}  > {phnum !== 'null' ? `+91${phnum}`  :  'Not Provided' }  </p> 
    {paramsId === loginData?.id ?    <TbEdit className='contact-detai-TbEdit' onClick={()=>{setEditProf(!editProf), setEdit('phone')  }} /> 
: <></>  }
    </div> 
 <div className='contact-det' > <h5 className='contact-para-headings' > 
  Email </h5> 
 <p className={`${paramsId === loginData?.id  ?  'contact-det-para'  :   'contact-det-para-other-user' }`} > {email}  </p>       {paramsId === loginData?.id ?     <TbEdit className='contact-detai-TbEdit' onClick={()=>{setEditProf(!editProf), setEdit('email')  }}  />
: <></>  }
</div> 
 <div className='contact-det' > <h5 className='contact-para-headings' > 
  Address</h5> 
 <p className={`${paramsId === loginData?.id  ?  'contact-det-para'  :   'contact-det-para-other-user' }`}>  {city} , {state}  </p>        {paramsId === loginData?.id ?       <TbEdit className='contact-detai-TbEdit' onClick={()=>{setEditProf(!editProf), setEdit('city')  }} />: <></>  }
</div> 
 <div className='contact-det' > <h5 className='contact-para-headings'> 
LandMark</h5> 
 <p className={`${paramsId === loginData?.id  ?  'contact-det-para'  :   'contact-det-para-other-user' }`}> {landMark}    </p>   {paramsId === loginData?.id ?  <TbEdit className='contact-detai-TbEdit' onClick={()=>{setEditProf(!editProf), setEdit('landMark')  }} />
: <></>  }
</div> 


<div className='contact-det' > <h5 className='contact-para-headings' > 
Pin-code</h5> 
 <p className={`${paramsId === loginData?.id  ?  'contact-det-para'  :   'contact-det-para-other-user' }`}> {pinCode}   </p>   {paramsId === loginData?.id ?   <TbEdit className='contact-detai-TbEdit' onClick={()=>{setEditProf(!editProf), setEdit('pincode')  }}  />: <></>  }
</div> 


 </div>








<div className='skills-cont'  > 

 <div   className='skillsubCont' > <h1>Skills </h1>

{paramsId === loginData?.id  ?  <RxPlus className='RxPlus'  onClick={()=>{setSkillForm(!skillForm)}}  ></RxPlus>
  : <></>  }

  </div>


<div className='skills-subcont'> 

{skillForm ? <form onSubmit={handleSaveSkills} className='contact-detForm' >
   <input type="text" required className='form-control skills-para-headings'  onChange={(e)=>{setskillText(e.target.value)}}  />

 <div className='stars-div'  >{ [1,2,3,4,5].map((s,i)=> (
 
<>  { clickedStar >= i ?  <MdStarRate className='text-warning' key={i}onClick={()=>{setRatings(s) ,setClickedStar(i)   }  } /> :<MdStarOutline  key={i}   onClick={()=>{setRatings(s) ,setClickedStar(i)   }  } /> }    
</>
 ) ) }  </div> 
    <button className='btn btn-primary saveSkillBtn'> ADD </button>
 </form> 
 : <></> }
 
 {
 skillData?.length === 0 ?      <span style={{ color: 'gray',marginLeft:'8vw',marginTop:'2vh' ,fontStyle: 'italic' }}>
      Not Provided by {name}
    </span>
 :  [...skillData]?.reverse()?.map((s,i)=> <div className='skills-contact-det'  >
   <h5 className='skills-para-headings' > 
{s?.skillText}
</h5> 
 <div className='stars-div'>

{[1,2,3,4,5].map((r , i)=> r <= s?.ratings  ?     <MdStarRate className='text-warning'  /> :    <MdStarOutline/>   ) }
</div>
<div className="icon-container">
  <RxCross1 className="contact-detai-TbEdit"  onClick={()=>{deleteSkills(s?.skills_id)}}  />
  <span className="tooltip">Delete</span>
</div>
</div> 




 )
 }
 
  
   </div>

</div>



<div className='lang-cont '   > 
<div   className='skillsubCont' > <h1>Languages </h1>

{paramsId === loginData?.id ?   <RxPlus className='RxPlus'  onClick={()=>{setLagForm(!langForm)}}  ></RxPlus>
  : <></> }
</div>


<div className='skills-subcont'> 
{langForm ? <form onSubmit={handleSaveLang} className='contact-detForm' >
   <input type="text" required className='form-control skills-para-headings'  onChange={(e)=>{setLangText(e.target.value)}}  />

 <div className='stars-div'  >{ [1,2,3,4,5].map((s,i)=> (
 
<>  { clickedStar >= i ?  <MdStarRate className='text-warning' key={i}onClick={()=>{setRatings(s) ,setClickedStar(i)   }  } /> :<MdStarOutline  key={i}   onClick={()=>{setRatings(s) ,setClickedStar(i)   }  } /> }    
</>
 ) ) }  </div> 
    <button className='btn btn-primary saveSkillBtn'> ADD </button>
 </form> 
 : <></> }

{ langData?.length >  0 ? [...langData]?.reverse()?.map((l,i)=> <div  className='contact-det' >
   <h5 className='skills-para-headings' > 
{l?.langText}
</h5> 
 
 <div className='stars-div'  > {[1,2,3,4,5].map((r , i)=> r <= l?.ratings  ?     <MdStarRate className='text-warning'  /> :    <MdStarOutline/>   ) }
   </div> <div className="icon-container">
  <RxCross1 className="contact-detai-TbEdit"  onClick={()=>{deleteLang(l?.language_id)}}  />
  <span className="tooltip">Delete</span>
</div>

</div>


) :  <span style={{ color: 'gray',marginLeft:'8vw',marginTop:'2vh' ,fontStyle: 'italic' }}>
      Not Provided by {name}
    </span>  }

 
  
   </div>

</div>



</div>  )
}

export default ContactDetails