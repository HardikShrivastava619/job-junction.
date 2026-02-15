import express from 'express';
import formidable from 'express-formidable';
import { deletePostController, disLikePostController,  getAllLikesController, getAllPostsController, getPostController, likePostController, savePostController } from '../controller/postController.js';

const router = express.Router();

router.post('/savePost/:user_id', formidable({ multiples: true }) ,savePostController)

router.get('/getPost/:user_id',getPostController)

router.delete('/deletePost/:post_id', deletePostController)

router.get('/getAllPosts', getAllPostsController)

router.put('/likePost/:pid/:id',  likePostController )

router.put('/disLikePost/:pid/:id',  disLikePostController )

router.get('/getAllLikes/:uid',  getAllLikesController )




export default router;    