// src/assets/js/g-ventas.js
document.addEventListener('DOMContentLoaded', () => {
  
  // === auth-guard.js (puedes reusarlo en varios bundles) ===
(function() {
  const user = localStorage.getItem('currentUser');
  const loginTime = localStorage.getItem('loginTime');
  const TWO_HOURS = 2 * 60 * 60 * 1000;

  // Si no hay usuario, o expiró la sesión:
  if (
    !user ||
    !loginTime ||
    (Date.now() - parseInt(loginTime, 10) > TWO_HOURS)
  ) {
    // Limpiar y redirigir
    localStorage.removeItem('currentUser');
    localStorage.removeItem('loginTime');
    window.location.href = '/login';
  }
})();

  
    // 1) Recuperar usuario del localStorage
  const stored = localStorage.getItem('currentUser');
  let user = {};
  try {
    user = stored ? JSON.parse(stored) : {};
  } catch {
    console.warn('currentUser no es JSON válido');
  }

  // 2) Sacar nombre (full_name o username)
  const name = user.full_name || user.username || 'Usuario';

  // 3) Inyectar el saludo
  const greet = document.getElementById('userGreeting');
  if (greet) {
    greet.textContent = `Hola ${name}, bienvenido!`;
  }
});
