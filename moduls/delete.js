import { dataProduct } from '../index.js'; // eslint-disable-line
import showDataProduct from './read.js'; // eslint-disable-line

// Delete Data Product
export function deleteDataProduct(index) {
  dataProduct.splice(index, 1);
  localStorage.setItem('product', JSON.stringify(dataProduct));
  showDataProduct();
}

// Delete All Data
export function deleteAllProduct(value) {
  const deleteAll = document.querySelector('.delete-all');
  deleteAll.innerHTML = `
      <button id="delete-all" class="${value}" >Clear All Data (${dataProduct.length})</button>`;

  document.getElementById('delete-all').addEventListener('click', () => {
    localStorage.setItem('product', JSON.stringify([]));
    dataProduct.splice(0);
    showDataProduct();
  });
}
