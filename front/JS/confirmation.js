
// ---------------- on recuperer le numéro de commande dans la sessionStorage-------------------------

let numberCommande = sessionStorage.getItem('order')


const confirmation = document.getElementById("limitedWidthBlock")

confirmation.innerHTML =

`<div class="confirmation">
          <p>Commande validée ! Votre numéro de commande est : <span id="orderId">${numberCommande}</span></p>
        </div>`

        localStorage.clear();
        sessionStorage.clear();
