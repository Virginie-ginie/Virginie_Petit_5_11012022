
// initialise un tableau vide pour y mettre la reponse de la requete 
let resultatKanap = "";

requeteAPI();



//----------------Appel a l'API-----------------------------
// -------- on récupere tout les articles -------------------
function requeteAPI() {
  fetch("http://localhost:3000/api/products")
  .then(function (reponse) {
    if (reponse.ok) {
        // on recupere la réponse en JSON
        return reponse.json();
      }
    })
    
    .then(function (donneesAPI) {
      console.log(donneesAPI);
      // on stock la reponse dans resultatKanap
      resultatKanap = donneesAPI;
      insererKanap(resultatKanap);
    })
    // en cas d'erreur on la recupere 
    .catch(function (erreur) {
      console.log("Message d'erreur : \n" + erreur);
      alert("Une erreur est survenue lors du chargement");
    });
}

//----------------------Insérer les produits dans la page d'accueil------------------------------

function insererKanap(resultatKanap) {
  // on initialise une boucle 
  for (let i = 0; i < resultatKanap.length; i = i + 1) {
    let items = document.querySelector("#items");

    //----------------- Création des balises-------------------------------------------
    let baliseA = document.createElement("a");
    let baliseArticle = document.createElement("article");
    let baliseImg = document.createElement("img");
    let baliseH3 = document.createElement("h3");
    let baliseP = document.createElement("p");

    //------------------ Ajout des balises---------------------------------------------
    items.appendChild(baliseA);

    baliseA.appendChild(baliseArticle);
    baliseA.setAttribute("href", "product.html?id=" + resultatKanap[i]._id);

    baliseArticle.appendChild(baliseImg);
    baliseImg.src = resultatKanap[i].imageUrl;
    baliseImg.alt = resultatKanap[i].altTxt;

    baliseArticle.appendChild(baliseH3);
    baliseH3.textContent = resultatKanap[i].name;
    baliseH3.classList.add("productName");

    baliseArticle.appendChild(baliseP);
    baliseP.textContent = resultatKanap[i].description;
    baliseP.classList.add("productDescription");
  }
  console.log(items);
}
