import express from 'express';
import {  createChatController, deleteMSgController,  getLastMsgCOntoller,  getUnseenMsgMsgController,  getUserForSideBarController, sendMsgController, updateSeenMsgController } from '../controller/MessageController.js';
import formidable from 'express-formidable'


const router = express.Router();



router.get('/chatusers/:uid',  getUserForSideBarController )

router.post('/sendMsg/:sid/:rid', formidable()  , sendMsgController )

router.get('/getUnseenMsg/:uid' ,  getUnseenMsgMsgController )

router.put('/updateSeenMsg/:uid1/:uid2' , updateSeenMsgController    )

router.post('/createChat/:senderId/:recieverId' , createChatController    )

router.delete('/deleteMsg/:mid'  , deleteMSgController  )  

router.get('/lastMsg/:uid1/:uid2' , getLastMsgCOntoller)


export default router;  