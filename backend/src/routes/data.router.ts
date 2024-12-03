import { Router } from 'express';
// const { createEmbeddings  } = require('../controllers/data.controller.js');
const {handleInitialization} = require('../controllers/data.controller.js')
// Destructure both functions
import multer from 'multer';
const upload = multer();



const dataRouter = Router();

// dataRouter.post('/s3Data', s3Controller);
// dataRouter.post('/createEmbeddings', upload.single('file'), createEmbeddings);
dataRouter.post('/initializebot' , handleInitialization)



export default dataRouter;
