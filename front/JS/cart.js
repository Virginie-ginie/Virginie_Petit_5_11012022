//---------------------- Lire le Local storage pour recuperer le tableau de produit -------------------------------------

//-----------------------j'initialise un tableau qui va acceuillir l'ensemble des articles-------------------------------
let articles = [];
let container = document.querySelector("#container")
let total = document.querySelector("#total")

//---------------------- Création d'une fonction qui ajoute chaque element du LocalStorage dans le tableau articles------------
function recupStorage() {
  //---------------------- boucle qui envoi les elements dans le tableau articles-------------------------
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    let article = JSON.parse(localStorage.getItem(key));
    articles.push(article);
  }
  console.log(articles);
}
recupStorage();

//---------------------- Faire une boucle pour parcourir le tableau ---------------------
function recupArticle() {
  articles.forEach((kanap) => {
    
    console.log(kanap);
    
    console.log(kanap.name);
   
    
    //-------------------------------On recupere les prix dans l'API---------------------------
    let price;
    const recupPrice = async () => {
      await fetch("http://localhost:3000/api/products/" + kanap.id)
      .then((res) => res.json())
      .then((JSON) => (price = JSON.price))
      
      .then(() => console.log(price))
      .catch((error) => console.error(error));
    };

    //--------------------- Multiplication quantité * prix unitaire----------------------
    let prixUnitaire = 0;
    async function multiplierPrix(){
      await recupPrice();
      prixUnitaire = kanap.quantiteSelect * price;

    console.log(prixUnitaire);
    
    }
    

//-----------------------------on insere nos elements dans l'HTML-----------------------------------------
    async function remplirPanier(){
      await multiplierPrix();
      const cart = `
                <article class="cart__item" data-id="{product-ID}" data-color="{product-color}">
                <div class="cart__item__img">
                  <img src="${kanap.image}"/>
                </div>
                <div class="cart__item__content">
                  <div class="cart__item__content__description">
                    <h2>${kanap.name}</h2>
                    <p>${kanap.teinteSelect}</p>
                    <p>${price} €</p>
                  </div>
                  <div class="cart__item__content__settings">
                    <div class="cart__item__content__settings__quantity">
                      <p>Qté :  </p>
                      <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${kanap.quantiteSelect}">
                    </div>
                    <div class="cart__item__content__settings__delete">
                      <p class="deleteItem">Supprimer</p>
                    </div>
                  </div>
                </div>
              </article>`;

              const Total = `
              <p>Total (<span id="totalQuantity"><!-- 2 --></span> articles) : <span id="totalPrice">${prixUnitaire}</span> €</p>
              `   
                  
              container.innerHTML += cart;
              total.innerHTML += Total
            }
            remplirPanier();
          });
          //*******************************************Supprimer un element du panier*************************************************
          
          //--------------- séléction des reférences du bouton --------------------
          async function supprimerElement(){
            await remplirPanier();
            
          
          let btnSupprimer = document.querySelectorAll(".deleteItem");
          console.log(btnSupprimer);
          
          for (let i =0; i < btnSupprimer.length; i++){
            btnSupprimer.addEventListener("click" , (event) =>{
              event.preventDefault();
              console.log('clic supprimer');
              //--------------------- enregistrer l'id et la couleur séléctionnés par le bouton supprimer--------------------------
              let deleteId = productLocalStorage[i].idResultatKanap;
              let deleteColor = productLocalStorage[i].couleurKanap;
              
              // -----------------------------filtrer l'élément cliqué par le bouton supprimer-------------------------------------
              productLocalStorage = productLocalStorage.filter( elt => elt.idResultatKanap !== deleteId || elt.couleurKanap !== deleteColor);
              
              // ------------------------------envoyer les nouvelles données dans le localStorage------------------------------------
              localStorage.setItem('cart', JSON.stringify(productLocalStorage));               
              
              //--------------------------------- avertir de la suppression et recharger la page-----------------------------------
              alert('Votre article a bien été supprimé.');
              
              //------------------------Si pas de produits dans le local storage on affiche que le panier est vide-------------------
              if (productLocalStorage.length === 0) {
                  localStorage.clear();
                }
                //-------------------------------Refresh rapide de la page-----------------------------------------------------
                location.reload();
              });
            };
          }
        }
        recupArticle();
        supprimerElement();

let sommeTotal = 0;

//------------------------------Modifier la quantité / la couleur------------------------------------------





//*********************************************FORMULAIRE *************************************************************

