import { db } from "../config/db.js";
import { ensureDirExists } from "../helper/userhelper.js";
import { checkExistingLastChat, deleteMsgModal, findMsgByIdAndjoinReciv, findMsgByIdAndjoinSender, getArrWhereUserIsReciever, getArrWhereUserIsSender, getMessages, getUnSeenMSg, saveMsg, updateUnseenMSg,   } from "../model/messageModel.js";
import { getUserById } from "../model/userModel.js";



export const  getUserForSideBarController = async (req,res) => {
    try {
        

const {uid} = req.params;

const arr1 = await getArrWhereUserIsSender(uid)
const arr2 = await getArrWhereUserIsReciever(uid)
  

const finalArr = arr1?.concat(arr2)






return res.status(202).send({success:true , finalArr });


  
  
    } catch (error) {
        console.log(error);
   res.status(500).json({ error: 'Internal Server Error',success:false });
         
    }
}

 


export const sendMsgController = async (req, res) => {
  try {
    const { sid, rid } = req.params;
    const { text } = req.fields;
    const { img } = req.files;

    const msgPhotoPaths = [];

    if (img) {
      ensureDirExists('../client/public/uploads/posts');
      const photosArray = Array.isArray(img) ? img : [img];

      for (let photo of photosArray) {
        const filename = `${Date.now()}_${photo.name}`;
        const savePath = `../client/public/uploads/posts/${filename}`;
        const publicPath = `/uploads/posts/${filename}`; // relative for client

        if (fs.existsSync(photo.path)) {
          fs.renameSync(photo.path, savePath);
          msgPhotoPaths.push(publicPath);
        }
      }
    }

    const post = msgPhotoPaths.length > 0 ? JSON.stringify(msgPhotoPaths) : null;

    const saveMsginDB = await saveMsg(sid, rid, text, post);

    if (saveMsginDB?.insertId) {
      const newMsg = {
        sender_id: sid,
        receiverId: rid,
        text: text,
        id: saveMsginDB.insertId,
        created_at: new Date().toISOString(),
        imgURL: msgPhotoPaths, 
    };


      return res.status(202).send({
        success: true,
        messageId: newMsg.id,
        createdAt: newMsg.created_at,
      });
    }

    return res.status(504).send({ success: false });
  } catch (error) {
    console.error("Message Controller Error:", error);
    res.status(500).json({ error: 'Internal Server Error', success: false });
  }
};



export const getUnseenMsgMsgController = async (req,res) => {
    try {
        

const {uid} = req.params;





const rows = await getUnSeenMSg(uid)



return res.status(202).send({success:true , rows })




    } catch (error) {
        console.log(error);
        res.status(500).send({message:'Server side error', success:false })
    }
}
 
 

export const updateSeenMsgController = async (req,res) => {
  try {
    
const {uid1,uid2} = req.params;



const updateUnseenMSgs = await updateUnseenMSg(uid1,uid2)

if (updateUnseenMSgs?.success) {


  return res.status(202).send({success:true })
}
  return res.status(404).send({success:false, message:'not Updated' })

  } catch (error) {
    console.log(error);
        res.status(500).send({message:'Server side error', success:false,error })
    
  }
}




export const createChatController = async (req,res) => {
  try {
    const {senderId , recieverId} = req.params;




const result = await  checkExistingLastChat(senderId ,recieverId) 



if (result?.length > 0) {


if (result[0]?.sender_id == senderId) {
const resultSecond =  await findMsgByIdAndjoinReciv(result[0]?.msg_id)


return res.status(202).send({code:'chat already created' , success:true ,resultSecond   })

}

const resultSecond =  await findMsgByIdAndjoinSender(result[0]?.msg_id)

return res.status(202).send({code:'chat already created' , success:true ,resultSecond  })



}




const getUser = await getUserById(recieverId) 




    if (getUser) {
      return res.status(202).send({success:true,user:{ id:getUser?.id ,name:getUser?.name ,  profile_photo:getUser?.profile_photo,role:getUser?.role  , sender_id:senderId ,reciever_id:getUser?.id  }  })
    }


      return res.status(404).send({ success:false  })
    

  } catch (error) {
    console.log(error);
     res.status(500).send({message:'Server side error', success:false,error })
    
  }
}






export const deleteMSgController = async (req,res) => {
  try {
    
const {mid} = req.params;



const msgDeleted = await deleteMsgModal(mid)

if (msgDeleted) {

  return res.status(202).send({success:true })

}
  return res.status(404).send({success:false, message:'not deleted' })

  } catch (error) {
    console.log(error);
        res.status(500).send({message:'Server side error', success:false,error })
    
  }
}



export const getLastMsgCOntoller = async (req, res) => {
  try {
    const {uid1,uid2} = req.params;



const userToChatId = uid1

const uid = uid2


    const lastMSg = await getMessages(userToChatId,uid)

const rows = lastMSg[lastMSg?.length - 1]

return res.status(202).send({success:true , rows  })

  } catch (error) {
    console.log(error);
        res.status(500).send({message:'Server side error', success:false,error })
    
  }
}