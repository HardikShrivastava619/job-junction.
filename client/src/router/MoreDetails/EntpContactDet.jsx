import React from 'react'
import { TbEdit } from 'react-icons/tb'
import { Link } from 'react-router-dom'

const EntpContactDet = ({hq,official_site_url,branches,setEdit,editProf,city,pinCode,state,landMark,email,phnum,loginData,paramsId,setEditProf}) => {
  return (
<div  style={{ width:'100%',height:'50vh',display:'flex' , alignItems:'center',flexDirection:'column' }} >  <h1 className='m-4' >Contact Details </h1>
    <div className='contact-details-cont'>
      <div className='contact-det' > <h5 className='contact-para-headings' > 
      Email </h5> 
     <p className={`${paramsId === loginData?.id  ?  'contact-det-para'  :   'contact-det-para-other-user' }`} > {email}  </p>       {paramsId === loginData?.id ?     <TbEdit className='contact-detai-TbEdit' onClick={()=>{setEditProf(!editProf), setEdit('email')  }}  />
    : <></>  }
    </div> 
     <div className='contact-det' > <h5 className='contact-para-headings' > 
      HQ </h5> 
     <p className={`${paramsId === loginData?.id  ?  'contact-det-para'  :   'contact-det-para-other-user' }`}>  {hq}  </p>        {paramsId === loginData?.id ?       <TbEdit className='contact-detai-TbEdit' onClick={()=>{setEditProf(!editProf), setEdit('hq')  }} />: <></>  }
    </div> 
     <div className='contact-det' > <h5 className='contact-para-headings'> 
     Branches </h5> 
     <p className={`${paramsId === loginData?.id  ?  'contact-det-para'  :   'contact-det-para-other-user' }`}> {branches}    </p>   {paramsId === loginData?.id ?  <TbEdit className='contact-detai-TbEdit' onClick={()=>{setEditProf(!editProf), setEdit('Branches')  }} />
    : <></>  }
    </div> 
    
    
    <div className='contact-det' > <h5 className='contact-para-headings' > 
   WebSite </h5> 
     <Link  style={{textDecoration:'none'}} className={`${paramsId === loginData?.id  ?  'contact-det-para'  :   'contact-det-para-other-user' }`}> {official_site_url}   </Link>   {paramsId === loginData?.id ?   <TbEdit className='contact-detai-TbEdit' onClick={()=>{setEditProf(!editProf), setEdit('Official URL')  }}  />: <></>  }
    </div> 
    
    
     </div>
    


    


    </div>





)
}

export default EntpContactDet