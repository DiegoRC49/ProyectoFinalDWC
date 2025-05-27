const DB_NAME = 'TechTiendaDB';
const STORE_NAME = 'usuarios';

function openDB() {
  return new Promise((resolve, reject) => {
    const request = window.indexedDB.open(DB_NAME, 1);
    request.onerror = () => reject('Error abriendo la base de datos');
    request.onsuccess = () => resolve(request.result);
    request.onupgradeneeded = (e) => {
      const db = e.target.result;
      db.createObjectStore(STORE_NAME, { keyPath: 'id', autoIncrement: true });
    };
  });
}

async function guardarUsuario(usuario) {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, 'readwrite');
    const store = tx.objectStore(STORE_NAME);
    const request = store.add(usuario);

    request.onsuccess = () => resolve(true);
    request.onerror = () => reject('Error guardando usuario');
  });
}


async function buscarUsuarioPorEmail(email) {
  const db = await openDB();
  const tx = db.transaction(STORE_NAME, 'readonly');
  const store = tx.objectStore(STORE_NAME);
  return new Promise((resolve) => {
    store.openCursor().onsuccess = (e) => {
      const cursor = e.target.result;
      if (!cursor) return resolve(null);
      if (cursor.value.email === email) return resolve(cursor.value);
      cursor.continue();
    };
  });
}

export { guardarUsuario, buscarUsuarioPorEmail };

