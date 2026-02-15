import { deleteLangByLanguageId, findLangByUserId, saveLangQuery } from "../model/langModal.js";

export const saveLangController = async (req,res) => {
    try {
        const {langText , ratings} = req.body;
        const {user_id} = req.params;


if (!langText || !ratings  ||!user_id) {
    return res.status(404).send({success:false, message:'some fields are missing'})
}

const savedDetails = await saveLangQuery(langText,ratings,user_id);



 

if (savedDetails?.insertId) {
     
    return res.status(202).send({message:'skill saved succesfully' })
}

    return res.status(404).send({message:'somer error in registration' })




        
    } catch (error) {
        console.log(error);
            return res.status(504).send({message:'error in server' , error})
    }
}


export const getLangController = async (req,res) => {
    try {

        const {user_id} = req.params

const lang =await findLangByUserId(user_id);


if (lang) {
    return res.status(202).send({message:'skill fetched  succesfully' , lang })
}

    } catch (error) {
        console.log(error);
            return res.status(504).send({message:'error in server' , error})
        
    }
}





export const deleteLangController = async (req,res) => {
    try {

        const {language_id} = req.params

const result =await deleteLangByLanguageId(language_id);
console.log(result);

if (result?.affectedRows > 0) {
  return res.status(202).send({result,success:true})
}
 return res.status(404).send({result, message:'some error in deleting',success:false})



    } catch (error) {
        console.log(error);
            return res.status(504).send({message:'error in server' , error})
        
    }
}