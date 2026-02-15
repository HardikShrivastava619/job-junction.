import { db } from "../config/db.js";

export const createCommModel = async ({uid,pid,text}) => {
    try {
        const [res] = await db.execute(`INSERT INTO comments (sender_id,post_id,text) VALUES (?,?,?) `,[uid,pid,text] )

return res || null;


    } catch (error) {
        console.log(error);
        
    }
}




export const getCommModel = async (pid) => {
    try {



        const [rows] = await db.execute(`SELECT comments.*,  users.name,users.profile_photo FROM comments JOIN users ON 
comments.sender_id = users.id WHERE post_id =?`,[pid])

return rows || null;   


    } catch (error) {
        console.log(error);
        
    }
}



export const deleteCommModel = async (cid) => {
    try {
        const [res] = await db.execute(`DELETE  FROM comments WHERE comment_id=?  ` , [cid])

return res || null

    } catch (error) {
        console.log(error);
        
    }
} 