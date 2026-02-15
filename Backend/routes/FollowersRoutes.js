import express from 'express'
import { followController, getAllFollowersController, getAllFollowingsController, getCheckFollowersController, unFollowController } from '../controller/FollowersController.js';


const router = express.Router();

router.post('/follow', followController  )

router.get('/checkFollowsOrnot/:followers_id/:followed_id', getCheckFollowersController  )

router.get('/getAllFollowers/:followed_id', getAllFollowersController  )

router.delete('/unFollow/:fmId', unFollowController  )

router.get('/getAllFollowings/:followers_id', getAllFollowingsController  )



export default router;