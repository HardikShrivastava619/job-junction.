import express from 'express';
import { createCommentController, deleteCommentController, getCommentController } from '../controller/CommentController.js';


const router = express.Router()


router.post('/createComment/:uid/:pid',  createCommentController  )

router.get('/getComment/:pid' , getCommentController)

router.delete('/deleteComment/:cid/:pid' , deleteCommentController)


export default router  