import express, { response } from 'express';
import tacheRouter from './src/routes/tache.routes.js';
import morgan  from 'morgan';
import fs from 'fs';
import path from 'path';
import { error } from 'console';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
const swaggerDocument = JSON.parse(fs.readFileSync('./src/config/Documentation.json', 'utf8'));

const swaggerOptions = {
    customCss: '.swagger-ui .topbar { display: none }',
    customSiteTitle: "Examin Final"
};
const app = express();
app.use(cors());
app.use(express.json());
app.use(morgan("dev", {
    skip: function (req, res ) { return res.statusCode !=500},
    stream: fs.createWriteStream('./error.log', { flags: 'a'})
}));
app.use(tacheRouter);
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument, swaggerOptions));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`serveur démarré sur le port ${PORT}`);
});