import { loginUsuario } from './auth.js';

document.getElementById('loginForm').addEventListener('submit', (e) => {
  e.preventDefault();
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  loginUsuario(email, password);
});
