import {db} from '../config/db.js'



export const savePost = async (user_id, description,post,commOn) => {
    try {




        const [result] = await db.execute('INSERT INTO posts (user_id, description,photo_uploads,commentsOn) VALUE(?,?,?,?)' ,[user_id, description,post,commOn]
)

return result;
    } catch (error) {
        console.log(error);
        
    }
}  


export const findPostsByUserId = async (user_id) => {
    try {
        const [rows] = await db.execute('SELECT * FROM posts WHERE user_id = ?', [user_id] )
return rows;

    } catch (error) {
        console.log(error);
        
    }
}

export const deletePost = async(post_id)=>{
    try {

        const [result] = await db.execute('DELETE FROM posts WHERE id=? ', [post_id] );


        return result;

    } catch (error) {
        console.log(error);
        
    }
}

export const getAllPosts = async () => {
  try {
 const [result] = await db.execute(`

    SELECT posts.*, users.name, users.profile_photo FROM posts JOIN users ON posts.user_id = users.id`

 );

    return result;
  } catch (error) {
    console.log(error);
  }
};




export const findPostjByPostId = async (pid) => {
    try {
     const [rows] =  await  db.execute('SELECT * FROM posts WHERE id =? ' , [pid] )



return rows[0];        

    } catch (error) {
        console.log(error);
    }
        
}


export const updateLikesById = async (updatedLikes,pid) => {
    try {
        
const [result] = await db.execute('UPDATE posts SET likes = ? WHERE id = ?',
      [updatedLikes, pid]
    )


return result


    } catch (error) {
        console.log(error);
        
    }
}





export const updateDisLikesById = async (updatedDisLikes,pid) => {
    try {
        
const [result] = await db.execute('UPDATE posts SET disLikes = ? WHERE id = ?',
      [updatedDisLikes,pid]
    )


return result


    } catch (error) {
        console.log(error);
        
    }
}




export const getAllLikes = async (uid) => {
    try {
        
const [rows] = await db.execute('SELECT likes FROM  posts  WHERE user_id = ?'  ,
      [uid]
    )


return rows || null


    } catch (error) {
        console.log(error);
        
    }
}





