// public/js/login.js  (src/assets/js/login.js)

window.addEventListener('load', () => {
  const splash = document.getElementById('splash');
  const loginContainer = document.getElementById('loginContainer');
  setTimeout(() => {
    splash.style.display = 'none';
    loginContainer.classList.add('show');
    document.body.style.overflow = 'auto';
  }, 2800);
});

// ‑‑‑‑ Variables del DOM
const loginForm      = document.getElementById('loginForm');
const loadingOverlay = document.getElementById('loading');

// ‑‑‑‑ Submit Login
loginForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  loadingOverlay.classList.add('active');

  const username = document.getElementById('loginUsername').value.trim();
  const password = document.getElementById('loginPassword').value.trim();

  try {
    const res = await fetch('/api/login', {
      method : 'POST',
      headers: { 'Content-Type': 'application/json' },
      body   : JSON.stringify({ username, password })
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);

    /* ---------------   NUEVO   ----------------- */
    const { success, user } = await res.json();      // back‑end devuelve { success, user:{id,username,full_name,role} }
    console.log('Login result:', { success, user });
    /* ------------------------------------------- */

    if (!success) {
      alert('Usuario o contraseña incorrectos');
      return;
    }

    /* Guardamos usuario para que cualquier página pueda leerlo */
    localStorage.setItem('currentUser', JSON.stringify(user));

    /* Normalizamos rol para decidir redirección */
    const key = (user.role || '').toString().trim().toLowerCase();

    if (key === 'vendedor') {
      window.location.href = '/ventas/vendedores/index.html';
    } else if (key === 'gerente ventas') {
      window.location.href = '/ventas/index.html';
    } else if (key === 'área técnica' || key === 'area tecnica') {
      window.location.href = '/area_tecnica/index.html';
    } else {
      window.location.href = '/tablero.html';     // ruta por defecto
    }

  } catch (err) {
    console.error('Login fetch error:', err);
    alert('Error de conexión con el servidor');
  } finally {
    loadingOverlay.classList.remove('active');
  }
});

/* ‑‑‑‑ Enlace “Olvidé contraseña” */
const forgotLink = document.getElementById('forgotLink');
forgotLink.addEventListener('click', (e) => {
  e.preventDefault();
  window.location.href = '/forgot-password.html';
});
