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
};
showProduct();
