//---------------------- Lire le Local storage pour recuperer le tableau de produit -------------------------------------

//-----------------------j'initialise un tableau qui va acceuillir l'ensemble des articles-------------------------------
let articles = [];
let container = document.querySelector("#container");
let total = document.querySelector("#total");
let products = [];
let productLocalStorage = JSON.parse(localStorage.getItem("cart"));
if (!productLocalStorage)
  function deleteKanap(id) {
    localStorage.removeItem(id);
  }
//---------------------- Création d'une fonction qui ajoute chaque element du LocalStorage dans le tableau articles------------
function recupStorage() {
  //---------------------- boucle qui envoi les elements dans le tableau articles-------------------------
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    let article = JSON.parse(localStorage.getItem(key));
    articles.push(article);
    products.push(article.id);
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
    async function multiplierPrix() {
      await recupPrice();
      prixUnitaire = kanap.quantiteSelect * price;

      console.log(prixUnitaire);
    }

    //-----------------------------on insere nos elements dans l'HTML-----------------------------------------
    async function remplirPanier() {
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
                `;
      //*******************************************Supprimer un element du panier*************************************************

      container.innerHTML += cart;
      total.innerHTML += Total;

      //---------------on a sélectionné tous les boutons supprimés----------------------------

      document.querySelectorAll(".deleteItem").forEach((element) => {
        element.addEventListener("click", function (event) {
          if (confirm("Voulez-vous supprimer votre commande?")) {
            event.stopPropagation();
            event.preventDefault();
            deleteKanap(kanap.id);
            location.reload();
          }
        });
      });
    }

    remplirPanier();
  });
}

recupArticle();

let sommeTotal = 0;

//------------------------------Modifier la quantité ------------------------------------------
const btnChangeQty = document.querySelectorAll(".itemQuantity");
btnChangeQty.forEach((btn) => {
  const closeArticle = btn.closest("article");
  const id = closeArticle.dataset.id;
  // console.log(id)
  let quantityUpdate = "";
  const color = closeArticle.dataset.color;
  btn.addEventListener("change", (event) => {
    event.preventDefault();
    quantityUpdate = Number(btn.value);

    cartArray.forEach((couch) => {
      if (couch.teinteSelect == color && couch.ID == id) {
        couch.quantiteSelect = quantityUpdate;
        if (couch.quantiteSelect == 0) {
          let index = cartArray.indexOf(couch);
          if (confirm("Cet article sera supprimé de votre panier")) {
            closeArticle.remove(); //supprimer le tag article
            cartArray.splice(index, 1); // on retire ce canapé du panier
          }
        }
      }
    });
    if (confirm("Êtes-vous sur de vouloir modifier la quantité")) {
      window.location.reload();
      localStorage.setItem("cart", JSON.stringify(cartArray));
    }
  });
});

//*********************************************FORMULAIRE *************************************************************

//------------------- on relis le  HTML avec le JS pour le formulaire---------------------------

let totalQuantiteInput = document.querySelector("#totalQuantity");
let totalPriceInput = document.querySelector("#totalPrice");
let firstName = document.querySelector("#firstName");
let lastName = document.querySelector("#lastName");
let address = document.querySelector("#address");
let city = document.querySelector("#city");
let email = document.querySelector("#email");
let btnCommanderInput = document.querySelector("#order");

//--------------------------- On crée un fonction pour envoyer le formulaire -----------------------------------

function envoiForm() {
  let contact = {
    firstName: firstName.value,
    lastName: lastName.value,
    address: address.value,
    city: city.value,
    email: email.value,
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
const regexCity =
  /^([a-zA-Z\u0080-\u024F]+(?:. |-| |'))*[a-zA-Z\u0080-\u024F]*$/;
const regexMail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]{2,}\.[a-z]{2,4}$/;

//------------------------chaque fois que l'utilisateur tente d'envoyer les données------------------------------
//------------------------on vérifie que le champ est valide---------------------------------------------------

firstName.addEventListener("input", () => {
  //-------------------si il est invalide, on affiche un message d'erreur personnalisé-------------------------

  if (regexNames.test(firstName.value) == false) {
    document.getElementById("firstNameErrorMsg").innerHTML =
      "format de votre prénom incorrect";
  } else {
    document.getElementById("firstNameErrorMsg").innerHTML = "";
  }
});

//-------------------ça empêche l'envoi des données du formulaire au back---------------------------------

//-------------------sinon le msg d'erreur s'enlève-----------------------------------------------------

lastName.addEventListener("input", () => {
  if (regexNames.test(lastName.value) == false) {
    //-----------------------------si les donnees saisies dans mon input sont incorrectes, un msg d'erreur apparait------------------

    document.getElementById("lastNameErrorMsg").innerHTML =
      "format de votre nom incorrect";
  } else {
    document.getElementById("lastNameErrorMsg").innerHTML = "";
  }
});

address.addEventListener("input", () => {
  if (regexAddress.test(address.value) == false) {
    document.getElementById("addressErrorMsg").innerHTML =
      "format d'adresse incorrect";
  } else {
    document.getElementById("addressErrorMsg").innerHTML = "";
  }
});

city.addEventListener("input", () => {
  if (regexCity.test(city.value) == false) {
    document.getElementById("cityErrorMsg").innerHTML =
      "format de ville incorrect";
  } else {
    document.getElementById("cityErrorMsg").innerHTML = "";
  }
});

email.addEventListener("input", () => {
  if (regexMail.test(email.value) == false) {
    document.getElementById("emailErrorMsg").innerHTML =
      "l'email saisi n'est pas correct";
  } else {
    document.getElementById("emailErrorMsg").innerHTML = "";
  }
});

//*****************************************Envoi du formulaire au clik du bouton**************************************
const submitForm = document.getElementById("order");

submitForm.addEventListener("click", (e) => {
  e.preventDefault(); //empeche le refresh de la page quand on clique

  let contact = {
    firstName: firstName.value,
    lastName: lastName.value,
    address: address.value,
    city: city.value,
    email: email.value,
  };

  let envoiApi = { contact, products };
  console.log(envoiApi);

  if (confirm("Voulez-vous valider votre commande?")) {
    fetch("http://localhost:3000/api/products/order", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(envoiApi),
    })
      .then((reponse) => {
        return reponse.json();
      })
      .then((reponse) => {
        sessionStorage.setItem("order", reponse.orderId);
      });
    location.href = "confirmation.html";
  }
});
