import express from 'express';
import { addEducController, deleteEducDetController, getEducDetController } from '../controller/educationDetControllers.js';
import formidable from 'express-formidable'


const router = express.Router();


router.post('/addEducDet/:user_id', formidable() ,addEducController )

router.get('/getEducDet/:user_id' ,getEducDetController )

router.delete('/deleteEducDet/:id' ,deleteEducDetController )

export default router;