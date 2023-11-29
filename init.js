const PRODUCTS_URL = "https://japceibal.github.io/emercado-api/cats_products/101.json";
const products = [];
let cart = JSON.parse(localStorage.getItem("StorageCart")) || {};

async function getProducts() {
  let response = await fetch(PRODUCTS_URL);
  let result = await response.json();
  return result;
}

function productCard(p) {
  const card = document.createElement("div");
  card.className = "col-md-4"
  card.innerHTML = `
    <div class="card mb-4 shadow-sm custom-card cursor-active"  >
      <img
        class="bd-placeholder-img card-img-top"
        src="${p.image}"
        alt="${p.name}"
      />
      <h3 class="m-3">${p.name}</h3>
      <div class="card-body">
        <p class="card-text">
          ${p.description}<br>
          Precio: ${p.currency} ${p.cost}<br>
          Unidades vendidas: ${p.soldCount}
        </p>
        <a href="#" class="btn btn-primary" onclick="toggleCart('${p.id}')" id="btn-${p.id}">Añadir al carrito</a>
      </div>
    </div>
    `;
  return card;
}

function addToCart(productId) {
  let product = products.find(p => p.id == productId);
  cart[productId] = [product, 1];
  localStorage.setItem("StorageCart", JSON.stringify(cart));
}

function toggleCart(productId) {
  if (cart[productId]) {
    window.location.href = "carrito.html";
  } else {
    addToCart(productId);
    let button = document.querySelector(`#btn-${productId}`);
    button.innerHTML = "Ver Carrito";
    button.className = "btn btn-secondary";
  }
}

document.addEventListener("DOMContentLoaded", () => {
  getProducts().then(result => {
    products.push(...result.products);
    let productsContainer = document.querySelector("#productContainer");
    products.forEach(product => {
      productsContainer.appendChild(productCard(product));
    });
  });
});
