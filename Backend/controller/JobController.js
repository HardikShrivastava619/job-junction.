import { applyJobModel, cancelApplicModel, createJobModal, deleteJobModel, deleteMyApplicationModel, getAllApplicantsModel, getAllJobModel, getApplicationDetailsModal, getJobModel,  getMyApplicationModel, getSelfPostedJobModel, setTempStopJobModel, updateApplicationStatusModel } from "../model/jobModal.js";

export const createJobcontroller = async (req,res) => {
    try {
        
        const {cid} = req.params;

        const {title,jobtype,annual_Salary,remote,reqDegree,location,description,reqskills,institute_Logo,institute_Name}=req.body


const result = await createJobModal({title,jobtype,annual_Salary,remote,reqDegree,location,description,reqskills,institute_Logo,institute_Name,cid})



if (result?.insertId) {
    return res.status(202).send({success:true } )
}

    return res.status(404).send({success:false } )





    } catch (error) {
        console.log(error);
             return res.status(504).send({message:'error in server' , error})

    }
}




export const getSelfPostedJobcontroller = async (req,res) => {
    try {
        const {cid} = req.params;

    const result = await getSelfPostedJobModel(cid)

if (result?.length > 0) {
    return res.status(200).send({success:true , result})
}
return res.status(404).send({success:false})
    
        

    } catch (error) {
        console.log(error);
             return res.status(504).send({message:'error in server' , error})
      
    }
}



export const getJobDetailcontroller = async (req,res) => {
    try {

        const {jid} = req.params

        
        const result = await getJobModel(jid)

if (result?.length > 0) {


    return res.status(200).send({success:true , result})
}
return res.status(404).send({success:false})
    



    } catch (error) {
        console.log(error);
           return res.status(504).send({message:'error in server' , error})
        
    }
}




export const setTemStopcontroller = async (req,res) => {
    try {
               const {jid} = req.params

        
        const result = await setTempStopJobModel(jid)

if (result?.affectedRows > 0 ) {
    return res.status(200).send({success:true , result})
    
}

return res.status(404).send({success:false})
    



    } catch (error) {
      console.log(error);
           return res.status(504).send({message:'error in server' , error})
        
        
    }
}





export const deleteJobcontroller = async (req,res) => {
    try {
               const {jid} = req.params;

               
        
        const result = await deleteJobModel(jid)


if (result?.affectedRows > 0 ) {

    return res.status(200).send({success:true })

} 

return res.status(404).send({success:false})
    



    } catch (error) {
      console.log(error);
           return res.status(504).send({message:'error in server' , error})
        
        
    }
}





export const applyJobcontroller = async (req,res) => {
    try {

const {uid,jid} = req.body;

               
        
const result = await applyJobModel({uid,jid})


if (result?.insertId ) {

    return res.status(200).send({success:true })

} 

return res.status(404).send({success:false})
    



    } catch (error) {
      console.log(error);
           return res.status(504).send({message:'error in server' , error})
        
        
    }
}




export const getALLJobcontroller = async (req,res) => {
    try {

    const result = await getAllJobModel()

if (result?.length > 0) {
    return res.status(200).send({success:true , result})
}
return res.status(404).send({success:false})
    
        

    } catch (error) {
        console.log(error);
             return res.status(504).send({message:'error in server' , error})
      
    }
}











export const getApplicationDetailscontroller = async (req,res) => {
    try {
        const {uid,jid} = req.params;


const rows = await getApplicationDetailsModal({uid,jid})

if (Array?.isArray(rows)) {
    return res.status(202).send({success:true , rows})
}

return res.status(404).send({success:false})

    } catch (error) {
        console.log(error);
        
    }
}








export const dontApplycontroller  = async (req,res) => {
    try {
               const {uid,jid} = req.params;

               
        
        const result = await deleteMyApplicationModel({uid,jid})


if (result?.affectedRows > 0 ) {

    return res.status(200).send({success:true })

} 

 return res.status(404).send({success:false})
    



    } catch (error) {
      console.log(error);
           return res.status(504).send({message:'error in server' , error})
        
        
    }
}



export const getAllApplicantscontroller = async (req,res) => {
    try {
        const {jid} = req.params;


const rows = await getAllApplicantsModel(jid)

if (Array.isArray(rows)) {

    return res.status(200).send({success:true,rows })

} 

 return res.status(404).send({success:false})
    



    } catch (error) {
        console.log(error);
       return res.status(504).send({message:'error in server' , error})
        
        
       
    }
}



export const getMyApplicationscontroller = async (req,res) => {
    try {
        
const {uid} = req.params;


const rows = await getMyApplicationModel(uid)
if (Array.isArray(rows)) {

    return res.status(200).send({success:true,rows })

} 

    return res.status(400).send({success:false })


    } catch (error) {
        console.log(error);
       return res.status(504).send({message:'error in server' , error})
        
    }
}



export const  updateApplicationStatuscontroller = async (req,res) => {
    try {
const {status,aid} = req.body;
        

const result = await updateApplicationStatusModel({aid,status})


if (result?.affectedRows > 0) {
    return res.status(202).send({success:true})
}

return res.status(404).send({success:false})


    } catch (error) {
        console.log(error);
               return res.status(504).send({message:'error in server' , error})

    }
}


export const cancelAppliccontroller = async (req,res) => {
    try {
const {aid} = req.params;


const result = await cancelApplicModel(aid)
        

if (result?.affectedRows > 0) {
    return res.status(202).send({success:true})
}

return res.status(404).send({success:false})

    } catch (error) {
     console.log(error);   
               return res.status(504).send({message:'error in server' , error})

    }
    
}