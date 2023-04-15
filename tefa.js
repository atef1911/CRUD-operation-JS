let text = document.getElementById ('text');
let price = document.getElementById ('price');
let taxes = document.getElementById ('taxes');
let ads = document.getElementById ('ads');
let discount = document.getElementById ('discount');
let total = document.getElementById ('total');
let count = document.getElementById ('count');
let category = document.getElementById ('category');
let creat = document.getElementById ('creat');
let mood = creat;
let tmp;

// get total
function getTotal(){
    if(price.value != ''){
        let result = (+price.value + +taxes.value + +ads.value) - +discount.value
        total.innerHTML = result;
        total.style.backgroundColor = 'green'
    }else{
        total.innerHTML = '';
        total.style.backgroundColor = ' #820202'
    }
}

// get creat


let datapro;
if(localStorage.product != null){
    datapro = JSON.parse(localStorage.product)
}else{
    datapro = [];
}
creat.onclick = function(){
        let newPro = {
            text : text.value,
            price : price.value,
            taxes : taxes.value,
            ads : ads.value,
            discount : discount.value,
            total : total.innerHTML,
            count : count.value,
            category : category.value,
        }

        if( mood === creat){
                    if(newPro.count > 1){
            for(let o = 0; o < newPro.count; o++){
            datapro.push(newPro);
            }
            }else{
            datapro.push(newPro);
            }
        }else{
            datapro[tmp] = newPro
            mood = creat ;
            count.style.display = 'block';
            creat.innerHTML = 'CREATE'
        }



        localStorage.setItem('product', JSON.stringify(datapro))
        
        clearData()
        
        showData()
}

// clear data 
function clearData(){
    text.value = '';
    price.value = '';
    taxes.value = '';
    ads.value = '';
    discount.value = '';
    total.innerHTML = '';
    count.value = '';
    category.value = '';
}

// read
function showData()
{
    getTotal()
    let table = '';
    for(let i = 0; i < datapro.length; i++){
    table +=` 
        <tr>
        <td> ${i} </td>
        <td> ${datapro[i].text} </td>
        <td>${datapro[i].price}</td>
        <td>${datapro[i].taxes}</td>
        <td>${datapro[i].ads}</td>
        <td>${datapro[i].discount}</td>
        <td>${datapro[i].total}</td>
        <td>${datapro[i].category}</td>
        <td><button onclick = "updateData(${i})" id="update">UPDATE</button></td>
        <td><button onclick = "deletData(${i})" id="delete">DELETE</button></td>
        </tr>`
    }
    document.getElementById ('tbody').innerHTML = table;

    let btnDeleteAll = document.getElementById ('deleteAll')
    if(datapro.length > 0){
        btnDeleteAll.innerHTML = `<button onclick = "deleteAll()">DELETE ALL ( ${datapro.length} )</button>`
    }else{
        btnDeleteAll.innerHTML = '';
    }

}showData()


// delete
function deletData(i){
    datapro.splice(i,1);
    localStorage.product = JSON.stringify(datapro)
    showData()
}


//delete all
function deleteAll(){
    localStorage.clear()
    datapro.splice (0)
    showData()
}

// update

function updateData(i){
    text.value = datapro[i].text
    price.value = datapro[i].price
    taxes.value = datapro[i].taxes
    ads.value = datapro[i].ads
    discount.value =datapro[i].discount
    category.value = datapro[i].category
    getTotal()
    count.style.display = 'none';
    creat.innerHTML = 'UPDATE';
    mood = 'ubdate';
    tmp = i;
    scroll({
        top:0,
        behavior:'smooth'
    }
        
        
    )
}