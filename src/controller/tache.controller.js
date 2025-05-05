import { modif } from "../../../ex-06/src/controller/pokemon.controller.js";
import tacheModel from "../models/tache.model.js";
import url from 'url';
import bcrypt from 'bcrypt';
function genererCleApi() {
    let cle ="";
    let nombrerand;
 const tableau = [ 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L',
    'M', 'N', 'O', 'P', 'Q', 'R',  'S', 'T', 'U', 'V', 'W', 'X',
    'Y', 'Z' ,'0','1','2','3','4','5','6','7','8','9'];
for (let i =0;i<30;i++){
   nombrerand=Math.floor(Math.random()* tableau.length);
   cle = cle + tableau[nombrerand];

}

return cle;
}
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
const ModifStatusTache = async (req,res) => {
    if(!req.params.id ||parseInt(req.params.id) <= 0){
        res.status(400);
        res.send({
            message: "L'id de la tache est requis et doit être supérieur à 0"
        });
        return;
    }
    if(!req.body.complete){
        res.status(400);
        res.send({
            message: "Le status de la tache est requis"
        });
        return; 
    }
    await tacheModel.modifTacheStatus(req.params.id,req.body.complete)
    .then((tache)=>{
        let tacheInfo = {
            "id":req.params.id,
            "complete":req.body.complete
        };
        let rep = {"message":`la tache [${req.params.id}] a été modifier avec succes`,
                "tache":tacheInfo};
                res.status(200);
                res.send(rep);
    })
    .catch((erreur)=>{
        res.status(500);
        res.send({"erreur":`echec lors de la modification de la tache [${req.params.id}]`});
    })
};
const supprimerTache = async (req,res) => {
let trouver = false;
let tacheInfo;
if(!req.params.id ||parseInt(req.params.id) <= 0){
    res.status(400);
    res.send({
        message: "L'id de la tache est requis et doit être supérieur à 0"
    });
    return;
}
await tacheModel.getDetailTache(req.params.id)
.then((tache)=>{
    if(!tache[0]){
        res.status(404);
        res.send({
            message: `tache introuvable avec l'id  ${req.params.id}`
        });
        return;
    }
    trouver = true;
    tacheInfo = tache;
})
.catch((erreur)=>{
    console.log('Erreur : ', erreur);
    res.status(500)
    res.send({
        message: "Erreur lors de la récupération des detail de la tache avec l'id  " + req.params.id
    });

});

await tacheModel.supprimerTache(req.params.id)
    .then((suppr)=>{
       if(!trouver){
        res.status(404)
        res.send({"erreur":`la tache [${req.params["id"]}] n'existe pas dans la base de données`});
        return;
       }
       else{
        let rep = {"message": `la tache ${req.params.id} a ete supprimer avec success`,
        "tache":tacheInfo};
        res.status(200);
        res.send(rep);
       }

    })
    .catch((erreur)=>{
        console.log('Erreur : ', erreur);
        res.status(500)
        res.send({
            message: "Erreur lors de la suppresion de la tache   " + req.params.id
        });
    
    }); 

};

