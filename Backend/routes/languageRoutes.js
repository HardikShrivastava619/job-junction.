import express from 'express';
import { deleteLangController, getLangController, saveLangController } from '../controller/languageControllers.js';

const router = express.Router();

router.post('/saveLang/:user_id', saveLangController )
router.get('/getLang/:user_id', getLangController)
router.delete('/deleteLang/:language_id', deleteLangController)


export default router;  