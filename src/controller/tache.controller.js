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

export {
listeTache
}