document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll('.nav-link');
  
    // Detecta qué pestaña está activa por la URL actual
    const currentPath = window.location.pathname;
    navLinks.forEach(link => {
      const href = link.getAttribute('href');
      if (currentPath.includes(href)) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  });
  