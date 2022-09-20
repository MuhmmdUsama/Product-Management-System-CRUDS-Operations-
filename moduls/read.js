import {dataProduct} from '../index.js'
import {deleteAllProduct} from './delete.js'

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