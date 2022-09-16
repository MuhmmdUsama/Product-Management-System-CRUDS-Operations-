let title = document.getElementById('title'),
  price = document.getElementById('price'),
  taxes = document.getElementById('taxes'),
  ads = document.getElementById('ads'),
  discount = document.getElementById('discount'),
  total = document.getElementById('total'),
  count = document.getElementById('count'),
  category = document.getElementById('category'),
  submit = document.getElementById('submit');

let mood = 'creat';
let searchMood = 'title';
let temp;

//   Data Storage
let dataProduct = JSON.parse(localStorage.getItem('product')) || [];

//   EventListener
submit.addEventListener('click', submitDataProduct);

//   get Total
function getTotal() {
  let totalResult = +price.value + +taxes.value + +ads.value - +discount.value;
  total.innerHTML = totalResult + `جم `;
}

// Create Data
function submitDataProduct() {
  let newProduct = {
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

  //check if create or update mood is On
  if (
    title.value != '' &&
    price.value != '' &&
    category.value != '' &&
    newProduct.count < 100
  ) {
    if (mood === 'creat') {
      //using count number to create multi products
      if (newProduct.count > 1) {
        for (let i = 0; i < newProduct.count; i++) {
          dataProduct.push(newProduct);
        }
      } else {
        dataProduct.push(newProduct);
      }
      clearDataInput();
    }
  } else {
    dataProduct[temp] = newProduct;
    submit.innerHTML = 'Create';
    count.style.display = 'block';
  }

  localStorage.setItem('product', JSON.stringify(dataProduct));
  showDataProduct();
}

// Read Data
showDataProduct();
function showDataProduct() {
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
              <td><button id="update" class="bi bi-pencil-square" onclick="updateDataProduct(${index})"></button></td>
              <td><button id="delete" class="bi bi-trash" onclick="deleteDataProduct(${index})"></button></td>
        </tr>
    `;
    title.focus();
  });

  document.getElementById('product-tbody').innerHTML = productTable;

  if (dataProduct.length > 0) {
    deleteAllProduct('show');
  } else {
    deleteAllProduct('none');
  }
}

// Delete Data Product
function deleteDataProduct(index) {
  dataProduct.splice(index, 1);
  localStorage.setItem('product', JSON.stringify(dataProduct));
  showDataProduct();
}

// Delete All Data
function deleteAllProduct(value) {
  let deleteAll = document.querySelector('.delete-all');
  deleteAll.innerHTML = `
    <button id="delete-all" class="${value}" >Clear All Data (${dataProduct.length})</button>`;

  document.getElementById('delete-all').addEventListener('click', () => {
    // localStorage.clear();
    localStorage.setItem('product', JSON.stringify([]));
    dataProduct.splice(0);
    showDataProduct();
  });
}

// Update Data
function updateDataProduct(index) {
  title.value = dataProduct[index].title;
  price.value = dataProduct[index].price;
  taxes.value = dataProduct[index].taxes;
  ads.value = dataProduct[index].ads;
  discount.value = dataProduct[index].discount;
  category.value = dataProduct[index].category;
  getTotal();

  count.style.display = 'none';
  submit.innerHTML = 'Update';
  mood = 'update';
  temp = index;

  scroll({
    top: 0,
    behavior: 'smooth',
  });
}

// Clear Data Input
function clearDataInput() {
  // document.querySelector('.inputField').value = ''
  title.value = '';
  price.value = '';
  taxes.value = '';
  ads.value = '';
  discount.value = '';
  total.innerHTML = '';
  count.value = '';
  category.value = '';
}

// Search on Data By title or category
function getSearchMood(id) {
  let search = document.getElementById('search');
  if (id === 'searchTitle') {
    searchMood = 'title';
  } else {
    searchMood = 'category';
  }
  search.value = '';
  showDataProduct();
  search.placeholder = 'search by ' + searchMood;
  search.focus();
}

function searchOnData(value) {
  let productTable = '';
  dataProduct.forEach((e, index) => {
    if (searchMood === 'title') {
      if (dataProduct[index].title.includes(value.toLowerCase())) {
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
              <td><button id="update" class="bi bi-pencil-square" onclick="updateDataProduct(${index})"></button></td>
              <td><button id="delete" class="bi bi-trash" onclick="deleteDataProduct(${index})"></button></td>
        </tr>
    `;
      }
    } else if (dataProduct[index].category.includes(value.toLowerCase())) {
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
        <td><button id="update" class="bi bi-pencil-square" onclick="updateDataProduct(${index})"></button></td>
        <td><button id="delete" class="bi bi-trash" onclick="deleteDataProduct(${index})"></button></td>
      </tr>
      `;
      }
    
  });
  document.getElementById('product-tbody').innerHTML = productTable;
}
