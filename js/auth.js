import Toastify from '../libs/toastify-es.js';
import { guardarUsuario, buscarUsuarioPorEmail } from './indexeddb.js';

function encriptar(texto) {
  return btoa(texto);
}

async function registrarUsuario(nombre, email, password) {
  const usuarioExistente = await buscarUsuarioPorEmail(email);
  if (usuarioExistente) {
    Toastify({
      text: "Email ya registrado",
      duration: 3000,
      style: { background: "red" }
    }).showToast();
    return;
  }

  const usuario = {
    nombre,
    email,
    contraseñaEncriptada: encriptar(password)
  };

  await guardarUsuario(usuario);

  Toastify({
    text: "Registro exitoso",
    duration: 3000,
    style: { background: "green" }
  }).showToast();

  setTimeout(() => window.location.href = "login.html", 1500);
}

async function loginUsuario(email, password) {
  const usuario = await buscarUsuarioPorEmail(email);
  if (!usuario || usuario.contraseñaEncriptada !== encriptar(password)) {
    Toastify({
      text: "Credenciales inválidas",
      duration: 3000,
      style: { background: "red" }
    }).showToast();
    return;
  }

  localStorage.setItem("usuarioLogeado", JSON.stringify(usuario));

  Toastify({
    text: "Bienvenido " + usuario.nombre,
    duration: 3000,
    style: { background: "green" }
  }).showToast();

  setTimeout(() => window.location.href = "index.html", 1500);
}

function obtenerUsuarioLogeado() {
  return JSON.parse(localStorage.getItem("usuarioLogeado"));
}

export { registrarUsuario, loginUsuario, obtenerUsuarioLogeado };
