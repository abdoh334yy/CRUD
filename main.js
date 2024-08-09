let title = document.getElementById('title');
let price = document.getElementById('price');
let taxes = document.getElementById('taxes');
let ads = document.getElementById('ads');
let discount = document.getElementById('discount');
let total = document.getElementById('total');
let count = document.getElementById('count');
let category = document.getElementById('category');
let submit = document.getElementById('submit');

let mood = 'create';
let nut 

function getTotal()
{
if(price.value != ''){
    let result = (+price.value + +taxes.value + +ads.value) - +discount.value ;
    total.innerHTML = result ;
    total.style.background = '#e9c46a';

}else{
    total.innerHTML = ' '
    total.style.background = '#e0e1dd';
   
}
}
if(localStorage.product != null){
    dataPro = JSON.parse(localStorage.product)
}else {
    dataPro = [];
};



submit.onclick = function (){
    let newPro = {
    title:title.value.toLowerCase(),
    price:price.value,
    taxes:taxes.value,
    ads:ads.value,
    discount:discount.value,
    total:total.innerHTML,
    count:count.value,
    category:category.value.toLowerCase(),

}
if(title.value != ''&& price.value != ''){
   if(mood === 'create'){
   if(newPro.count > 1){
    for(let i = 0; i < newPro.count; i++){
        dataPro.push(newPro);
    }
}else{
    dataPro.push(newPro);
} 
}else {
    dataPro[nut] = newPro;
    mood = 'create';
    submit.innerHTML = 'Create';
    count.style.display = 'block';
}
clearData();
}


localStorage.setItem('product',JSON.stringify(dataPro)) ;
showData();
};

function clearData (){
title.value = '';
price.value = '';
ads.value = '';
discount.value = '';
count.value = '';
category.value = '';
taxes.value = '';
taxes.innerHTML = '';
}

function showData(){
    getTotal();
 let table = '';
 for(let i = 0; i < dataPro.length; i++){
    table += `
    <tr>
            <td>${i+1}</td>
            <td>${dataPro[i].title}</td>
            <td>${dataPro[i].price}</td>
            <td>${dataPro[i].taxes}</td>
            <td>${dataPro[i].ads}</td>
            <td>${dataPro[i].discount}</td>
            <td>${dataPro[i].total}</td>
            <td>${dataPro[i].category}</td>
            <td><button onclick="updateData(${i})" id="update">Update</button></td>
            <td><button onclick="deleteData(${i})" id="delete">Delete</button></td>
    </tr>
    `;
 }
 document.getElementById('tbody').innerHTML = table;
 let bdelete = document.getElementById('deleteAll');
 if(dataPro.length > 0){
bdelete.innerHTML =    `
<button onclick="deleteAll()">Delete All (${dataPro.length})</button>
`
 }else{
    bdelete.innerHTML = '';
 }
} ; 
showData()

function deleteData(i){
dataPro.splice(i,1);
localStorage.product = JSON.stringify(dataPro);
showData();
}
function deleteAll(){
    localStorage.clear();
    dataPro.splice(0);
    showData();
}

function updateData(i){
    title.value = dataPro[i].title;
    price.value = dataPro[i].price;
    taxes.value = dataPro[i].taxes;
    ads.value = dataPro[i].ads;
    discount.value = dataPro[i].discount;
    count.style.display='none' ;
    category.value = dataPro[i].category;
    getTotal();
    submit.innerHTML = 'Update';
    mood = 'update';
    nut = i
    scroll({
        top : 0,
        behavior: "smooth",
    })
    
}

let searchMood = 'title';

function getSearch(id){
    let search = document.getElementById('search')
if(id == 'searchTitle'){
    searchMood = 'Title';
    
}else{
    searchMood = 'Category';
   
}
search.placeholder = 'Search By '+ searchMood;
search.focus()
search.value = '';
showData();
}

function searchData(value){
    let table = '';
    for(let i = 0 ; i < dataPro.length; i++){
if (searchMood == 'title'){
    if(dataPro[i].title.includes(value.toLowerCase())){
        table += `
        <tr>
                <td>${i}</td>
                <td>${dataPro[i].title}</td>
                <td>${dataPro[i].price}</td>
                <td>${dataPro[i].taxes}</td>
                <td>${dataPro[i].ads}</td>
                <td>${dataPro[i].discount}</td>
                <td>${dataPro[i].total}</td>
                <td>${dataPro[i].category}</td>
                <td><button onclick="updateData(${i})" id="update">Update</button></td>
                <td><button onclick="deleteData(${i})" id="delete">Delete</button></td>
        </tr>
        `;

    
}
}else{
    
        if(dataPro[i].category.includes(value.toLowerCase())){
            table += `
            <tr>
                    <td>${i}</td>
                    <td>${dataPro[i].title}</td>
                    <td>${dataPro[i].price}</td>
                    <td>${dataPro[i].taxes}</td>
                    <td>${dataPro[i].ads}</td>
                    <td>${dataPro[i].discount}</td>
                    <td>${dataPro[i].total}</td>
                    <td>${dataPro[i].category}</td>
                    <td><button onclick="updateData(${i})" id="update">Update</button></td>
                    <td><button onclick="deleteData(${i})" id="delete">Delete</button></td>
            </tr>
            `;
    
        }
    
}
    }
document.getElementById('tbody').innerHTML = table;
}

