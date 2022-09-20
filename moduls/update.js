import {// eslint-disable-line
  dataProduct,
  getTotal,
  title,
  price,
  taxes,
  ads,
  discount,
  category,
  count,
  submit,
} from '../index.js';

// Update Data
export default function updateDataProduct(index) {
  title.value = dataProduct[index].title;
  price.value = dataProduct[index].price;
  taxes.value = dataProduct[index].taxes;
  ads.value = dataProduct[index].ads;
  getTotal();
  discount.value = dataProduct[index].discount;
  category.value = dataProduct[index].category;

  count.style.display = 'none';
  submit.innerHTML = 'Update';

  scroll({ // eslint-disable-line
    top: 0,
    behavior: 'smooth',
  });
}
