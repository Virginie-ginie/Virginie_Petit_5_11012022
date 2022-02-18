

//---------------------- Lire le Local storage pour recuperer le tableau de produit -------------------------------------


//-----------------------j'initialise un tableau qui va acceuillir l'ensemble des articles-------------------------------
let articles = [];


//---------------------- Création d'une fonction qui ajoute chaque element du LocalStorage dans le tableau articles------------
function recupStorage (){

//---------------------- boucle qui envoi les elements dans le tableau articles-------------------------
        for(let i = 0; i < localStorage.length; i++){
           const key = localStorage.key(i);
           let article = JSON.parse(localStorage.getItem(key))
           articles.push(article);    
        }
        console.log(articles);
};
recupStorage()

//---------------------- Faire une boucle pour parcourir le tableau ---------------------
function recupArticle (){

        articles.forEach(kanap => {
                console.log(kanap);

                console.log(kanap.name);

                const cart = `
                <article class="cart__item" data-id="{product-ID}" data-color="{product-color}">
                <div class="cart__item__img">
                  <img src="${kanap.imageUrl}"/>
                </div>
                <div class="cart__item__content">
                  <div class="cart__item__content__description">
                    <h2>${kanap.name}</h2>
                    <p>${kanap.color}</p>
                    <p>${kanap.price}€</p>
                  </div>
                  <div class="cart__item__content__settings">
                    <div class="cart__item__content__settings__quantity">
                      <p>Qté : </p>
                      <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="42">
                    </div>
                    <div class="cart__item__content__settings__delete">
                      <p class="deleteItem">Supprimer</p>
                    </div>
                  </div>
                </div>
              </article>`
              cart__items.innerHTML+=cart;
        })
        
               
        };
        recupArticle()

 //-------------lire l'id dans le tableau-------------------


// ------------j'envoie chaque prix dans le tableau "price" -------------------------------


        //------------- chercher les info dans l'API --------------
     

        //------------- faire le calcul final----------------------
        //------------- modifier la page HTML----------------------

//--------------------- Aprés la boucle ---------------------------

        //---------------- recuperer le total----------------------
       //---------------- l'afficher dans la page HTML-------------
