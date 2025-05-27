import Toastify from '../libs/toastify-es.js';

async function cargarProductos() {
  try {
    const res = await fetch('../data/productos.json'); // Ajusta la ruta si es necesario
    const productos = await res.json();

    const contenedor = document.getElementById("productos-container");
    contenedor.innerHTML = "";

    productos.forEach(producto => {
      const div = document.createElement("div");
      div.classList.add("producto");

      div.innerHTML = `
        <img src="${producto.imagen}" alt="${producto.nombre}">
        <h3>${producto.nombre}</h3>
        <p><strong>Precio:</strong> $${producto.precio}</p>
        <p><strong>Características:</strong> ${producto.caracteristicas}</p>
        <button class="btn-agregar">Agregar al carrito</button>
      `;

      const boton = div.querySelector(".btn-agregar");
      boton.addEventListener("click", () => agregarAlCarrito(producto.id));

      contenedor.appendChild(div);
    });

    // Guarda productos en localStorage para acceso rápido
    localStorage.setItem("productos", JSON.stringify(productos));

  } catch (error) {
    console.error("Error al cargar productos:", error);
  }
}

function agregarAlCarrito(id) {
  const productos = JSON.parse(localStorage.getItem("productos")) || [];
  const producto = productos.find(p => p.id === id);
  const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
  carrito.push(producto);
  localStorage.setItem("carrito", JSON.stringify(carrito));

  Toastify({
    text: "Producto agregado al carrito",
    duration: 2000,
    style: { background: "green" }
  }).showToast();
}

document.addEventListener("DOMContentLoaded", cargarProductos);
