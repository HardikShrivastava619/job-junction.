import { db } from "../config/db.js";

export const getMessages = async (userToChatId,uid) => {
    try {






  const query = `
      SELECT *FROM chat
      WHERE (sender_id = ? AND reciever_id = ?)
         OR (sender_id = ? AND reciever_id = ?)
    
         `;

    const values = [uid, userToChatId, userToChatId, uid];

    const [rows] = await db.execute(query, values);

return rows  || null

    } catch (error) {
        console.log(error);
        
    }
};







export const checkExistingLastChat = async (senderId , recieverId) => {
    try {

 const query = `
  SELECT * from chat   WHERE (chat.sender_id = ? AND chat.reciever_id = ?)
     OR (chat.sender_id = ? AND chat.reciever_id = ?) 
     ORDER BY chat.created_at DESC 
     LIMIT 1

`;


    const values = [senderId , recieverId,  recieverId, senderId];

    const [rows] = await db.execute(query, values);



return rows  || null

    } catch (error) {
        console.log(error);
        
    }
};





export  const saveMsg =  async (sid,rid,text,post) => {
    try {
        const [result] = await db.execute('INSERT INTO chat (sender_id,reciever_id,imgURL,text) VALUES (?,?,?,?) ' , [sid,rid,post,text]  )

        console.log(result);
return result;



    } catch (error) {
        console.log(error);
        
    }
}



export const getArrWhereUserIsReciever = async (uid) => {
    try {
        
const [rows] = await db.execute('SELECT chat.*, users.profile_photo , users.name, users.id , users.role  FROM chat   JOIN users ON chat.sender_id = users.id WHERE reciever_id = ?   ORDER BY chat.created_at DESC  ' ,  [uid] ) 


return rows || []


    } catch (error) {
        console.log(error);
        
    }
}


export const getArrWhereUserIsSender = async (uid) => {
    try {
        
const [rows] = await db.execute(
  'SELECT chat.*, users.profile_photo  ,users.name, users.id ,users.role FROM chat JOIN users ON chat.reciever_id = users.id WHERE sender_id = ? ORDER BY chat.created_at DESC',
  [uid]
);


return rows || []


    } catch (error) {
        console.log(error);
        
    }
}

export const updateUnseenMSg = async (uid1, uid2) => {
  try {
    const [result] = await db.execute(
      `UPDATE chat 
       SET is_seen = TRUE  
       WHERE (sender_id = ? AND reciever_id = ?) 
         AND is_seen = FALSE`,
      [uid2, uid1]
    );


    return { result, success: true };
  } catch (error) {
    console.log(error);
    return { success: false, error };
  }
};
 



export const getUnSeenMSg = async (uid) => {
    try {
        const [rows] = await db.execute(`SELECT chat.*, users.role  FROM chat JOIN users ON chat.sender_id = users.id WHERE reciever_id = ? AND is_seen = FALSE ` , [uid]   ) 
 return rows || []
 
    } catch (error) {
        console.log(error);
        
    }
}


export const findMsgByIdAndjoinReciv = async (mid) => {
    try {



        const [result] = await db.execute(`SELECT chat.*, users.profile_photo  ,users.name, users.id ,users.role FROM chat JOIN users ON chat.reciever_id = users.id WHERE chat.msg_id = ? `,[mid]  )

return result || null 
    } catch (error) {
        console.log(error);
        
    }
}






export const findMsgByIdAndjoinSender = async (mid) => {
    try {
        const [result] = await db.execute(`SELECT chat.*, users.profile_photo  ,users.name, users.id ,users.role FROM chat JOIN users ON chat.sender_id = users.id WHERE chat.msg_id = ? `,[mid]  )

return result || null 
    } catch (error) {
        console.log(error);
        
    }
}




export const deleteMsgModal = async (mid) => {
    try {
        const [result] = await db.execute('DELETE FROM chat WHERE msg_id=? ' , [mid]);
return result || null 
        


    } catch (error) {
        console.log(error);
        
    }
}

