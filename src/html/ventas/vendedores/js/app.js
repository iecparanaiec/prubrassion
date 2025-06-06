// src/html/ventas/vendedores/js/app.js

document.addEventListener('DOMContentLoaded', () => {
  // ——————————————————————————————————————————————————————————————
  // 1) Mostrar nombre real del usuario que inició sesión
  // ——————————————————————————————————————————————————————————————
  const storedUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
  const greetSpan  = document.querySelector('.user-greet');
  if (greetSpan) {
    const name = storedUser.full_name || storedUser.username || 'Usuario';
    greetSpan.textContent = `Hola, ${name}`;
  }

  // ——————————————————————————————————————————————————————————————
  // 2) Modal Bootstrap
  // ——————————————————————————————————————————————————————————————
  const modalEl = document.getElementById("contentModal");
  const modal   = new bootstrap.Modal(modalEl);
  const iframe  = document.getElementById("modalFrame");
  function openInModal(url) {
    iframe.src = url;
    modal.show();
  }

  // Delegación: cualquier elemento con [data-url]
  document.addEventListener("click", (e) => {
    const t = e.target.closest("[data-url]");
    if (!t) return;
    e.preventDefault();
    openInModal(t.getAttribute("data-url"));
  });

  // ——————————————————————————————————————————————————————————————
  // 3) Badge de notificaciones
  // ——————————————————————————————————————————————————————————————
  document.getElementById("btnNotify").addEventListener("click", () => {
    const b = document.querySelector("#btnNotify .badge");
    b?.remove();
  });

  // ——————————————————————————————————————————————————————————————
  // 4) Slider automático + manual
  // ——————————————————————————————————————————————————————————————
  const track      = document.querySelector('.slider-track');
  const slides     = Array.from(track.children);
  let currentIndex = 0;
  const slideCount = slides.length;
  const nextBtn    = document.querySelector('.slider-nav.next');
  const prevBtn    = document.querySelector('.slider-nav.prev');

  function goToSlide(idx) {
    track.style.transform = `translateX(-${100 * idx}%)`;
    currentIndex = idx;
  }

  nextBtn.addEventListener('click', () => {
    goToSlide((currentIndex + 1) % slideCount);
  });
  prevBtn.addEventListener('click', () => {
    goToSlide((currentIndex - 1 + slideCount) % slideCount);
  });

  // Auto-slide cada 4 segundos
  setInterval(() => {
    goToSlide((currentIndex + 1) % slideCount);
  }, 4000);
});
