import React, { useState } from 'react';
import './EditNameModal.css'
import {  useSelector } from 'react-redux';
import { useEffect } from 'react';
import { loginSliceAction } from '../../../store/loginSlice';

const EditNameModal = ({handleMoreDetails,setEditNameModal,handleEditModals,paramsId}) => {


  const loginData=useSelector(s=>s.loginData)

const [name,setName] = useState(null)
const [title,setTitle] = useState(null)
const [insta,setInsta] = useState(null)
const [fb,setFB] = useState(null)
const [git,setGit] = useState(null)
const [twitter,setTwitter] = useState(null)
const [aboutMe,setAboutME] = useState(null)
 


const handleSaveChanges  = async (e) => {
  try {
e.preventDefault()
    const formData = new FormData();

    formData.append('name', name);
    formData.append('AboutME', aboutMe);
    formData.append('twitterURL', twitter);
    formData.append('facebookURL', fb);
    formData.append('GitHubURL', git);
    formData.append('instagramURL', insta);
    formData.append('Title', title);
    

    const res = await fetch(`http://localhost:1800/api/user/complete_profile/${loginData?.email}`, {
      method: 'PUT',
      body: formData,
    });

    const data = await res.json();
    
    if (data?.success === true) {
      handleMoreDetails()
      setEditNameModal(false)
      return   alert('Profile Updated Succesfully')
    }

    if (data?.success === false) {
    return alert('can not update your profile now due to some error')
    }


  } catch (error) {
    console.log(error);
  }
};



const handleMoreDetailsforINpt = async () => {
    try { 



        const res = await fetch(`http://localhost:1800/api/user/get_ourProfile/${paramsId}`)
   const data = await res.json()



   
if (data?.success) {
setName(data?.user?.name)
setTitle(data?.Title)
setFB(data?.user?.facebookURL)
setInsta(data?.user?.instagramURL)
setGit(data?.user?.GitHubURL)
setTwitter(data?.user?.twitterURL)
setAboutME(data?.user?.AboutME)
}


} catch (error) {
        console.log(error);
    }
}







useEffect(()=>{
  handleMoreDetailsforINpt()
 
},[])





  return (
    <main className='editnameModal'>

<div className='formeditdiv' ><h4>Edit Profile </h4>  </div>
<form  onSubmit={handleSaveChanges} className='editNameModalForm' >
 <div className='editNameModalForm-subdiv' >
 <div className='editNamemodDiv1' >
  <div class="mb-3 inputSubDivseditNamemodal">
    <label for="exampleInputEmail1" class="form-label"> Change Name  </label>
    <input type="text" class="form-control"  value={name}  onChange={(e)=>{setName(e.target.value)}} id="exampleInputEmail1" aria-describedby="emailHelp"/>
  </div>
  <div class="mb-3 inputSubDivseditNamemodal">
    <label for="exampleInputEmail1" class="form-label"> Change Instagram's URL  </label>
    <input type="text" class="form-control"  value={insta}  onChange={(e)=>{setInsta(e.target.value)}} id="exampleInputEmail1" aria-describedby="emailHelp"/>
  </div>
  <div class="mb-3 inputSubDivseditNamemodal">
    <label for="exampleInputEmail1" class="form-label"> Change FaceBook's URL  </label>
    <input type="text" class="form-control" id="exampleInputEmail1" value={fb}  onChange={(e)=>{setFB(e.target.value)}} aria-describedby="emailHelp"/>
  </div>

 </div>



 <div className='editNamemodDiv1' >
  <div class="mb-3 inputSubDivseditNamemodal ">
    <label for="exampleInputEmail1" class="form-label"> Change Your Title  </label>
    <input type="text" class="form-control" id="exampleInputEmail1"  value={title}  onChange={(e)=>{setTitle(e.target.value)}} aria-describedby="emailHelp"/>
  </div>
  <div class="mb-3 inputSubDivseditNamemodal">
    <label for="exampleInputEmail1" class="form-label"> Change GitHub's URL  </label>
    <input type="text" class="form-control" id="exampleInputEmail1" value={git}  onChange={(e)=>{setGit(e.target.value)}} aria-describedby="emailHelp"/>
  </div>
  <div class="mb-3 inputSubDivseditNamemodal">
    <label for="exampleInputEmail1" class="form-label"> Change Twitter's URL  </label>
    <input type="text" class="form-control" id="exampleInputEmail1" value={twitter}  onChange={(e)=>{setTwitter(e.target.value)}} aria-describedby="emailHelp"/>
  </div>

 </div>
</div>

  <textarea className='txtar  form-control'  value={aboutMe}  onChange={(e)=>{setAboutME(e.target.value)}}  name="" id=""></textarea>
<div className='editNameBtnsdiv' >
<button className='btn btn-secondary'  type='button' onClick={handleEditModals} > Close </button>
   <button className='btn btn-primary'  type='submit' > Save Changes </button>

 </div>


 </form>
    </main>
  );
};

export default EditNameModal;