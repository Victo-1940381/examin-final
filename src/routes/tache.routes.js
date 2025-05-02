// À ajuster selon la structure
import express from 'express';
import tacheControl  from '../controller/tache.controller.js';
import authentification from "../middlewares/authentification.middleware.js";
const router = express.Router();

router.get('/ListeTache/:id',authentification ,tacheControl.listeTache);
router.get('/DetailTache/:id',authentification,tacheControl.DetailTache);
router.post('/Tache',authentification,tacheControl.AjoutTache);
router.put('/Tache',authentification,tacheControl.ModifTache);
router.put('/Tache/:id',authentification,tacheControl.ModifStatusTache);
export default router;