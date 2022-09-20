import {dataProduct,getTotal} from '../index.js'

// Update Data
export function updateDataProduct(index) {
    // eslint-disable-line
    title.value = dataProduct[index].title;
    price.value = dataProduct[index].price;
    taxes.value = dataProduct[index].taxes;
    ads.value = dataProduct[index].ads;
    getTotal();
    discount.value = dataProduct[index].discount;
    category.value = dataProduct[index].category;
  
    count.style.display = 'none';
    submit.innerHTML = 'Update';
  
    scroll({
      // eslint-disable-line
      top: 0,
      behavior: 'smooth',
    });
  }