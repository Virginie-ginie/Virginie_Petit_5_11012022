
let resultatKanap = "";

requeteAPI();



//----------------Appel a l'API-----------------------------
function requeteAPI() {
  fetch("http://localhost:3000/api/products")
    .then(function (reponse) {
      if (reponse.ok) {
        return reponse.json();
      }
    })
    .then(function (donneesAPI) {
      console.log(donneesAPI);
      resultatKanap = donneesAPI;
      insererKanap(resultatKanap);
    })
    .catch(function (erreur) {
      console.log("Message d'erreur : \n" + erreur);
      alert("Une erreur est survenue lors du chargement");
    });
}

//----------------------Insérer les produits dans la page d'accueil------------------------------

function insererKanap(resultatKanap) {
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
