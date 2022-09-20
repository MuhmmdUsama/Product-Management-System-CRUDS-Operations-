import {dataProduct,searchMood} from '../index.js'

export function searchOnData(value) {
    // eslint-disable-line
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
                <td><button id="update" class="bi bi-pencil-square updateBtn" accessKey="${index}""></button></td>
                <td><button id="delete" class="bi bi-trash trashBtn" accessKey="${index}"></button></td>
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
          <td><button id="update" class="bi bi-pencil-square updateBtn" accessKey="${index}"></button></td>
          <td><button id="delete" class="bi bi-trash trashBtn" accessKey="${index}"></button></td>
        </tr>
        `;
      }
    });
    document.getElementById('product-tbody').innerHTML = productTable;
  }