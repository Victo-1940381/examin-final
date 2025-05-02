import db from '../config/bd.js';

const ValidationCle = (cleApi) => {
    return new Promise((Resolve,reject)=> {
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
        const requete = 'select titre,description,date_debut,date_echeance,complete from taches where  utilisateur_id = $1 and complete = $2';
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
export default {
    getListeTacheIncomplete,ValidationCle
}