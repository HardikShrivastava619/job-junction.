import express from 'express';
import { applyJobcontroller, cancelAppliccontroller, createJobcontroller, deleteJobcontroller, dontApplycontroller, getAllApplicantscontroller, getALLJobcontroller, getApplicationDetailscontroller, getJobDetailcontroller,  getMyApplicationscontroller, getSelfPostedJobcontroller, setTemStopcontroller, updateApplicationStatuscontroller } from '../controller/JobController.js';

const router = express.Router();


router.post('/createJob/:cid' ,  createJobcontroller )

router.get('/getOurJobs/:cid' ,  getSelfPostedJobcontroller )

router.get('/getAllJobs' ,  getALLJobcontroller )

router.get('/getJobDetail/:jid' ,  getJobDetailcontroller )

router.put('/setTempStopHiring/:jid' ,  setTemStopcontroller )

router.delete('/deleteJob/:jid',deleteJobcontroller)

router.post('/applyJob',applyJobcontroller)


router.get('/getApplicationDetails/:uid/:jid', getApplicationDetailscontroller)

router.delete('/dontApply/:uid/:jid',dontApplycontroller)

router.get('/getAllApplicants/:jid', getAllApplicantscontroller)

router.get('/getMyApplications/:uid', getMyApplicationscontroller)

router.put('/updateApplicationStatus', updateApplicationStatuscontroller)

router.delete('/cancelApplication/:aid',cancelAppliccontroller)


export default router