

function creeruser(){
prenom =document.getElementById('prenom').value;
nom = document.getElementById('nom').value;
courriel = document.getElementById('courriel').value;
pass = document.getElementById('password').value;
let user = {
    prenom: prenom,
    nom:nom,
    courriel:courriel,
    password:pass
};
let reponce = await fetch('http://localhost:3000/Utilisateur', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify(user)
});

let resultat = await reponce.json();

}
