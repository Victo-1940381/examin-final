

function creeruser(){
let prenom =document.getElementById('prenom').value;
let nom = document.getElementById('nom').value;
let courriel = document.getElementById('courriel').value;
 let pass = document.getElementById('password').value;
const url = "http://localhost:3000/Utilisateur";

 fetch(url, {
    method: "POST",
    headers: {
        "Content-Type": "application/json;charset=utf-8"
    },
    body: JSON.stringify({
        nom:nom,
        prenom:prenom,
        courriel:courriel,
        password:pass
    })
})
.then(response => response.json())
.then(data => {
    alert(`${data.message} cle Api: ${data.cle_api}`);
})
.catch(error => console.error(error));


}
function getApi(){
    let emailapi =document.getElementById("courrielapi").value;
    let passapi = document.getElementById("passapi").value;
    let generer = document.getElementById("generationapicle").checked;
    const urlpasgene = `http://localhost:3000/CleApi?courriel=${emailapi}&password=${passapi}`;
    const urlgene = `http://localhost:3000/CleApi?courriel=${emailapi}&password=${passapi}&genererapi=true`;
    if(generer == false){
        fetch(urlpasgene)
        .then(response => response.json())
        .then(data => {
             alert(`votre cle Api: ${data.cle_api}`);
        })
        .catch(error => console.error(error));
    }
    else{
        fetch(urlgene)
        .then(response => response.json())
        .then(data => {
             alert(`votre cle Api: ${data.cle_api}`);
        })
        .catch(error => console.error(error));
    }
}
//document.getElementById("buttonCreer").onclick = creeruser();