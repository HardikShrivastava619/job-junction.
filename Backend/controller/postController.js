import { db } from "../config/db.js";
import { ensureDirExists } from "../helper/userhelper.js";
import { deletePost, findPostjByPostId, findPostsByUserId,  getAllLikes, getAllPosts, savePost, updateDisLikesById, updateLikesById } from "../model/postModal.js";
import fs from 'fs';
import cloudinary from "../cloudinary.js"; 





export const savePostController = async (req, res) => {
  try {
    const { description, commentsOn } = req.fields;
    const { user_id } = req.params;
    const { photo_uploads } = req.files;

    let commOn = commentsOn === "true" ? 1 : 0;
    const PostphotoPath = [];

    if (photo_uploads) {
      const photosArray = Array.isArray(photo_uploads)
        ? photo_uploads
        : [photo_uploads];

      for (let photo of photosArray) {
        // Upload to Cloudinary using the temp path from formidable
        const result = await cloudinary.uploader.upload(photo.path, {
          folder: "posts",
        });
        PostphotoPath.push(result.secure_url); // ✅ Cloudinary URL
      }
    }

    const post = PostphotoPath.length > 0 ? JSON.stringify(PostphotoPath) : null;

    const savedPost = await savePost(user_id, description, post, commOn);

    if (savedPost?.insertId) {
      return res
        .status(202)
        .send({ message: "Post Uploaded Successfully", success: true });
    }
    return res
      .status(202)
      .send({
        message: "Post could not be uploaded currently, please try later",
        success: false,
      });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .send({ message: "Error in server", success: false });
  }
};




export const getPostController = async (req,res) => {
    try {
        

  const {user_id} = req.params;

const posts = await findPostsByUserId(user_id)

if (posts) {
    return res.status(202).send({message:'Posts fetched succesfully', posts,success:true })
}

    return res.status(404).send({message:'no post found', success:false })


    } catch (error) {
        console.log(error);
    return res.status(505).send({message:'error in server', success:false })
        
}}





export const deletePostController = async (req, res) => {
  try {
    const { post_id } = req.params;

    const [postData] = await db.execute('SELECT photo_uploads FROM posts WHERE id = ?', [post_id]);
    const photoField = postData?.[0]?.photo_uploads;

    const imagePaths = photoField ? JSON.parse(photoField) : [];

    const result = await deletePost(post_id); 


    if (result.affectedRows > 0) {
      imagePaths.forEach((path) => {
        try {
          fs.unlinkSync(path); 
          console.log(`Deleted file: ${path}`);
        } catch (err) {
          console.error(`Error deleting ${path}:`, err.message);
        }
      });

      return res.status(202).send({ message: 'Post and files deleted successfully', success: true });
    }

    return res.status(404).send({ message: 'No post deleted', success: false });
  } catch (error) {
    console.log(error);
    return res.status(505).send({ message: 'Server error', success: false });
  }
};


export const getAllPostsController = async (req,res) => {
  try {
    
    const posts = await getAllPosts()


if (posts.length > 0) {
      return res.status(200).send({message:'Posts fetched succesfully', success:true, posts })

}

    return res.status(200).send({message:'No Post Found', success:false, posts })


  } catch (error) {
    console.log(error);
    
  }
}








export const likePostController = async (req,res) => {
  try {
    
const {pid,id} = req.params;




const post = await findPostjByPostId(pid);

if (!post?.id) {
  return res.status(404).send({message:'Post is not found in Database', success:false  }   )
}

let likesArray =  []
let disLikesArray =  []

 if (!post.likes){
  likesArray = []
 }else{
likesArray = JSON.parse(post?.likes)
 }

const index = likesArray.indexOf(id);
if (index !== -1) {
  likesArray?.splice(index,1)
}else{
  likesArray?.push(id);
}
const updatedLikes = JSON.stringify(likesArray)
const result = await updateLikesById(updatedLikes,pid)


if(!post?.disLikes) {
disLikesArray = []  
}else{
  disLikesArray = JSON.parse(post?.disLikes)
}


const disLikesArrIndx = disLikesArray?.indexOf(id);


if(disLikesArrIndx !== -1) {
  disLikesArray?.splice(disLikesArrIndx,1)

const updatedDisLikes = JSON.stringify(disLikesArray)

 await updateDisLikesById(updatedDisLikes,pid)

}







if (result?.affectedRows > 0 ) {
return res.status(200).send({ 
      message: 'Post likes updated',
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





export const disLikePostController = async (req,res) => {
  try {
    
const {pid,id} = req.params;



const post = await findPostjByPostId(pid);

if (!post?.id) {
  return res.status(404).send({message:'Post is not found in Database', success:false  }   )
}

let disLikesArray =  []
let likesArray = []
 if (!post.disLikes){
  disLikesArray = []
 }else{
disLikesArray = JSON.parse(post?.disLikes)
 }

const index = disLikesArray?.indexOf(id);
if (index !== -1) {
  disLikesArray?.splice(index,1)
}else{
  disLikesArray?.push(id);
}


const updatedDisLikes = JSON.stringify(disLikesArray)

const result = await updateDisLikesById(updatedDisLikes,pid)


if (!post?.likes) {
  likesArray = []
}else{
  likesArray = JSON.parse(post?.likes) 
}

const likesIndex = likesArray?.indexOf(id)

if (likesIndex !== -1){
  likesArray.splice(likesIndex,1)

const updatedLikes = JSON.stringify(likesArray)

 await updateLikesById(updatedLikes,pid)

}






if (result?.affectedRows > 0 ) {
return res.status(200).send({ 
      message: 'Post disLikes updated',
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


export const getAllLikesController = async (req,res) => {
  try {
    
const {uid} = req.params;


const rows = await getAllLikes(uid)

if (Array?.isArray(rows)) {
   return res.status(200).send({  success: true  , rows});

}

} catch (error) {
    console.log(error);
     return res.status(505).send({ message: 'Server error', success: false });
  }
}




