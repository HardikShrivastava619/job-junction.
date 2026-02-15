import { createCommModel, deleteCommModel, getCommModel } from "../model/CommentModel.js";

export const createCommentController = async (req,res) => {
    try {
        const {uid,pid} = req.params

const {text} = req.body




const result = await createCommModel({uid,pid,text}); 



if (result?. insertId) {
const rows= await getCommModel(pid); 
if (Array.isArray(rows)) {
    return res.status(202).send({success:true , rows})    
}

}

    return res.status(404).send({success:false})

    } catch (error) {
        console.log(error);
    return res.status(505).send({success:false})
        
    }
}





export const getCommentController = async (req,res) => {
    try {
        const {pid} = req.params





const rows= await getCommModel(pid); 



if (Array.isArray(rows)) {
    return res.status(202).send({success:true,rows})
}

    return res.status(404).send({success:false})

    } catch (error) {
        console.log(error);
    return res.status(505).send({success:false})
        
    }
}



export const deleteCommentController = async (req,res) => {
    try {
 
        
     const {cid,pid} = req.params

const result = await deleteCommModel(cid); 



if (result?.affectedRows) {
const rows = await getCommModel(pid)

    return res.status(202).send({success:true , rows })

}


    } catch (error) {
        console.log(error);
    return res.status(505).send({success:false})
        
    }
}