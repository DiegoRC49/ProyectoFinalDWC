document.getElementById('formContacto').addEventListener('submit', (e) => {
  e.preventDefault();
  Toastify({
    text: "Mensaje enviado exitosamente",
    duration: 3000,
    gravity: "top",
    position: "center",
    style: { background: "green" }
  }).showToast();

  document.getElementById('formContacto').reset();
});
