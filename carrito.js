const cart = JSON.parse(localStorage.getItem("StorageCart"));
const cartContainer = document.querySelector("#cartContainer");
const items = document.querySelector("#items");
const total = document.querySelector("#totalPrice");
const factura = document.querySelector("#facturaDiv");

function productRow(product) {
  const row = document.createElement("div");
  row.className = "row mb-4 d-flex justify-content-between align-items-center";
  row.innerHTML = `
      <div class="col-md-2 col-lg-2 col-xl-2">
        <img
          src="${product[0].image}"
          class="img-fluid rounded-3"
          alt="${product[0].name}"
        />
      </div>
      <div class="col-md-3 col-lg-3 col-xl-3">
        <h6 class="text-black mb-0">${product[0].name}</h6>
      </div>
      <div class="col-md-3 col-lg-3 col-xl-2 d-flex">
        <button
          class="btn btn-link px-2"
          onclick="downQuanty(${product[0].id})"
        >
          <i class="fas fa-minus"></i>
        </button>

        <input
          id="form1-${product[0].id}"
          min="0"
          name="quantity"
          value="${product[1]}"
          type="number"
          class="form-control form-control-sm"
          onchange="changeQuanty(${product[0].id}, this.value)"
        />

        <button
          class="btn btn-link px-2"
          onclick="upQuanty(${product[0].id})"
        >
          <i class="fas fa-plus"></i>
        </button>
      </div>
      <div class="col-md-3 col-lg-2 col-xl-2 offset-lg-1">
        <h6 class="mb-0" id="productCost-${product[0].id}">USD ${product[0].cost * product[1]}</h6>
      </div>
      <div class="col-md-1 col-lg-1 col-xl-1 text-end">
        <a href="#!" class="text-muted" onclick="deleteProduct(${product[0].id})"><i class="fas fa-times"></i></a>
      </div>

      <hr class="my-4" />
    `;
  return row;
}

function changeQuanty(productId, quanty) {
  cart[productId][1] = quanty;
  localStorage.setItem("StorageCart", JSON.stringify(cart));
  let productCost = document.querySelector(`#productCost-${productId}`);
  productCost.innerHTML = `USD ${cart[productId][0].cost * quanty}`;
  items.innerHTML = Object.values(cart).reduce((acc, cur) => acc + parseInt(cur[1]), 0);
  total.innerHTML = Object.values(cart).reduce((acc, cur) => acc + cur[0].cost * cur[1], 0);
}

function upQuanty(productId) {
  let input = document.querySelector(`#form1-${productId}`);
  input.stepUp();
  changeQuanty(productId, input.value);
}

function downQuanty(productId) {
  let input = document.querySelector(`#form1-${productId}`);
  input.stepDown();
  changeQuanty(productId, input.value);
}

function deleteProduct(productId) {
  delete cart[productId];
  localStorage.setItem("StorageCart", JSON.stringify(cart));
  items.innerHTML = Object.values(cart).reduce((acc, cur) => acc + parseInt(cur[1]), 0);
  total.innerHTML = Object.values(cart).reduce((acc, cur) => acc + cur[0].cost * cur[1], 0);
  window.location.reload();
}

function showBill() {
  if (!document.querySelector("#clientName").value || !document.querySelector("#clientEmail").value) {
    document.querySelector("#pagarBtn").className = "btn btn-primary disabled";
    factura.innerHTML = `
      <div class="alert alert-danger" role="alert">
        Debe ingresar nombre y email del cliente
      </div>
        `;
    console.log("Debe ingresar nombre y email del cliente");
  } else {
    const client = {
      name: document.querySelector("#clientName").value,
      email: document.querySelector("#clientEmail").value,
    };
    if (document.querySelector("#clientRut").value) {
      client.rut = document.querySelector("#clientRut").value;
    } else {
      client.rut = "Consumidor final";
    }
    document.querySelector("#pagarBtn").className = "btn btn-primary";
    factura.innerHTML = "";
    factura.innerHTML = `
    <div class="d-flex justify-content-between mb-2">
      <h5 class="text-uppercase">Datos cliente</h5>
    </div>
    <div class="container text-center">
      <div class="row">
        <div class="col mark">
          NOMBRE
        </div>
        <div class="col mark">
          RUT
        </div>
        <div class="col mark">
          EMAIL
        </div>
      </div>
      <div class="row">
        <div class="col">
          ${client.name}
        </div>
        <div class="col">
          ${client.rut}
        </div>
        <div class="col">
          ${client.email}
        </div>
      </div>
    </div>
    <hr class="my-4" />
    <div class="d-flex justify-content-between mb-2">
      <h5 class="text-uppercase">Detalle de la compra</h5>
    </div>
    <div class="container text-center">
      <div class="row">
        <div class="col mark">
          CANTIDAD
        </div>
        <div class="col mark">
          PRECIO
        </div>
      <div class="row">
        <div class="col">
          ${Object.values(cart).reduce((acc, cur) => acc + parseInt(cur[1]), 0)} ITEMS
        </div>
        <div class="col">
          USD ${Object.values(cart).reduce((acc, cur) => acc + cur[0].cost * cur[1], 0)}
        </div>
      </div>
    </div>
    `;
    console.log(client);
  }
}
  

document.addEventListener("DOMContentLoaded", () => {
  if (cart) {
    Object.values(cart).forEach(product => {
      cartContainer.appendChild(productRow(product));
    });
  }
  items.innerHTML = Object.values(cart).reduce((acc, cur) => acc + parseInt(cur[1]), 0);
  total.innerHTML = Object.values(cart).reduce((acc, cur) => acc + cur[0].cost * cur[1], 0);
});