const AjoutSousTache = async (req,res) => {
    let erreur = false;
    let manquant = [];
    if(parseInt(req.body.tache_id) <= 0){
        res.status(400);
        res.send({
            message: "L'id de la tache doit être supérieur à 0"
        });
        return;
    }
    if(!req.body.tache_id ||!req.body.titre || !req.body.complete) {
        erreur = true;
    }
    if(erreur){
    if(!req.body.tache_id) {
       manquant.push("tache_id");
    }
    if(!req.body.titre){
       manquant.push("Titre");
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
       await tacheModel.ajoutsoustache(req.body.tache_id,req.body.titre,req.body.complete)
        .then((soustache)=>{
            let soustacheInfo = {
                "id":soustache.insertId,
                "tache_id":req.body.tache_id,
                "titre":req.body.titre,
                "complete":req.body.complete
            };
            let rep = {"message":`la sous-tache [${req.body.titre}] a été ajouter avec succes`,
                    "tache":soustacheInfo};
                    res.status(200);
                    res.send(rep);
        })
        .catch((erreur)=>{
            res.status(500);
            res.send({"erreur":`echec lors de la creation de la sous-tache [${req.body.titre}]`});
        })
    }
};
const ModifSousTache = async (req,res) => {
    let erreur = false;
    let manquant = [];
    if(parseInt(req.body.tache_id) <= 0){
        res.status(400);
        res.send({
            message: "L'id de la tache doit être supérieur à 0"
        });
        return;
    }
    if(parseInt(req.body.id) <= 0){
        res.status(400);
        res.send({
            message: "L'id de la sous-tache doit être supérieur à 0"
        });
        return;
    }
    if(!req.body.tache_id ||!req.body.titre  || !req.body.id) {
        erreur = true;
    }
    if(erreur){ 
        
    if(!req.body.id){
        manquant.push("id");
    }
    if(!req.body.tache_id) {
       manquant.push("tache_id");
    }
    if(!req.body.titre){
       manquant.push("Titre");
    }

   
    let messageerreur = {"erreur":"le format des donnée est invalide",
        "champs manquant": manquant
    };
    res.status(400);
    res.send(messageerreur);
    return;
    }
    else{
       await tacheModel.modifSousTache(req.body.id,req.body.tache_id,req.body.titre) 
       .then((soustache)=>{
        let soustacheInfo = {
            "id":req.body.id,
            "tache_id":req.body.tache_id,
            "titre":req.body.titre
        };
        let rep = {"message":`la sous-tache [${req.body.titre}] a été modifier avec succes`,
                "tache":soustacheInfo};
                res.status(200);
                res.send(rep);
    })
    .catch((erreur)=>{
        res.status(500);
        res.send({"erreur":`echec lors de la modification de la sous-tache [${req.body.titre}]`});
    })
    }
};
const ModifStatusSousTache = async (req,res) => {
    if(!req.params.id ||parseInt(req.params.id) <= 0){
        res.status(400);
        res.send({
            message: "L'id de la sous-tache est requis et doit être supérieur à 0"
        });
        return;
    }
    if(!req.body.complete){
        res.status(400);
        res.send({
            message: "Le status de la sous-tache est requis"
        });
        return; 
    }
    await tacheModel.modifSousTacheStatus(req.params.id,req.body.complete)
    .then((soustache)=>{
        let soustacheInfo = {
            "id":req.params.id,
            "complete":req.body.complete
        };
        let rep = {"message":`la sous-tache [${req.params.id}] a été modifier avec succes`,
                "tache":soustacheInfo};
                res.status(200);
                res.send(rep);
    })
    .catch((erreur)=>{
        res.status(500);
        res.send({"erreur":`echec lors de la modification de la sous-tache [${req.params.id}]`});
    })
};
const supprimerSousTache = async (req,res) => {
    let trouver = false;
    let soustacheInfo;
    if(!req.params.id ||parseInt(req.params.id) <= 0){
        res.status(400);
        res.send({
            message: "L'id de la sous-tache est requis et doit être supérieur à 0"
        });
        return;
    }
    await tacheModel.getDetailSousTache(req.params.id)
    .then((soustache)=>{
        if(!soustache[0]){
            res.status(404);
            res.send({
                message: `sous-tache introuvable avec l'id  ${req.params.id}`
            });
            return;
        }
        trouver = true;
        soustacheInfo = soustache;
    })
    .catch((erreur)=>{
        console.log('Erreur : ', erreur);
        res.status(500)
        res.send({
            message: "Erreur lors de la récupération des detail de la sous-tache avec l'id  " + req.params.id
        });
    
    });
    
    await tacheModel.supprimerSousTache(req.params.id)
        .then((suppr)=>{
           if(!trouver){
            res.status(404)
            res.send({"erreur":`la sous-tache [${req.params["id"]}] n'existe pas dans la base de données`});
            return;
           }
           else{
            let rep = {"message": `la sous-tache ${req.params.id} a ete supprimer avec success`,
            "tache":soustacheInfo};
            res.status(200);
            res.send(rep);
           }
    
        })
        .catch((erreur)=>{
            console.log('Erreur : ', erreur);
            res.status(500)
            res.send({
                message: "Erreur lors de la suppresion de la sous-tache   " + req.params.id
            });
        
        }); 
    
    };
const ajoutUtilisateur = async  (req,res) => {
    let erreur = false;
    let manquant = [];
    let courriel = req.body.courriel;
    if(!req.body.nom || !req.body.prenom || !req.body.courriel || !req.body.password){
        erreur = true;
    }
    if(erreur){
        if(!req.body.nom){
            manquant.push("nom");
        }
        if(!req.body.prenom){
            manquant.push("prenom");
        }
        if(!req.body.courriel){
            manquant.push("courriel");
        }
        if(!req.body.password){
            manquant.push("mot de passe");
        }
        let messageerreur = {"erreur":"le format des donnée est invalide",
            "champs manquant": manquant
        };
        res.status(400);
        res.send(messageerreur);
        return;
    }
    else if(!courriel.includes("@")){
        res.status(400);
        res.send({"erreur":"le courriel doit contenir un @"});
        return;
    }
    else if(req.body.nom >30){
        res.status(400);
        res.send({"erreur":"le nom est trop long = 30 charactere max"});
        return;
    }
    else if(req.body.prenom >30){
        res.status(400);
        res.send({"erreur":"le prenom est trop long = 30 charactere max"});
        return;
    }
    else{
        let valide =false;
        let cleApi;
        let passhach;
        const costFactor =10;
        while (valide != true){
        cleApi = genererCleApi();
        
       await tacheModel.ValidationCle(cleApi)
        .then(resultat => {
                if(!resultat[0]){
                    valide = true;
                }
            })
         }
       passhach = await bcrypt.hash(req.body.password, costFactor);
      console.log(cleApi,req.body.nom,req.body.prenom);
         console.log(cleApi.length);
    await tacheModel.ajoutUtilisateur(req.body.nom,req.body.prenom,req.body.courriel,cleApi,passhach)
    .then((user)=>{
        let rep = {"message":`l'utilisateur' [${req.body.prenom}] a été ajouter avec succes`,
                "cle_api":cleApi};
                res.status(200);
                res.send(rep);
    })
    .catch((erreur)=>{
        res.status(500);
        res.send({"erreur":`echec lors de la creation de l'utilisateur [${req.body.prenom}]`});
    })
}

};
export default {
listeTache,DetailTache,AjoutTache,ModifTache,ModifStatusTache,supprimerTache,AjoutSousTache,ModifSousTache,ModifStatusSousTache,supprimerSousTache,ajoutUtilisateur
}