
import { addFollower, deleteFollower, findAllFollowersByFollowedId, findAllFollowingsByFollowerId, findFillowInTable } from "../model/followersModal.js";

export const followController = async (req,res) => {
    try {
      
const { followers_id,followed_id } = req.body;



const followOrNOt = await findFillowInTable(followers_id,followed_id)


if (followOrNOt?.id) {
const unFollow = await deleteFollower(followOrNOt?.id)
 
if (unFollow?.affectedRows > 0) {
    return res.status(202).send({code:'Unfollowd_succesfully',success:true })
} 

}



const follow = await addFollower(followers_id,followed_id);



if (follow?.insertId) {
    return res.status(202).send({code:'Follwed_successfully', success:true   })
    }






    } catch (error) {
        console.log(error);
    return res.status(505).send({message:'server error' , success:false   })
        
    }
}




export const getAllFollowingsController = async (req,res) => {
    try {
      
const {followers_id} = req.params;



const result = await findAllFollowingsByFollowerId(followers_id)


 
if (result?.length >= 0 ) {
    return res.status(200).send({result, success:true})
    
}else{
    return res.status(400).send({ success:false, result }) 
}

} catch (error) {
        console.log(error);
    return res.status(505).send({message:'server error' , success:false   })
        
    }
}






export const getAllFollowersController = async (req,res) => {
    try {
      
const {followed_id} = req.params;

console.log('followed_id',followed_id);


const result = await findAllFollowersByFollowedId(followed_id)


 
if (result?.length >= 0 ) {
    return res.status(200).send({result, success:true})
    
}else{
    return res.status(400).send({ success:false, result }) 
}

} catch (error) {
        console.log(error);
    return res.status(505).send({message:'server error' , success:false   })
        
    }
}


export const getCheckFollowersController = async (req,res) => {
    try {
      
const { followers_id,followed_id } = req.params;



const result = await findFillowInTable(followers_id,followed_id)




    return res.status(200).send({result, success:true})






    } catch (error) {
        console.log(error);
    return res.status(505).send({message:'server error' , success:false   })
        
    }
}



export const unFollowController = async (req,res) => {
    try {
        const {fmId} = req.params;


const result = await deleteFollower(fmId)

res.status(202).send({message:'user infollowed succesfully' , success:true})


    } catch (error) {
        console.log(error);
            return res.status(505).send({message:'server error' , success:false   })

    }
}