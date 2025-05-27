import Toastify from '../libs/toastify-es.js';

document.addEventListener("DOMContentLoaded", () => {
  mostrarCarrito();
  document.getElementById("vaciarCarrito").addEventListener("click", vaciarCarrito);
});

function mostrarCarrito() {
  const contenedor = document.getElementById("carrito-container");
  const carrito = JSON.parse(localStorage.getItem("carrito")) || [];

  if (carrito.length === 0) {
    contenedor.innerHTML = "<p>Tu carrito está vacío.</p>";
    return;
  }

  contenedor.innerHTML = "";

  carrito.forEach((producto, index) => {
    const div = document.createElement("div");
    div.classList.add("producto");

    div.innerHTML = `
      <img src="${producto.imagen}" alt="${producto.nombre}">
      <h3>${producto.nombre}</h3>
      <p><strong>Precio:</strong> $${producto.precio}</p>
      <p><strong>Características:</strong> ${producto.caracteristicas}</p>
      <button class="btn-eliminar" data-index="${index}">Eliminar</button>
    `;

    contenedor.appendChild(div);
  });

  // Asignar eventos a cada botón Eliminar
  document.querySelectorAll(".btn-eliminar").forEach(btn => {
    btn.addEventListener("click", (e) => {
      const index = parseInt(e.target.getAttribute("data-index"));
      eliminarDelCarrito(index);
    });
  });
}

function eliminarDelCarrito(index) {
  let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
  const eliminado = carrito.splice(index, 1)[0]; // guarda el eliminado
  localStorage.setItem("carrito", JSON.stringify(carrito));
  mostrarCarrito();

  Toastify({
    text: `"${eliminado.nombre}" eliminado del carrito`,
    duration: 2000,
    style: { background: "red" }
  }).showToast();
}

function vaciarCarrito() {
  localStorage.removeItem("carrito");
  mostrarCarrito();

  Toastify({
    text: "Carrito vaciado",
    duration: 2000,
    style: { background: "orange" }
  }).showToast();
}

