import express, { response } from 'express';
import tacheRouter from './src/routes/tache.routes.js';
import morgan  from 'morgan';
import fs from 'fs';
import path from 'path';
import { error } from 'console';
const app = express();
app.use(express.json());
app.use(morgan("dev", {
    skip: function (req, res ) { return res.statusCode !=500},
    stream: fs.createWriteStream('./error.log', { flags: 'a'})
}));
app.use(tacheRouter);
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`serveur démarré sur le port ${PORT}`);
});