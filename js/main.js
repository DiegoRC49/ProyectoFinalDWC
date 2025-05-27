import Toastify from '../libs/toastify-es.js';
import { obtenerUsuarioLogeado } from './auth.js';

document.addEventListener('DOMContentLoaded', () => {
  const user = obtenerUsuarioLogeado();
  const userSpan = document.getElementById('userName');
  const loginLink = document.getElementById('loginLink');
  const logoutBtn = document.getElementById('logoutBtn');

  if (user) {
    userSpan.textContent = `Hola, ${user.nombre}`;
    if (loginLink) loginLink.style.display = 'none';
    if (logoutBtn) logoutBtn.style.display = 'inline-block';
  }

  if (logoutBtn) {
    logoutBtn.addEventListener('click', () => {
      localStorage.removeItem('usuarioLogeado');

      Toastify({
        text: "Sesión cerrada con éxito",
        duration: 3000,
        gravity: "top",
        position: "center",
        style: {
          background: "linear-gradient(to right, #ff416c, #ff4b2b)"
        }
      }).showToast();

      setTimeout(() => location.reload(), 1500);
    });
  }
});
