 let kanapData = [];
 
 const fetchKanap = () => {
 fetch("http://localhost:3000/api/products")
    .then((res) => res.json())
    .then((data) => console.log(data));
 };

const kanapDisplay = async () => {
   await fetchKanap();

   document. getElementsByClassName('items').innerHTML = kanapData.map((kanap) =>`
   <div id="items${kanap._id}"item article">
   <h3> class"productName">${kanap.name}>/h3>

   </div>
   
   `)
};

kanapDisplay();
   

