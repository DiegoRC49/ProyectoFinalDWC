import { registrarUsuario } from './auth.js';

document.getElementById('registroForm').addEventListener('submit', (e) => {
  e.preventDefault();
  const nombre = document.getElementById('nombre').value;
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  registrarUsuario(nombre, email, password);
});
