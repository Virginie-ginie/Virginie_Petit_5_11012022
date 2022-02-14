//---------------------Ajout des produits au panier----------------------------

let couleurChoisie = document.getElementById("colors");
let quantiteChoisie = document. getElementById("quantity");

if (quantiteChoisie.value > 0 && quantiteChoisie.value <=100 && quantiteChoisie.value != 0 && couleurChoisie.value != 0) {{
  
  if (localStorage.getItem("panier")) {
    
    let productPanier = JSON.parse(localStorage.getItem("panier"));
    console.log(productPanier);

    //------------------Les variables pour les elements qu'on veux envoyer dans le panier-----------------

    let idKanap = idProduct;
    let couleurKanap = document.querySelector("#colors").value;
    let quantiteKanap = document.querySelector("#quantity").value;
  }
}
}

//---------------------- Lire le Local storage pour recuperer le tableau de produit -------------------------------------


//---------------------- Faire une boucle pour parcourir le tableau ---------------------

        //-------------lire l'id dans le tableau-------------------
        //------------- chercher les info dans l'API --------------
        //------------- faire le calcul final----------------------
        //------------- modifier la page HTML----------------------

//--------------------- Aprés la boucle ---------------------------

        //---------------- recuperer le total----------------------
       //---------------- l'afficher dans la page HTML-------------
