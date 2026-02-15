import { db } from "../config/db.js";
import { ensureDirExists } from "../helper/userhelper.js";
import fs from 'fs';
import { deleteProject, findProjByProjId, findProjectsByUserId, getAllProjectLikes, saveProject, updateDisLikesById, updateLikesById } from "../model/ProjectModal.js";

import cloudinary from "../cloudinary.js"; 





export const saveProjectController = async (req, res) => {
  try {
    const { description, commentsOn, projectUrl, techniques_used, startDate, endDate } = req.fields;
    const { user_id } = req.params;
    const { photo_uploads } = req.files;

    const tech_usedInProj = Array.isArray(techniques_used) ? techniques_used : [techniques_used];
    const tech_used = tech_usedInProj?.length > 0 ? JSON.stringify(tech_usedInProj) : null;

    let commOn = commentsOn === "true" ? 1 : 0;

    const projectphotoPath = [];

    if (photo_uploads) {
      const photosArray = Array.isArray(photo_uploads) ? photo_uploads : [photo_uploads];

      for (let photo of photosArray) {
        // Upload to Cloudinary using the temp path from formidable
        const result = await cloudinary.uploader.upload(photo.path, {
          folder: "projectPhotos",
        });
        projectphotoPath.push(result.secure_url); // ✅ Cloudinary URL
      }
    }

    const post = projectphotoPath.length > 0 ? JSON.stringify(projectphotoPath) : null;

    const savedProjects = await saveProject(
      user_id,
      description,
      post,
      commOn,
      projectUrl,
      tech_used,
      startDate,
      endDate
    );

    if (savedProjects?.insertId) {
      return res.status(202).send({ message: "Projects Uploaded Successfully", success: true });
    }
    return res
      .status(202)
      .send({ message: "Projects could not be uploaded currently, please try later", success: false });
  } catch (error) {
    console.error(error);
    return res.status(500).send({ message: "Error in server", success: false });
  }
};



export const getProjectController = async (req,res) => {
    try {
        

  const {user_id} = req.params;

  console.log('user_id',user_id);
  
const projects = await findProjectsByUserId(user_id)

if (projects) {
    return res.status(202).send({message:'projects fetched succesfully', projects,success:true })
}

    return res.status(404).send({message:'no projects found', success:false })


    } catch (error) {
        console.log(error);
    return res.status(505).send({message:'error in server', success:false })
        
}}





export const deleteProjectController = async (req, res) => {
  try {
    const { project_id } = req.params;
  
    const [projectData] = await db.execute('SELECT photo_uploads FROM projects WHERE id = ?', [project_id]);
    const photoField = projectData?.[0]?.photo_uploads;
console.log(photoField);

    const imagePaths = photoField ? JSON.parse(photoField) : [];

    const result = await deleteProject(project_id); 


    if (result.affectedRows > 0) {
      imagePaths?.forEach((path) => {
        try {
          fs.unlinkSync(path); 
          console.log(`Deleted file: ${path}`);
        } catch (err) {
          console.error(`Error deleting ${path}:`, err.message);
        }
      });

      return res.status(202).send({ message: 'project and files deleted successfully', success: true });
    }

    return res.status(404).send({ message: 'No projects deleted', success: false });
  } catch (error) {
    console.log(error);
    return res.status(505).send({ message: 'Server error', success: false });
  }
};




export const likeProjectController = async (req,res) => {
  try {
    
const {pid,id} = req.params;




const proj = await findProjByProjId(pid);

if (!proj?.id) {
  return res.status(404).send({message:'Project is not found in Database', success:false  }   )
}

let likesArray =  []
let disLikesArray =  []

 if (!proj.likes){
  likesArray = []
 }else{
likesArray = JSON.parse(proj?.likes)
 }

const index = likesArray.indexOf(id);
if (index !== -1) {
  likesArray?.splice(index,1)
}else{
  likesArray?.push(id);
}
const updatedLikes = JSON.stringify(likesArray)
const result = await updateLikesById(updatedLikes,pid)


if(!proj?.disLikes) {
disLikesArray = []  
}else{
  disLikesArray = JSON.parse(proj?.disLikes)
}


const disLikesArrIndx = disLikesArray?.indexOf(id);

if(disLikesArrIndx !== -1) {
  disLikesArray?.splice(disLikesArrIndx,1)

const updatedDisLikes = JSON.stringify(disLikesArray)

 await updateDisLikesById(updatedDisLikes,pid)

}







if (result?.affectedRows > 0 ) {
return res.status(200).send({ 
      message: 'Project likes updated',
      success: true,
      likes: likesArray
    });
  
}


return res.status(400).send({ 
      message: 'likes not updated',
      success: false,
      likes: likesArray
    });


  } catch (error) {
    console.log(error);
    return res.status(505).send({ message: 'Server error', success: false });
    
  }
}





export const disLikeProjectController = async (req,res) => {
  try {
    
const {pid,id} = req.params;



const proj = await findProjByProjId(pid);

if (!proj?.id) {
  return res.status(404).send({message:'Project is not found in Database', success:false  }   )
}

let disLikesArray =  []
let likesArray = []
 if (!proj.disLikes){
  disLikesArray = []
 }else{
disLikesArray = JSON.parse(proj?.disLikes)
 }

const index = disLikesArray?.indexOf(id);
if (index !== -1) {
  disLikesArray?.splice(index,1)
}else{
  disLikesArray?.push(id);
}


const updatedDisLikes = JSON.stringify(disLikesArray)

const result = await updateDisLikesById(updatedDisLikes,pid)


if (!proj?.likes) {
  likesArray = []
}else{
  likesArray = JSON.parse(proj?.likes) 
}

const likesIndex = likesArray?.indexOf(id)

if (likesIndex !== -1){
  likesArray.splice(likesIndex,1)

const updatedLikes = JSON.stringify(likesArray)

 await updateLikesById(updatedLikes,pid)

}






if (result?.affectedRows > 0 ) {
return res.status(200).send({ 
      message: 'Project disLikes updated',
      success: true,
      disLikes: disLikesArray
    });
  
}


return res.status(400).send({ 
      message: 'disLikes not updated',
      success: false,
      disLikes: disLikesArray
    });


  } catch (error) {
    console.log(error);
    return res.status(505).send({ message: 'Server error', success: false });
    
  }
}




export const getAllProjectLikesController = async (req,res) => {
  try {
    
const {uid} = req.params;


const rows = await getAllProjectLikes(uid)

if (Array?.isArray(rows)) {
   return res.status(200).send({  success: true  , rows});

}

} catch (error) {
    console.log(error);
     return res.status(505).send({ message: 'Server error', success: false });
  }
}