// À ajuster selon la structure
import express from 'express';
import tacheControl  from '../controller/tache.controller.js';
import authentification from "../middlewares/authentification.middleware.js" 
const router = express.Router();

router.get('/ListeTache/:id',authentification ,tacheControl.listeTache);

export default router;