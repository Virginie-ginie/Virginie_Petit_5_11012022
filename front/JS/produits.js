//------------------Appel de L'id------------------------------------------------
let idResultatKanap = new URL(window.location.href).searchParams.get("id");

//----------------Appel de l'API--------------------------------------

let resultatkanap;
const getResultatKanap = async () => {
  await fetch("http://localhost:3000/api/products/" + idResultatKanap)
    .then((res) => res.json())
    .then((JSON) => (resultatkanap = JSON))
    .catch((error) => console.error(error));
};

getResultatKanap();

const showProduct = async () => {
  await getResultatKanap();

  //----------------- Création des balises------------------------------

  let imageKanap = document.querySelector(".item__img");

  let couleurKanap = document.querySelector("#colors");

  //------------------ Ajout des balises--------------------------------

  //-------------Ajout de l'image-------------------------------------------

  let baliseImg = document.querySelector("img");
  baliseImg.setAttribute("src", resultatkanap.imageUrl);
  baliseImg.setAttribute("alt", resultatkanap.altTxt);
  imageKanap.appendChild(baliseImg);

  //--------------Ajout du nom ----------------------------------------------

  let baliseNom = document.getElementById("title");
  baliseNom.innerHTML = resultatkanap.name;

  //-------------Ajout du prix ---------------------------------------------
  let balisePrix = document.getElementById("price");
  balisePrix.innerHTML = resultatkanap.price;

  //-------------Ajout de la description------------------------------------

  let baliseDescription = document.getElementById("description");
  baliseDescription.innerHTML = resultatkanap.description;

  //----------Ajout des couleurs -----------------------------------------

  for (let i = 0; i < resultatkanap.colors.length; i++) {
    let color = document.createElement("option");
    color.setAttribute("value", resultatkanap.colors[i]);
    color.innerHTML = resultatkanap.colors[i];
    couleurKanap.appendChild(color);
  }

  //---------------------Ajout au local Storage --------------------------------

//------------------ Tableau produit ---------------------------------
 
let product = resultatkanap

//------------------- on relis le  HTML avec le JS pour le selection des couleurs  et la quantite------
 
let color = document.querySelector("#colors");
let quantite = document.querySelector('#quantity')


//-------------------- on crée une fonction qui va etre appelle des qu'on change de couleur ----

function selectColor(){

  //----------------- on recupere la couleur que l'utilisateur choisie-------
 
  var teinte = color.value
  console.log(teinte)

  //------------------ on l'ajoute au tableau produit --------------------------------
 
  product.teinteSelect = teinte
  console.log(product)
}

//-------------------- on crée une fonction qui va etre appelle des qu'on change la quantite ----

function selectQuantity(){

  //----------------- on recupere la quantite que l'utilisateur choisie-------
 
  var quantite = quantity.value
  console.log(quantite)

  //------------------ on l'ajoute au tableau produit --------------------------------
 
  product.quantiteSelect = quantite
  console.log(product)
}
//---------------on appelle la fonction--------------------

color.addEventListener('input' ,(e) => {
  selectColor()
})
 quantity.addEventListener('input' ,(e) =>{
   selectQuantity()
 })


  let bouton = document.getElementById("addToCart");
  console.log(product);

  function addToCart(key, value) {
    localStorage.setItem(key, value);
  }

  bouton.addEventListener("click", () => {
    addToCart(
      idResultatKanap,
      JSON.stringify(product) 
      
      );
      location.href = "cart.html"
  });
};
showProduct();


//---------------------Ajout des produits au panier----------------------------

// let couleurChoisie = document.getElementById("colors");
// let quantiteChoisie = document.getElementById("quantity");
// let cart__items = document.getElementById("cart__items")
// if (quantiteChoisie.value > 0 && quantiteChoisie.value <=100 && quantiteChoisie.value != 0 && couleurChoisie.value != 0) {{
  
//   if (localStorage.getItem("panier")) {
    
//     let productPanier = JSON.parse(localStorage.getItem("panier"));
//     console.log(productPanier);

//     let idKanap = idResultatKanap;
//             let Kanapcouleur = document.querySelector("#colors").value;
//             let kanapquantite = document.querySelector("#quantity").value;

//             const resultFind = productCart.find(
//                 (el) => el.idKanap === idResultatKanap && el.Kanapcouleur === Kanapcouleur);

    
//   }
// }
// }

//------------------Les variables pour les elements qu'on veux envoyer dans le panier-----------------
