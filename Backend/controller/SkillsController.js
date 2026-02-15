import { deleteSkillByskillsId, findSkillByUserId, saveSkillsQuery } from "../model/skillModal.js";

export const saveSkillsController = async (req,res) => {
    try {
        const {skillText , ratings} = req.body;
        const {user_id} = req.params;



if (!skillText || !ratings  ||!user_id) {
    return res.status(404).send({success:false, message:'some fields are missing'})
}

const savedDetails = await saveSkillsQuery(skillText , ratings,user_id);



 

if (savedDetails?.insertId) {
    
    return res.status(202).send({message:'skill saved succesfully' })
}





        
    } catch (error) {
        console.log(error);
            return res.status(504).send({message:'error in server' , error})
    }
}


export const getSkillsController = async (req,res) => {
    try {

        const {user_id} = req.params

const skills =await findSkillByUserId(user_id);

if (skills) {
    return res.status(202).send({message:'skill fetched  succesfully' , skills })
}

    } catch (error) {
        console.log(error);
            return res.status(504).send({message:'error in server' , error})
        
    }
}





export const deleteSkillsController = async (req,res) => {
    try {

        const {skills_id} = req.params

const result =await deleteSkillByskillsId(skills_id);

if (result?.affectedRows > 0) {
  return res.status(202).send({result,success:true})
}
 return res.status(404).send({result, message:'some error in deleting',success:false})



    } catch (error) {
        console.log(error);
            return res.status(504).send({message:'error in server' , error})
        
    }
}