import express from 'express'
import { addNotificationController, addSeenNotificationController, addSeenSelcNotifController, deleteNotificationController, getNotificationController } from '../controller/NotoficationControoler.js';

const router = express.Router();


router.post('/addNotif' , addNotificationController )

router.get('/getNotif/:uid' , getNotificationController )

router.delete('/deleteNotif/:nid' , deleteNotificationController )

router.put('/addSeenNotif/:uid' , addSeenNotificationController )

router.put('/addSeenSelcNotif/:nid' , addSeenSelcNotifController )

export default router;