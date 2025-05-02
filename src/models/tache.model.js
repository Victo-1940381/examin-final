import db from '../config/bd.js';

const ValidationCle = (cleApi) => {
    return new Promise((resolve,reject)=> {
        const requete = 'select * from utilisateur where cle_api = $1';
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
        const requete = 'select * from taches where id = $1';
        const parametre = [id];
        db.query(requete,parametre,(erreur,resultat)=>{
            console.log('Erreur sqlState : ' + erreur);
            console.log(`Erreur sqlState ${erreur.sqlState} : ${erreur.sqlMessage}`);
            reject(erreur);
        });
        resolve(resultat.rows);
    });
};
const getListeSousTache = (id) => {
    return new Promise((resolve,reject)=>{
        const requete = 'select * from sous_taches where tache_id = $1';
        const parametre = [id];
        db.query(requete,parametre,(erreur,resultat)=>{
            console.log('Erreur sqlState : ' + erreur);
            console.log(`Erreur sqlState ${erreur.sqlState} : ${erreur.sqlMessage}`);
            reject(erreur);
        });
        resolve(resultat.rows);
    });
}
export default {
    getListeTacheIncomplete,ValidationCle,getListeTache,getDetailTache,getListeSousTache
}