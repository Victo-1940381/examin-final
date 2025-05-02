// À ajuster selon la structure
import express from 'express';
import { listeTache } from '../controller/tache.controller.js';

const router = express.Router();

router.get('/ListeTache/:id', listeTache);

export default router;