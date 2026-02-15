import {db} from '../config/db.js'

export const saveProject = async (user_id, description,post,commOn,projectUrl, tech_used, startDate, endDate  ) => {
    try {




        const [result] = await db.execute('INSERT INTO projects (user_id, description,photo_uploads,commentsOn,projectUrl, tech_used, startDate, endDate) VALUE(?,?,?,?,?,?,?,?)' ,[user_id, description,post,commOn,projectUrl, tech_used, startDate, endDate]
)

return result;
    } catch (error) {
        console.log(error);
        
    }
}  


export const findProjectsByUserId = async (user_id) => {
    try {
        const [rows] = await db.execute('SELECT * FROM projects WHERE user_id = ?', [user_id] )
return rows;

    } catch (error) {
        console.log(error);
        
    }
}

export const deleteProject = async(project_id)=>{
    try {

        const [result] = await db.execute('DELETE FROM projects WHERE id=? ', [project_id] );


        return result;

    } catch (error) {
        console.log(error);
        
    }
}



export const findProjByProjId = async (pid) => {
    try {
     const [rows] =  await  db.execute('SELECT * FROM projects WHERE id =? ' , [pid] )



return rows[0];        

    } catch (error) {
        console.log(error);
    }
        
}


export const updateLikesById = async (updatedLikes,pid) => {
    try {
        
const [result] = await db.execute('UPDATE projects SET likes = ? WHERE id = ?',
      [updatedLikes, pid]
    )


return result


    } catch (error) {
        console.log(error);
        
    }
}





export const updateDisLikesById = async (updatedDisLikes,pid) => {
    try {
        
const [result] = await db.execute('UPDATE projects SET disLikes = ? WHERE id = ?',
      [updatedDisLikes,pid]
    )


return result


    } catch (error) {
        console.log(error);
        
    }
}








export const getAllProjectLikes = async (uid) => {
    try {
        
const [rows] = await db.execute('SELECT likes FROM  projects  WHERE user_id = ?'  ,
      [uid]
    )


return rows || null


    } catch (error) {
        console.log(error);
        
    }
}