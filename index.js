import { deleteDataProduct } from './moduls/delete.js';  // eslint-disable-line
import updateDataProduct from './moduls/update.js'; // eslint-disable-line
import searchOnData from './moduls/search.js'; // eslint-disable-line
import showDataProduct from './moduls/read.js'; // eslint-disable-line

export const title = document.getElementById('title'), // eslint-disable-line
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

export let mood = 'creat'; // eslint-disable-line
export let searchMood = 'title'; // eslint-disable-line
export let temp; // eslint-disable-line

// ########################## Data Storage ####
export const dataProduct = JSON.parse(localStorage.getItem('product')) || [];

// ########################## get Total #####
export function getTotal() {
  const totalResult = +price.value + +taxes.value + +ads.value - +discount.value;
  total.innerHTML = totalResult;
}
getTotal();

// ########################## EventListener ####
submit.addEventListener('click', submitDataProduct); // eslint-disable-line

updateDeleteItem.addEventListener('click', (e) => {
  if (e.target.classList.contains('trashBtn')) {
    deleteDataProduct(e.target.accessKey);
  } else if (e.target.classList.contains('updateBtn')) {
    mood = 'update';
    updateDataProduct(e.target.accessKey);
    temp = e.target.accessKey;
  }
});

[searchTitle, searchCategory].forEach((e) => {
  e.addEventListener('click', (e) => {
    switch (e.target) { // eslint-disable-line
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
});

search.onkeyup = () => {
  searchOnData(search.value);
};

[price, taxes, ads, discount].forEach((element) => {
  element.onkeyup = () => {
    getTotal();
  };
});

// ########################## Create Data #####
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

  if (title.value !== '' && price.value !== '' && category.value !== '') {
    // check if create or update mood is On
    if (mood === 'creat') {
      // using count number to create multi products
      if (newProduct.count > 1 && newProduct.count < 100) {
        for (let i = 0; i < newProduct.count; i++) { // eslint-disable-line
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
showDataProduct();

// ########################## Clear Data Input ####
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
