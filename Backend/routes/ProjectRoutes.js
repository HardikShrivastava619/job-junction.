
import express from 'express';
import formidable from 'express-formidable';
import { deleteProjectController, disLikeProjectController, getAllProjectLikesController, getProjectController, likeProjectController, saveProjectController } from '../controller/ProjectController.js';

const router = express.Router();

router.post('/saveProject/:user_id', formidable({ multiples: true }),saveProjectController)

router.get('/getProjects/:user_id',getProjectController)

 router.delete('/deleteProject/:project_id', deleteProjectController)

router.put('/likeProject/:pid/:id',  likeProjectController )

router.put('/disLikeProject/:pid/:id',  disLikeProjectController )

router.get('/getAllProjLikes/:uid',  getAllProjectLikesController )



export default router;    