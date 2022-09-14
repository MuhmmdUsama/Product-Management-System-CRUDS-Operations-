let title = document.getElementById('title'),
  price = document.getElementById('price'),
  taxes = document.getElementById('taxes'),
  ads = document.getElementById('ads'),
  discount = document.getElementById('discount'),
  total = document.getElementById('total'),
  count = document.getElementById('count'),
  category = document.getElementById('category'),
  submit = document.getElementById('submit');

//   Data Storage
let dataProduct = JSON.parse(localStorage.getItem('product')) || [];

//   EventListener
submit.addEventListener('click', submitDataProduct);

//   get Total
function getTotal() {
  if (+price.value != '' && +price.value > +discount.value) {
    let totalResult =
      +price.value + +taxes.value + +ads.value - +discount.value;
    total.innerHTML = totalResult + `جم `;
  } else {
    total.innerHTML = '----';
  }
}

// Create Data
function submitDataProduct() {
  let newProduct = {
    title: title.value,
    price: price.value,
    taxes: taxes.value,
    ads: ads.value,
    discount: discount.value,
    total: total.innerHTML,
    count: count.value,
    category: category.value,
    index: dataProduct.length + 1,
  };

  dataProduct.push(newProduct);
  localStorage.setItem('product', JSON.stringify(dataProduct));
  showDataProduct();
  clearDataInput();
}

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

// Read Data
showDataProduct();
function showDataProduct() {
  let productTable = '';
  dataProduct.forEach((e, index) => {
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
              <td><button id="update" class="bi bi-pencil-square"></button></td>
              <td><button id="delete" class="bi bi-trash" onclick="deleteDataProduct(${index})"></button></td>
        </tr>
    `;
    e.index = index;
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
    <button id="delete-all" class="${value}" >Clear All Data</button>`;

  document.getElementById('delete-all').addEventListener('click', () => {
    // localStorage.clear();
    localStorage.setItem('product', JSON.stringify([]));
    dataProduct.splice(0);
    showDataProduct();
  });
}
