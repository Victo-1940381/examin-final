import { modif } from "../../../ex-06/src/controller/pokemon.controller.js";
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
    });
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
const AjoutTache = async (req,res) => {
    let erreur = false;
    let manquant = [];
    if(parseInt(req.body.utilisateur_id) <= 0){
        res.status(400);
        res.send({
            message: "L'id de l'utilisateur doit être supérieur à 0"
        });
        return;
    }
    if(!req.body.utilisateur_id ||!req.body.titre || !req.body.description ||!req.body.date_debut || !req.body.date_echeance || !req.body.complete) {
        erreur = true;
    }
    if(erreur){
    if(!req.body.utilisateur_id) {
       manquant.push("utilisateur_id");
    }
    if(!req.body.titre){
       manquant.push("Titre");
    }
    if(!req.body.description){
       manquant.push("description");
    }
    if(!req.body.date_debut){
       manquant.push("date_debut");
    }
    if(!req.body.date_echeance){
      manquant.push("date_echeance");
    }
    if(!req.body.complete){
        manquant.push("complete");
    }
    let messageerreur = {"erreur":"le format des donnée est invalide",
        "champs manquant": manquant
    };
    res.status(400);
    res.send(messageerreur);
    return;
    }
    else{
       await tacheModel.ajouttache(req.body.utilisateur_id,req.body.titre,req.body.description,req.body.date_debut,req.body.date_echeance,req.body.complete)
        .then((tache)=>{
            let tacheInfo = {
                "id":tache.insertId,
                "utilisateur_id":req.body.utilisateur_id,
                "titre":req.body.titre,
                "description":req.body.description,
                "date_debut":req.body.date_debut,
                "date_echeance":req.body.date_echeance,
                "complete":req.body.complete
            };
            let rep = {"message":`la tache [${req.body.titre}] a été ajouter avec succes`,
                    "tache":tacheInfo};
                    res.status(200);
                    res.send(rep);
        })
        .catch((erreur)=>{
            res.status(500);
            res.send({"erreur":`echec lors de la creation de la tache [${req.body.titre}]`});
        })
    }
};
const ModifTache = async (req,res) => {
    let erreur = false;
    let manquant = [];
    if(parseInt(req.body.utilisateur_id) <= 0){
        res.status(400);
        res.send({
            message: "L'id de l'utilisateur doit être supérieur à 0"
        });
        return;
    }
    if(parseInt(req.body.id) <= 0){
        res.status(400);
        res.send({
            message: "L'id de la tache doit être supérieur à 0"
        });
        return;
    }
    if(!req.body.utilisateur_id ||!req.body.titre || !req.body.description ||!req.body.date_debut || !req.body.date_echeance || !req.body.id) {
        erreur = true;
    }
    if(erreur){ 
        
    if(!req.body.id){
        manquant.push("id");
    }
    if(!req.body.utilisateur_id) {
       manquant.push("utilisateur_id");
    }
    if(!req.body.titre){
       manquant.push("Titre");
    }
    if(!req.body.description){
       manquant.push("description");
    }
    if(!req.body.date_debut){
       manquant.push("date_debut");
    }
    if(!req.body.date_echeance){
      manquant.push("date_echeance");
    }
   
    let messageerreur = {"erreur":"le format des donnée est invalide",
        "champs manquant": manquant
    };
    res.status(400);
    res.send(messageerreur);
    return;
    }
    else{
       await tacheModel.modifTache(req.body.id,req.body.utilisateur_id,req.body.titre,req.body.description,req.body.date_debut,req.body.date_echeance) 
       .then((tache)=>{
        let tacheInfo = {
            "id":req.body.id,
            "utilisateur_id":req.body.utilisateur_id,
            "titre":req.body.titre,
            "description":req.body.description,
            "date_debut":req.body.date_debut,
            "date_echeance":req.body.date_echeance
        };
        let rep = {"message":`la tache [${req.body.titre}] a été modifier avec succes`,
                "tache":tacheInfo};
                res.status(200);
                res.send(rep);
    })
    .catch((erreur)=>{
        res.status(500);
        res.send({"erreur":`echec lors de la modification de la tache [${req.body.titre}]`});
    })
    }
};
export default {
listeTache,DetailTache,AjoutTache,ModifTache
}