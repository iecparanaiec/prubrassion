// Espera a que Google Maps llame initGoogleMap()
let mapReady = new Promise(resolve => {
    window.initGoogleMap = resolve;
  });
  
  document.addEventListener('DOMContentLoaded', () => {
    const clientsList   = document.getElementById('clientsList');
    const searchInput   = document.getElementById('searchInput');
    const btnBack       = document.getElementById('btnBack');
    const detailModal   = document.getElementById('clientDetailModal');
    const detailClose   = document.getElementById('detailClose');
    const detailName    = document.getElementById('detailName');
    const detailTable   = document.getElementById('detailTable');
    const detailMapDiv  = document.getElementById('detailMap');
  
    // 1) Carga datos desde localStorage
    const raw = localStorage.getItem('todos_data');
    const clients = raw ? JSON.parse(raw) : [];
  
    // 2) Función para crear tarjeta
    function createCard(data, idx) {
      const card = document.createElement('div');
      card.className = 'client-item';
      card.dataset.index = idx;
  
      card.innerHTML = `
        <img src="https://i.pravatar.cc/70?u=${idx}" class="client-avatar"/>
        <div class="client-info">
          <span class="client-name">${data.Nombre||data.Cliente||''}</span>
          <span class="client-phone">
            <i class="fa-solid fa-phone"></i>
            ${data.Teléfono||data.Telefono||data.Celular||''}
          </span>
        </div>
        <i class="fa-solid fa-chevron-right client-arrow"></i>
      `;
  
      // Al hacer clic en la flecha
      card.querySelector('.client-arrow').addEventListener('click', e => {
        e.stopPropagation();
        showDetail(data);
      });
  
      return card;
    }
  
    // 3) Render inicial
    function renderAll(list) {
      clientsList.innerHTML = '';
      list.forEach((c, i) => {
        clientsList.appendChild(createCard(c, i));
      });
    }
    renderAll(clients);
  
    // 4) Búsqueda en vivo: filtra tarjetas existentes
    searchInput.addEventListener('input', () => {
      const q = searchInput.value.trim().toLowerCase();
      document.querySelectorAll('.client-item').forEach((card, i) => {
        const name  = card.querySelector('.client-name').textContent.toLowerCase();
        const phone = card.querySelector('.client-phone').textContent.toLowerCase();
        card.style.display = (name.includes(q) || phone.includes(q)) ? '' : 'none';
      });
    });
  
    // 5) Función para mostrar detalle + mapa
    function showDetail(data) {
      detailName.textContent = data.Nombre||data.Cliente||'Ficha cliente';
      // Tabla
      detailTable.innerHTML = '';
      Object.entries(data).forEach(([k,v]) => {
        const tr = document.createElement('tr');
        tr.innerHTML = `<td>${k}</td><td>${v}</td>`;
        detailTable.appendChild(tr);
      });
      // Mapa
      detailMapDiv.innerHTML = '';
      mapReady.then(() => {
        const geocoder = new google.maps.Geocoder();
        geocoder.geocode({ address: data.Ubicación||data.Ubicacion||'' }, (res, st) => {
          if (st==='OK' && res[0]) {
            const map = new google.maps.Map(detailMapDiv, {
              center: res[0].geometry.location,
              zoom: 14
            });
            new google.maps.Marker({ map, position: res[0].geometry.location });
          } else {
            detailMapDiv.innerHTML = '<p style="color:red;">Dirección no encontrada</p>';
          }
        });
      });
      detailModal.style.display = 'flex';
    }
  
    // 6) Cerrar detalle-modal
    detailClose.addEventListener('click', () => detailModal.style.display='none');
    detailModal.addEventListener('click', e => {
      if (e.target===detailModal) detailModal.style.display='none';
    });
  
    // 7) Cerrar modal padre
    btnBack.addEventListener('click', e => {
      e.preventDefault();
      const modalEl = window.parent.document.getElementById('contentModal');
      window.parent.bootstrap.Modal.getInstance(modalEl).hide();
    });
  });
  