//------------------- on relis le  HTML avec le JS pour le formulaire---------------------------

let totalQuantiteInput = document.querySelector("#totalQuantity");
let totalPriceInput = document.querySelector("#totalPrice");
let prenomInput = document.querySelector("#firstName");
let nomInput = document.querySelector("#lastName");
let adresseInput = document.querySelector("#address");
let villeInput = document.querySelector("#city");
let emailInput = document.querySelector("#email");
let btnCommanderInput = document.querySelector("#order");

//--------------------------- On crée un fonction pour envoyer le formulaire -----------------------------------

function envoiForm() {
  let contact = {
    prenomInput: prenomInput.value,
    nomInput: nomInput.value,
    adresseInput: adresseInput.value,
    villeInput: villeInput.value,
    emailInput: emailInput.value,
  };
  console.log(contact);
}

btnCommanderInput.addEventListener("click", (e) => {

  //--------empecher le refresh de la page quand on clique------------------
  e.preventDefault();
  
  envoiForm();

  
});

//******************************************************FORMULAIRE ERREUR ****************************************************************

//----------------------- Message d'erreur si le formulaire n'est pas bien rempli---------------------------------

const regexNames = /^[a-z ,.'-]+$/i;
const regexAddress = /^[a-zA-Z0-9\s,'-]*$/;
const regexCity = /^([a-zA-Z\u0080-\u024F]+(?:. |-| |'))*[a-zA-Z\u0080-\u024F]*$/;
const regexMail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]{2,}\.[a-z]{2,4}$/;

//------------------------chaque fois que l'utilisateur tente d'envoyer les données------------------------------
//------------------------on vérifie que le champ est valide---------------------------------------------------

prenomInput.addEventListener("input", () => {
  
  //-------------------si il est invalide, on affiche un message d'erreur personnalisé-------------------------

  if (regexNames.test(prenomInput.value) == false) {
    document.getElementById("firstNameErrorMsg").innerHTML =
      "format de votre prénom incorrect";
  } else {
    document.getElementById("firstNameErrorMsg").innerHTML = "";
  }

}); 

//-------------------ça empêche l'envoi des données du formulaire au back---------------------------------

  //-------------------sinon le msg d'erreur s'enlève-----------------------------------------------------
  

nomInput.addEventListener("input", () => {
  if (regexNames.test(nomInput.value) == false) {
    //-----------------------------si les donnees saisies dans mon input sont incorrectes, un msg d'erreur apparait------------------

    document.getElementById("lastNameErrorMsg").innerHTML =
      "format de votre nom incorrect";
  } else {
    document.getElementById("lastNameErrorMsg").innerHTML = "";
  }
});

adresseInput.addEventListener("input", () => {
  if (regexAddress.test(adresseInput.value) == false) {
    document.getElementById("addressErrorMsg").innerHTML =
      "format d'adresse incorrect";
  } else {
    document.getElementById("addressErrorMsg").innerHTML = "";
  }
});

villeInput.addEventListener("input", () => {
  if (regexCity.test(villeInput.value) == false) {
    document.getElementById("cityErrorMsg").innerHTML =
      "format de ville incorrect";
    } else {
      document.getElementById("cityErrorMsg").innerHTML = "";
  }
});

emailInput.addEventListener("input", () => {
  if (regexMail.test(emailInput.value) == false) {
    document.getElementById("emailErrorMsg").innerHTML =
      "l'email saisi n'est pas correct";
  } else {
    document.getElementById("emailErrorMsg").innerHTML = "";
  }
});



//-------------lire l'id dans le tableau-------------------

// ------------j'envoie chaque prix dans le tableau "price" -------------------------------



//------------- faire le calcul final----------------------


//------------- modifier la page HTML----------------------

//--------------------- Aprés la boucle ---------------------------



//---------------- l'afficher dans la page HTML-------------

//-----------------------------------Envoi du formulaire au clik du bouton--------------------------------------

const submitForm = document.getElementById('order');

submitForm.addEventListener("click", (e) => {
  e.preventDefault() //empeche le refresh de la page quand on clique

let envoiApi = {envoiForm,container};
console.log(envoiApi);

if(confirm("Voulez-vous valider votre commande?")){
  fetch("http://localhost:3000/api/products/order" + recupArticle, {
    method:"POST",
    headers:{
      "Accept": 'application/json',
      "Content-Type" : 'application/json'
    },
    body: JSON.stringify(envoiApi)
  })

  .then(reponse =>{
    return reponse.json();
  })
}


})
