import fs from 'fs';
import path from "path";
import { addEducDet, deleteEducDet, findEducDetbyEducDetID, findEducDetbyID } from '../model/educationModal.js';


const toNullIfUndefined = (val) => (typeof val === 'undefined' ? null : val);



const ensureDirExists = (dirPath) => {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
}; 


export const addEducController = async (req,res) => {
try {
    
const {instituteName,degree,startDate,endDate} = req.fields;

const {certificate} = req.files;



const {user_id} = req.params;


    let certificate_photoPath = null;

    if (certificate) {
      ensureDirExists('../client/public/uploads/certificates');

      const fileName = `${Date.now()}_${certificate.name}`;
      const uploadPath = path.join('../client/public/uploads/certificates', fileName);

      if (fs.existsSync(certificate.path)) {
        fs.renameSync(certificate.path, uploadPath);
        certificate_photoPath= uploadPath;
      } else {
        return res.status(400).json({
          success: false,
          message: `certificate photo file ${certificate.name} is missing.`,
        });
      }
    }




const data = {
  instituteName:toNullIfUndefined(instituteName) 
   ,degree:toNullIfUndefined(degree)
   ,startDate:toNullIfUndefined(startDate)
,endDate:toNullIfUndefined(endDate)
,certificate:toNullIfUndefined(certificate_photoPath)
,user_id:toNullIfUndefined(user_id)
}



const result = await addEducDet(data) 



if (result?.affectedRows > 0) {
return res.status(202).send({message:"Education's details saved succesfully", success:true,result })    
}
return res.status(504).send({message:"some Error ", success:false })    


} catch (error) {
    console.log(error);
    return res.status(504).send({message:'server err', success:false })
}}










export const getEducDetController = async (req,res) => {
  try {
    

const {user_id} = req.params;

const educDet = await findEducDetbyID(user_id); 


return res.status(202).send({message:'details fetched successfully' , success:true , educDet} )


  } catch (error) {
    console.log(error);
    return res.status(504).send({message:'server err', success:false })
    
  }
}


export const deleteEducDetController = async (req,res) => {
  try {
    
const {id} = req.params;



const educDet = await findEducDetbyEducDetID(id);

  if (educDet?.certificate) {
    
  


await fs.unlink(educDet?.certificate, (err) => {
  if (err) {
    console.error('Error deleting file:', err);
  } else {
    console.log('File deleted successfully!');
  }
});
  }

const result =await deleteEducDet(id);




if (result?.affectedRows > 0) {
  return res.status(202).send({result,success:true})
}
 return res.status(404).send({result, message:'some error in deleting',success:false})



  } catch (error) {
    console.log(error);
    
  }
} 




