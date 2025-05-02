import express from 'express';
import tacheRouter from './src/routes/tache.routes.js';

const app = express();
app.use(express.json());

app.use(tacheRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`serveur démarré sur le port ${PORT}`);
});