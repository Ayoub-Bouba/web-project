let title = document.getElementById('title');
let price = document.getElementById('price');
let taxes = document.getElementById('taxes');
let ads = document.getElementById('ads');
let discount = document.getElementById('discount');
let total = document.getElementById('total');
let count = document.getElementById('count');
let category = document.getElementById('category');
let submit = document.getElementById('submit');

let Stitle = document.getElementById('Stitle');
let Scategory = document.getElementById('Scategory');
let mood='creat'
let tmp;
// get totale
function getTotal(){
    if (price.value != ''){
        let result = (+price.value + +taxes.value + +ads.value) - +discount.value;
        total.innerHTML = result;
        total.style.background = 'green';
    }
    else{
        total.innerHTML = '';
        total.style.background = '#db611a';
    }
}
let setdata;
if(localStorage.setdata != null){
    setdata = JSON.parse(localStorage.setdata)
}else{
    setdata = []
}

submit.onclick = function (){
    let listdata = {
        title:title.value.toLowerCase(),
        price:price.value,
        taxes:taxes.value,
        ads:ads.value,
        discount:discount.value,
        total:total.innerHTML,
        count:count.value,
        category:category.value.toLowerCase(),
    }
    if(title.value !='' && price.value !='' && category.value !='' && listdata.count<100 ){
        if(mood ==='creat'){
           if(listdata.count>1){
               for(let i=0;i<listdata.count;i++){
                    setdata.push(listdata );
           }
           }else{
               setdata.push(listdata);
           }
        }else{
               setdata[tmp] = listdata;
               mood='creat';
               count.style.display='block';
               submit.innerHTML='Create'
        }
        cleardata();
    }
    localStorage.setItem('setdata',JSON.stringify(setdata));
    showData()
}
function cleardata(){
    title.value = '';
    price.value = '';
    taxes.value = '';
    ads.value = '';
    discount.value = '';
    total.innerHTML = '';
    count.value = '';
    category.value = '';
}


function showData(){
    let table = '';
    for (let i = 0; i<setdata.length; i++){
        table += `<tr>
            <td>${i}</td>
            <td>${setdata[i].title}</td>
            <td>${setdata[i].price}</td>
            <td>${setdata[i].taxes}</td>
            <td>${setdata[i].ads}</td>
            <td>${setdata[i].discount}</td>
            <td>${setdata[i].total}</td>
            <td>${setdata[i].category}</td>
            <td><button onclick='updatedata(${i})' id="update">update</button></td>
            <td><button onclick='deleteData(${i})' id="delete">delete</button></td>
        </tr>`;
    }
    
    let deletALL = document.getElementById('deletALL');
    if (setdata.length > 0){
        deletALL.innerHTML = `<button onclick='Deletall()'>Delete All (${setdata.length})</button>`;
    } else {
        deletALL.innerHTML = '';
    }
    document.getElementById('tbody').innerHTML = table;
    getTotal();
}
showData();


function deleteData(i){
     setdata.splice(i,1);
     localStorage.setdata = JSON.stringify(setdata);
     showData();
}
function Deletall(){
    localStorage.clear();
    setdata.splice(0);
    showData();
}
function updatedata(i){
    title.value=setdata[i].title;
    price.value=setdata[i].price;
    taxes.value=setdata[i].taxes;
    ads.value=setdata[i].ads;
    discount.value=setdata[i].discount;
    getTotal();

    count.style.display='none';
    category.value=setdata[i].category;
    submit.innerHTML='Update';
    mood='update';
    tmp=i;
    scroll({
        top:0,
        behavior:'smooth'
    });
}
let searchname='title';
function searchfocus(id){
    let search = document.getElementById('search');
    if(id=='Stitle'){
        searchname='title';
        search.placeholder='Search By Title'
    }else{
        searchname='category';
        search.placeholder='Search By category'
    }
    search.focus();
    search.value='';
    showData();
    
    
}
function searchData(value){
    let table='';
    
        if(searchname == 'title'){
            for(let i=0 ; i< setdata.length ; i++){
                if(setdata[i].title.includes(value.toLowerCase())){
                table += `
                    <tr>
                        <td>${i}</td>
                        <td>${setdata[i].title}</td>
                        <td>${setdata[i].price}</td>
                        <td>${setdata[i].taxes}</td>
                        <td>${setdata[i].ads}</td>
                        <td>${setdata[i].discount}</td>
                        <td>${setdata[i].total}</td>
                        <td>${setdata[i].category}</td>
                        <td><button onclick='updatedata(${i})' id="update">update</button></td>
                        <td><button onclick='deleteData(${i})' id="delete">delete</button></td>
                    </tr>
                    `
               }
            }
        }
        
        else{
            for(let i=0;i<setdata.length;i++){
                if(setdata[i].category.includes(value.toLowerCase())){
                  table += `
                      <tr>
                          <td>${i}</td>
                          <td>${setdata[i].title}</td>
                          <td>${setdata[i].price}</td>
                          <td>${setdata[i].taxes}</td>
                          <td>${setdata[i].ads}</td>
                          <td>${setdata[i].discount}</td>
                          <td>${setdata[i].total}</td>
                          <td>${setdata[i].category}</td>
                          <td><button onclick='updatedata(${i})' id="update">update</button></td>
                          <td><button onclick='deleteData(${i})' id="delete">delete</button></td>
                      </tr>
                      `
               }
            }
        }
    
    document.getElementById('tbody').innerHTML=table;

}
