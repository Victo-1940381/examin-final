import tacheModel from "../models/tache.model.js";
import url from 'url';
const listeTache = async (req,res) => {
    let afficher = false;

 if (req.query.tous){
  afficher = true; 
}
if(!req.params.id || parseInt(req.params.id) <= 0){
    res.status(400);
    res.send({
        message: "L'id de l'utilisateur est obligatoire et doit être supérieur à 0"
    });
    return;
}
if (afficher == false){
    await tacheModel.getListeTacheIncomplete(req.params.id)
    .then((tache) => {
        if(!tache[0]){
            res.status(404);
            res.send({
                message: `taches introuvable avec l'id utilisateur ${req.params.id}`
            });
            return;
        }
        res.status(200);
       res.send(tache);
    })
    .catch((erreur)=>{
        console.log('Erreur : ', erreur);
        res.status(500)
        res.send({
            message: "Erreur lors de la récupération des taches avec l'id utilisateur " + req.params.id
        });

    });
}
else{
    await tacheModel.getListeTache(req.params.id)
    .then((tache) => {
        if(!tache[0]){
            res.status(404);
            res.send({
                message: `taches introuvable avec l'id utilisateur ${req.params.id}`
            });
            return;
        }
        res.status(200);
        res.send(tache);
    })
    .catch((erreur)=>{
        console.log('Erreur : ', erreur);
        res.status(500)
        res.send({
            message: "Erreur lors de la récupération des taches avec l'id utilisateur " + req.params.id
        });

    });
}
};
const DetailTache = async (req,res) => {
   let tached;
    if(!req.params.id || parseInt(req.params.id) <= 0){
        res.status(400);
        res.send({
            message: "L'id de la tache est obligatoire et doit être supérieur à 0"
        });
        return;
    }
    await tacheModel.getDetailTache(req.params.id)
    .then((tache) => {
        if(!tache[0]){
            res.status(404);
            res.send({
                message: `tache introuvable avec l'id  ${req.params.id}`
            });
            return;
        }
        tached = tache;

    })
    .catch((erreur)=>{
        console.log('Erreur : ', erreur);
        res.status(500)
        res.send({
            message: "Erreur lors de la récupération des detail de la tache avec l'id  " + req.params.id
        });
    })
    await tacheModel.getListeSousTache(req.params.id)
    .then((soustache)=>{
        if(!soustache[0]){
            res.status(404);
            res.send({
                message: `sous-taches introuvable avec l'id tache  ${req.params.id}`
            });
            return;
        }
        res.status(200);
        res.send({"Tache": tached, "Sous-Tache": soustache});
    })
    .catch((erreur)=>{
        console.log('Erreur : ', erreur);
        res.status(500)
        res.send({
            message: "Erreur lors de la récupération des sous-tache de la tache avec l'id  " + req.params.id
        });
    });
};
export default {
listeTache,DetailTache
}