import { addNotifcModel, addSeenNotfModel, addSelcSeenNotfModel, deleteNotfModel, getNotifcation, getUserNotifByIdModel } from "../model/NotifiModel.js";

export const addNotificationController = async (req,res) => {
    try {
        
        const {sid,rid,eid,type,action}  = req.body;



let text = null
if (type == 'like') {
if (action == 'liking') {
    text = `❣️  user liked your post `
}if (action == 'unLike') {
    text = `👎🏻 user disLiked your post` 
}

}else if (type == 'comment') {
    text = `💬 user commented on your post`
}else if (type == 'follow') {

if (action == 'Unfollowd_succesfully') {
    text = `🙁 user has unfollowed  you `
}

if (action == 'Follwed_successfully') {
    text = `🤝 user  has started following you `  
}

}else if (type == 'views') {
    text = `👀 user has checked your profile time`  
}


const result = await addNotifcModel({sid,rid,eid,type,text})

if (result?.insertId ) {
     
const newNotifc =   await getNotifcation(result?.insertId) 

return res.status(202).send({success:true , newNotifc })
        
}
return  res.status(404).send({success:false})
} catch (error) {
        console.log(error);
        return res.status(505).send({success:false,error})
    }
}



export const getNotificationController = async (req,res) => {
    try {

        const {uid} = req.params;



        const rows = await getUserNotifByIdModel(uid);


if (Array?.isArray(rows)) {
       return      res.status(202).send({success:true , rows })
}
   return      res.status(404).send({success:false })

    } catch (error) {
        console.log(error);
        return res.status(505).send({success:false,error})
        
    }
}



export const deleteNotificationController = async (req,res) => {
    try {
        const {nid} = req.params;


const result = await deleteNotfModel(nid)


if (result?.affectedRows > 0) {
    return res.status(202).send({success:true})
}

    return res.status(404).send({success:false})



    } catch (error) {
        console.log(error);
        
    }
}


export const addSeenNotificationController = async (req,res) => {
    try {
        const {uid} = req.params;


const result = await addSeenNotfModel(uid)


if (result) {
    return res.status(202).send({success:true})
}

    return res.status(404).send({success:false})



    } catch (error) {
        console.log(error);
        
    }
}




export const addSeenSelcNotifController = async (req,res) => {
    try {
        const {nid} = req.params;

const result = await addSelcSeenNotfModel(nid)


if (result?.affectedRows > 0) {
    return res.status(202).send({success:true})
}

    return res.status(404).send({success:false})



    } catch (error) {
        console.log(error);
        
    }
}







