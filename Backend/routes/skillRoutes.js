import express from 'express';
import { deleteSkillsController, getSkillsController, saveSkillsController } from '../controller/SkillsController.js';

const router = express.Router();

router.post('/saveSkills/:user_id', saveSkillsController )
router.get('/getSkills/:user_id', getSkillsController)
router.delete('/deleteSkills/:skills_id', deleteSkillsController)


export default router;