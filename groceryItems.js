let nameEle = document.getElementById("name");
let descEle = document.getElementById("description");
let priceEle = document.getElementById("price");
let quantityEle = document.getElementById("quantity");
let submitButton = document.getElementById("submit");
let formEle = document.getElementById("htmlForm");
let listContainer = document.getElementById("unordered-list");



function displayDetails(obj){
    let name = obj.itemName;
    let desc = obj.description;
    let price = obj.price;
    let quant = obj.quantity;
    let id = obj._id;


    let listEle = document.createElement("li");
    listEle.textContent = name + "  "+desc+"    "+price+"   ";

    let spanEle = document.createElement("span");
    spanEle.textContent = quant;
    listEle.appendChild(spanEle);
    
    let button1 = document.createElement("button");
    button1.textContent = "Buy 1";
    listEle.appendChild(button1);

    let button2 = document.createElement("button");
    button2.textContent = "Buy 2";
    listEle.appendChild(button2);

    let button3 = document.createElement("button");
    button3.textContent = "Buy 3";
    listEle.appendChild(button3);

    listContainer.appendChild(listEle);



    function editDetails(num,spanElement){
        let quantityAvailable = parseInt(quant);
        if(quantityAvailable<num){
            alert("Not Enough Items");
        }
        else{
            quant = (quantityAvailable - num).toString();
            // axios.patch(`https://crudcrud.com/api/386b33aa8fd243bdab996ee1613197fc/groceryBilling/${id}`,{
            //     quantity : p
            // })
            // .then((res)=>console.log(res))
            // .catch((err)=>console.log(err));
            //console.log(p,typeof(p));

            let obj2 = {
                "itemName" : name,
                "description" : desc,
                "price" : price,
                "quantity" : quant
            }

            axios.put(`https://crudcrud.com/api/386b33aa8fd243bdab996ee1613197fc/groceryBilling/${id}`,obj2)
            .then((res)=>spanElement.textContent = quant)
            .catch((err)=>console.log(err));
            
        }

        
    }



    button1.addEventListener("click",()=>{
        let num = 1;
        editDetails(num,spanEle);
    })

    button2.addEventListener("click",()=>{
        let num = 2;
        editDetails(num,spanEle);
    })

    button3.addEventListener("click",()=>{
        let num = 3;
        editDetails(num,spanEle);
    })

}


function extractElements(data){

    for (let i=0;i<data.length;i++){
        displayDetails(data[i]);
    }
}


axios.get('https://crudcrud.com/api/386b33aa8fd243bdab996ee1613197fc/groceryBilling')
        .then((res)=>{
            extractElements(res.data);
        })
        .catch((err)=>{
            console.log(err);
        })


formEle.addEventListener("submit",addDetails);



function addDetails(e){

    e.preventDefault();

    let obj = {
        "itemName" : nameEle.value,
        "description" : descEle.value,
        "price" : priceEle.value,
        "quantity" : quantityEle.value
    }

    // console.log(obj.itemName);
    // console.log(obj);

    axios.post('https://crudcrud.com/api/386b33aa8fd243bdab996ee1613197fc/groceryBilling',obj)
          .then((res)=>{
            displayDetails(res.data);
          })
          .catch((err)=>console.log(err));
}

