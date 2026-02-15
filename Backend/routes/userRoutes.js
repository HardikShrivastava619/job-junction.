import express from "express";
import { completeProfileController, get_ourProfileController, getSearchedUserController, getUserNameByUidController, getViewersController, loginController, registerEmailController, sendOtpaAgainController, updateViewersController, verifyOTPController } from "../controller/userController.js";
import formidable from 'express-formidable';


const router = express.Router()

 
  
router.post('/register' , registerEmailController)
 
router.put('/optAgain/:email' , sendOtpaAgainController)

router.put('/verifyOTP/:email' , verifyOTPController)

router.put('/complete_profile/:email' , formidable({multiples:true})  , completeProfileController)

router.post('/login' , loginController)

router.get('/get_ourProfile/:uid' , get_ourProfileController)

router.get('/getUserName/:uid' , getUserNameByUidController   )

router.get('/getSearchedUser/:key' , getSearchedUserController   )

router.put('/updateViewers/:uid/:vid' , updateViewersController   )

router.get('/getViewers/:uid/' , getViewersController   )

export default router