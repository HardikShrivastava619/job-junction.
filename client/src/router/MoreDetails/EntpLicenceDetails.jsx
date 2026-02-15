import React from 'react'
import { HiUserGroup } from 'react-icons/hi'
import './EntpLicence.css'
import { FaCodeBranch } from 'react-icons/fa'
import { TbEdit } from 'react-icons/tb'


const EntpLicenceDetails = ({editEmp,setEdit,totEmp,editProf,branches,setEditProf} ) => {



  


  return (
    <div className='branch-license-div'   >
        
<div style={{borderBottom:'1px solid silver', width:'90%',display:'flex', marginTop:'4vh',height:'37%',flexDirection:'column' }} >
<h1 className='' > License  Details </h1>
<div className='d-flex w-100 h-100' style={{justifyContent:'space-around', alignItems:'center' }} > 
<img src="../../../public/images/Amazon.jpg"   style={{width:'40%' , height:'80%' , }} alt="" />

<div  className='d-flex w-25 gap-3' style={{justifyContent:'center',  }}  >

<h5> Verified : </h5>
<p style={{color:'#9370db'}} > Yes </p>

</div>



</div>


</div>



<div   style={{borderBottom:'1px solid silver',display:'flex', width:'90%',margin:'5vh 0vw 4vh 1vw' ,height:'37%',flexDirection:'column' }} >

<div  className='totEmp-Cont' >

<div  className={  editEmp ?   ' HiUserGroup-detEdit  HiUserGroup-cont'   : 'HiUserGroup-cont'  }  >
    <HiUserGroup   className='HiUserGroup-det' />
<h4> Total Employees </h4>
</div>


<div    className='totEmp-Cont-input-cont' >
<input type="number"  className={  editEmp ?   ' HiUserGroup-detEdit  totEMp-input text-center form-control'   : 'totEMp-input text-center form-control'  }    value={totEmp}  disabled/>


</div>

</div>
<TbEdit className='emp-edit'onClick={()=>{setEditProf(!editProf), setEdit('emp')  }} 
  ></TbEdit>

</div>



<div style={{  borderBottom:'1px solid silver',display:'flex', margin:'5vh 0vw 4vh 1vw',width:'90%'   ,height:'37%',flexDirection:'column' }} >

<div className='totEmp-Cont' >


<div className='HiUserGroup-cont' >
    <FaCodeBranch      className='HiUserGroup-det' />
<h4 className=' mt-4 ' style={{marginRight:'5vw'}} > Total Branches </h4>
</div>

<div  className='totEmp-Cont-input-cont' >
<input type="number"  className='totEMp-input text-center form-control'  value={branches} disabled />



</div>


</div>
<TbEdit className='emp-edit'  onClick={()=>{setEditProf(!editProf), setEdit('Branches')  }}  ></TbEdit>

</div>







    </div>
  )
}

export default EntpLicenceDetails