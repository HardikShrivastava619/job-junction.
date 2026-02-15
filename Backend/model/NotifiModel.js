import { db } from "../config/db.js";

export const addNotifcModel = async ({sid,rid,eid, type ,text}) => {
    try {
        const [res] = await db.execute(`
INSERT INTO notifications 
(sender_id,receiver_id,entity_id,type,text) VALUES (?,?,?,?,?)            
` , [sid,rid,eid,type,text] );


return res || null








} catch (error) {
        console.log(error);
        
    }
}



export const getNotifcation = async (nid) => {
    try {
        const [rows] = await db.execute(`
SELECT notifications.*, users.name ,  users.profile_photo 
  FROM notifications  JOIN 
users ON notifications.sender_id = users.id
WHERE notf_id = ?
` , [nid] )


return rows || null

} catch (error) {
        console.log(error);
        
    }
}


export const getUserNotifByIdModel = async (uid) => {
    try {
        const [rows] = await db.execute(`
            SELECT notifications.*, users.name ,  users.profile_photo  FROM notifications JOIN  users ON notifications.sender_id = users.id  WHERE receiver_id = ?` , [uid] )

return rows || null


    } catch (error) {
        console.log(error);
        
    }
}



export const deleteNotfModel = async (nid) => {
    try {
        const [res] =  await db.execute(`DELETE FROM notifications WHERE notf_id = ?`, [nid])

return res || null;

    } catch (error) {
        console.log(error);
        
    }
}


export const   addSeenNotfModel =  async (uid) => {
    try {
        const [res] =  await db.execute(`UPDATE notifications  set is_read = true  WHERE receiver_id = ?`, [uid])

 return res.affectedRows > 0 ? res : null;
    } catch (error) {
        console.log(error);
        
    }
}



export const   addSelcSeenNotfModel =  async (nid) => {
    try {
        const [res] =  await db.execute(`UPDATE notifications  set is_read = true  WHERE notf_id = ?`, [nid])

 return res;
    } catch (error) {
        console.log(error);
        
    }
}