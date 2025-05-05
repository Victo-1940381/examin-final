import db from '../config/bd.js';

const ValidationCle = (cleApi) => {
    return new Promise((resolve,reject)=> {
        const requete = 'select id from utilisateur where cle_api = $1';
        const parameters = [cleApi];
        db.query(requete,parameters,(erreur,resultat)=>{
            if(erreur){
                console.log('Erreur sqlState : ' + erreur);
                console.log(`Erreur sqlState ${erreur.sqlState} : ${erreur.sqlMessage}`);
                reject(erreur);
            }
            resolve(resultat.rows);
        });
    });
};

const getListeTacheIncomplete = (id) => {
    return new Promise((resolve,reject)=> {
        const requete = 'select titre, description from taches where  utilisateur_id = $1 and complete = $2';
        const parametres = [id,false];
        db.query(requete,parametres,(erreur,resultat)=> {
            if (erreur){
                console.log('Erreur sqlState : ' + erreur);
                console.log(`Erreur sqlState ${erreur.sqlState} : ${erreur.sqlMessage}`);
                reject(erreur);
            }

            resolve(resultat.rows);
        });
    });
};
const getListeTache = (id) => {
    return new Promise((resolve,reject)=> {
        const requete = 'select titre,description from taches where  utilisateur_id = $1';
        const parametres = [id];
        db.query(requete,parametres,(erreur,resultat)=> {
            if (erreur){
                console.log('Erreur sqlState : ' + erreur);
                console.log(`Erreur sqlState ${erreur.sqlState} : ${erreur.sqlMessage}`);
                reject(erreur);
            }

            resolve(resultat.rows);
        });
    });
};
const getDetailTache = (id) => {
    return new Promise((resolve,reject)=>{
        const requete = 'select titre,description,date_debut,date_echeance,complete from taches where id = $1';
        const parametre = [id];
        db.query(requete,parametre,(erreur,resultat)=>{
            if(erreur){
            console.log('Erreur sqlState : ' + erreur);
            console.log(`Erreur sqlState ${erreur.sqlState} : ${erreur.sqlMessage}`);
            reject(erreur);
            }
        resolve(resultat.rows);
    });
    });
};
const getListeSousTache = (id) => {
    return new Promise((resolve,reject)=>{
        const requete = 'select titre,complete from sous_taches where tache_id = $1';
        const parametre = [id];
        db.query(requete,parametre,(erreur,resultat)=>{
           if(erreur){
            console.log('Erreur sqlState : ' + erreur);
            console.log(`Erreur sqlState ${erreur.sqlState} : ${erreur.sqlMessage}`);
            reject(erreur);
           }
        resolve(resultat.rows);
    });
    });
};
const ajouttache = (id_util,titre,desc,date_debut,date_echeance,complete) => {
    return new Promise((resolve,reject)=>{
        const requete = 'insert into taches(utilisateur_id,titre,description,date_debut,date_echeance,complete) values($1,$2,$3,$4,$5,$6)';
        const parametre = [id_util,titre,desc,date_debut,date_echeance,complete];
        db.query(requete,parametre,(erreur,resultat)=>{
           if(erreur){
            console.log('Erreur sqlState : ' + erreur);
            console.log(`Erreur sqlState ${erreur.sqlState} : ${erreur.sqlMessage}`);
            reject(erreur);
           }
        resolve(resultat.rows);
    });
    });
};
const modifTache = (id,id_util,titre,desc,date_debut,date_echeance) => {
    return new Promise((resolve,reject)=>{
        const requete = 'update taches set utilisateur_id = $2, titre =$3,description = $4,date_debut =$5,date_echeance=$6 where id=$1 ';
        const parametre = [id,id_util,titre,desc,date_debut,date_echeance];
        db.query(requete,parametre,(erreur,resultat)=>{
           if(erreur){
            console.log('Erreur sqlState : ' + erreur);
            console.log(`Erreur sqlState ${erreur.sqlState} : ${erreur.sqlMessage}`);
            reject(erreur);
           }
        resolve(resultat.rows);
    });
    });
};
const modifTacheStatus = (id,complete) => {
    return new Promise((resolve,reject)=>{
        const requete = 'update taches set complete = $2 where id=$1 ';
        const parametre = [id,complete];
        db.query(requete,parametre,(erreur,resultat)=>{
           if(erreur){
            console.log('Erreur sqlState : ' + erreur);
            console.log(`Erreur sqlState ${erreur.sqlState} : ${erreur.sqlMessage}`);
            reject(erreur);
           }
        resolve(resultat.rows);
    });
    });
};
const supprimerTache = (id) => {
    return new Promise((resolve,reject)=>{
        const requete = 'delete from taches where id=$1 ';
        const parametre = [id];
        db.query(requete,parametre,(erreur,resultat)=>{
           if(erreur){
            console.log('Erreur sqlState : ' + erreur);
            console.log(`Erreur sqlState ${erreur.sqlState} : ${erreur.sqlMessage}`);
            reject(erreur);
           }
        resolve(resultat.rows);
    });
    });
};
const ajoutsoustache = (tache_id,titre,complete) => {
    return new Promise((resolve,reject)=>{
        const requete = 'insert into sous_taches(tache_id,titre,complete) values($1,$2,$3)';
        const parametre = [tache_id,titre,complete];
        db.query(requete,parametre,(erreur,resultat)=>{
           if(erreur){
            console.log('Erreur sqlState : ' + erreur);
            console.log(`Erreur sqlState ${erreur.sqlState} : ${erreur.sqlMessage}`);
            reject(erreur);
           }
        resolve(resultat.rows);
    });
    });
};
const modifSousTache = (id,tache_id,titre) => {
    return new Promise((resolve,reject)=>{
        const requete = 'update sous_taches set tache_id=$2,titre=$3 where id=$1 ';
        const parametre = [id,tache_id,titre];
        db.query(requete,parametre,(erreur,resultat)=>{
           if(erreur){
            console.log('Erreur sqlState : ' + erreur);
            console.log(`Erreur sqlState ${erreur.sqlState} : ${erreur.sqlMessage}`);
            reject(erreur);
           }
        resolve(resultat.rows);
    });
    });
};
const modifSousTacheStatus = (id,complete) => {
    return new Promise((resolve,reject)=>{
        const requete = 'update sous_taches set complete = $2 where id=$1 ';
        const parametre = [id,complete];
        db.query(requete,parametre,(erreur,resultat)=>{
           if(erreur){
            console.log('Erreur sqlState : ' + erreur);
            console.log(`Erreur sqlState ${erreur.sqlState} : ${erreur.sqlMessage}`);
            reject(erreur);
           }
        resolve(resultat.rows);
    });
    });
};
const supprimerSousTache = (id) => {
    return new Promise((resolve,reject)=>{
        const requete = 'delete from sous_taches where id=$1 ';
        const parametre = [id];
        db.query(requete,parametre,(erreur,resultat)=>{
           if(erreur){
            console.log('Erreur sqlState : ' + erreur);
            console.log(`Erreur sqlState ${erreur.sqlState} : ${erreur.sqlMessage}`);
            reject(erreur);
           }
        resolve(resultat.rows);
    });
    });
};
const getDetailSousTache = (id) => {
    return new Promise((resolve,reject)=>{
        const requete = 'select tache_id,titre,complete from sous_taches where id = $1';
        const parametre = [id];
        db.query(requete,parametre,(erreur,resultat)=>{
            if(erreur){
            console.log('Erreur sqlState : ' + erreur);
            console.log(`Erreur sqlState ${erreur.sqlState} : ${erreur.sqlMessage}`);
            reject(erreur);
            }
        resolve(resultat.rows);
    });
    });
};
const ajoutUtilisateur = (nom,prenom,courriel,cle_api,password) => {
    return new Promise((resolve,reject)=>{
        const requete = 'insert into utilisateur(nom,prenom,courriel,cle_api,password) values($1,$2,$3,$4,$5)';
        const parameters = [nom,prenom,courriel,cle_api,password];

        db.query(requete,parameters,(erreur,resultat)=>{
            if(erreur){
                console.log('Erreur sqlState : ' + erreur);
                console.log(`Erreur sqlState ${erreur.sqlState} : ${erreur.sqlMessage}`);
                reject(erreur);
               }
            resolve(resultat.rows);
        });
    });
};
const getCleApi = (courriel)=>{
    return new Promise((resolve,reject)=>{
        const requete = 'select cle_api from utilisateur where courriel = $1';
        const parameters = [courriel];

        db.query(requete,parameters,(erreur,resultat)=>{
            if(erreur){
                console.log('Erreur sqlState : ' + erreur);
                console.log(`Erreur sqlState ${erreur.sqlState} : ${erreur.sqlMessage}`);
                reject(erreur);
               }
            resolve(resultat.rows);
        });
    });
};
const validerPass = (courriel)=>{
    return new Promise((resolve,reject)=>{
        const requete = 'select password from utilisateur where courriel = $1';
        const parameters = [courriel];

        db.query(requete,parameters,(erreur,resultat)=>{
            if(erreur){
                console.log('Erreur sqlState : ' + erreur);
                console.log(`Erreur sqlState ${erreur.sqlState} : ${erreur.sqlMessage}`);
                reject(erreur);
               }
            resolve(resultat.rows);
        });
    });
};
const newCleApi = (courriel,cle_api)=>{
    return new Promise((resolve,reject)=>{
        const requete = 'update utilisateur set cle_api=$2 where courriel = $1';
        const parameters = [courriel,cle_api];

        db.query(requete,parameters,(erreur,resultat)=>{
            if(erreur){
                console.log('Erreur sqlState : ' + erreur);
                console.log(`Erreur sqlState ${erreur.sqlState} : ${erreur.sqlMessage}`);
                reject(erreur);
               }
            resolve(resultat.rows);
        });
    });
}
export default {
    getListeTacheIncomplete,ValidationCle,getListeTache,getDetailTache,getListeSousTache,ajouttache,modifTache,
    modifTacheStatus,supprimerTache,ajoutsoustache,modifSousTache,modifSousTacheStatus,supprimerSousTache,getDetailSousTache,
    ajoutUtilisateur,getCleApi,validerPass,newCleApi
}