import {deleteAllProduct,deleteDataProduct} from './moduls/delete.js'
import {updateDataProduct} from './moduls/update.js'
import {searchOnData} from './moduls/search.js'

const title = document.getElementById('title'), // eslint-disable-line
  price = document.getElementById('price'),
  taxes = document.getElementById('taxes'),
  ads = document.getElementById('ads'),
  discount = document.getElementById('discount'),
  total = document.getElementById('total'),
  count = document.getElementById('count'),
  category = document.getElementById('category'),
  submit = document.getElementById('submit'),
  updateDeleteItem = document.querySelector('.product-tbody'),
  search = document.getElementById('search'),
  searchTitle = document.getElementById('searchTitle'),
  searchCategory = document.getElementById('searchCategory');

export let mood = 'creat';
export let searchMood = 'title';
export let temp;

//   Data Storage
export const dataProduct = JSON.parse(localStorage.getItem('product')) || [];

//   EventListener
submit.addEventListener('click', submitDataProduct); // eslint-disable-line

updateDeleteItem.addEventListener('click', (e) => {
  if (e.target.classList.contains('trashBtn')) {
    deleteDataProduct(e.target.accessKey);
  } else if (e.target.classList.contains('updateBtn')) {
    mood = 'update'
    updateDataProduct(e.target.accessKey);
    temp = e.target.accessKey;
  }
});

[searchTitle,searchCategory].forEach((e)=>{
  e.addEventListener('click', (e) => {
    // e.target = title;
    switch (e.target) {
      case searchTitle:
        searchMood = 'title';
        search.focus();
        break;
      case searchCategory:
        searchMood = 'category';
        search.focus();
        break;
    }
    search.value = '';
    showDataProduct();
    search.placeholder = `search by  ${searchMood}`;
  });
})

search.onkeyup = () => {
  searchOnData(search.value);
};

[price, taxes, ads, discount].forEach((element) => {
  element.onkeyup = () => {
    getTotal();
  };
});

//   get Total
export function getTotal() {
  const totalResult =
    +price.value + +taxes.value + +ads.value - +discount.value;
  total.innerHTML = totalResult;
}
getTotal();

// // Create Data
function submitDataProduct() {
  const newProduct = {
    title: title.value.toLowerCase(),
    price: price.value,
    taxes: taxes.value,
    ads: ads.value,
    discount: discount.value,
    total: total.innerHTML,
    count: count.value,
    category: category.value.toLowerCase(),
    index: dataProduct.length + 1,
  };

  // check if create or update mood is On
  if (title.value !== '' && price.value !== '' && category.value !== '') {
    if (mood === 'creat') {
      // using count number to create multi products
      if (newProduct.count > 1 && newProduct.count < 100) {
        for (let i = 0; i < newProduct.count; i++) {
          // eslint-disable-line
          dataProduct.push(newProduct);
        }
      } else {
        dataProduct.push(newProduct);
      }
    } else {
      dataProduct[temp] = newProduct;
      submit.innerHTML = 'Create';
      count.style.display = 'block';
      mood = 'creat';
      getTotal();
    }
    clearDataInput(); // eslint-disable-line
  }
  localStorage.setItem('product', JSON.stringify(dataProduct));
  showDataProduct(); // eslint-disable-line
  title.focus();
}

// Read Data
export function showDataProduct() {
  let productTable = '';
  dataProduct.forEach((e, index) => {
    e.index = index;
    productTable += `
         <tr>
              <td id = "td-id">${index + 1}</td>
              <td>${e.title}</td>
              <td>${e.price}</td>
              <td>${e.taxes}</td>
              <td>${e.ads}</td>
              <td>${e.discount}</td>
              <td>${e.total}</td>
              <td>${e.category}</td>
              <td><button id="update" class="bi bi-pencil-square updateBtn" accessKey="${index}"></button></td>
              <td><button id="delete" class="bi bi-trash trashBtn" accessKey="${index}"></button></td>
        </tr>
    `;
  });

  document.getElementById('product-tbody').innerHTML = productTable;

  if (dataProduct.length > 0) {
    deleteAllProduct('show'); // eslint-disable-line
  } else {
    deleteAllProduct('none'); // eslint-disable-line
  }
}
showDataProduct();

// Delete Data Product
// function deleteDataProduct(index) {
//   // eslint-disable-line
//   dataProduct.splice(index, 1);
//   localStorage.setItem('product', JSON.stringify(dataProduct));
//   showDataProduct();
// }

// Delete All Data
// function deleteAllProduct(value) {
//   // eslint-disable-line
//   const deleteAll = document.querySelector('.delete-all');
//   deleteAll.innerHTML = `
//     <button id="delete-all" class="${value}" >Clear All Data (${dataProduct.length})</button>`;

//   document.getElementById('delete-all').addEventListener('click', () => {
//     localStorage.setItem('product', JSON.stringify([]));
//     dataProduct.splice(0);
//     showDataProduct();
//   });
// }

// // Update Data
// function updateDataProduct(index) {
//   // eslint-disable-line
//   title.value = dataProduct[index].title;
//   price.value = dataProduct[index].price;
//   taxes.value = dataProduct[index].taxes;
//   ads.value = dataProduct[index].ads;
//   getTotal();
//   discount.value = dataProduct[index].discount;
//   category.value = dataProduct[index].category;

//   count.style.display = 'none';
//   submit.innerHTML = 'Update';
//   mood = 'update';
//   temp = index;

//   scroll({
//     // eslint-disable-line
//     top: 0,
//     behavior: 'smooth',
//   });
// }

// Clear Data Input
function clearDataInput() {
  title.value = '';
  price.value = '';
  taxes.value = '';
  ads.value = '';
  discount.value = '';
  total.innerHTML = '';
  count.value = '';
  category.value = '';
}

// function searchOnData(value) {
//   // eslint-disable-line
//   let productTable = '';
//   dataProduct.forEach((e, index) => {
//     if (searchMood === 'title') {
//       if (dataProduct[index].title.includes(value.toLowerCase())) {
//         productTable += `
//          <tr>
//               <td id = "td-id">${index + 1}</td>
//               <td>${e.title}</td>
//               <td>${e.price}</td>
//               <td>${e.taxes}</td>
//               <td>${e.ads}</td>
//               <td>${e.discount}</td>
//               <td>${e.total}</td>
//               <td>${e.category}</td>
//               <td><button id="update" class="bi bi-pencil-square" accessKey="${index}""></button></td>
//               <td><button id="delete" class="bi bi-trash" accessKey="${index}"></button></td>
//         </tr>
//     `;
//       }
//     } else if (dataProduct[index].category.includes(value.toLowerCase())) {
//       productTable += `
//         <tr>
//         <td id = "td-id">${index + 1}</td>
//         <td>${e.title}</td>
//         <td>${e.price}</td>
//         <td>${e.taxes}</td>
//         <td>${e.ads}</td>
//         <td>${e.discount}</td>
//         <td>${e.total}</td>
//         <td>${e.category}</td>
//         <td><button id="update" class="bi bi-pencil-square" accessKey="${index}"></button></td>
//         <td><button id="delete" class="bi bi-trash" accessKey="${index}"></button></td>
//       </tr>
//       `;
//     }
//   });
//   document.getElementById('product-tbody').innerHTML = productTable;
// }
