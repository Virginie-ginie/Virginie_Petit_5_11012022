const confirmation = document.getElementById("limitedWidthBlock")

confirmation.innerHTML =

`<div class="confirmation">
          <p>Commande validée ! Votre numéro de commande est : <span id="orderId"><!-- 65431343444684674 --></span></p>
        </div>`

        localStorage.clear();
        sessionStorage.clear();
