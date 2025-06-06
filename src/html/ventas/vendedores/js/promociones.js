// Promesa para Google Maps
let mapReady = new Promise(resolve => {
  window.initGoogleMap = resolve;
});

document.addEventListener('DOMContentLoaded', () => {
  const list                = document.getElementById('promosList');
  const searchInput         = document.getElementById('searchInput');
  const btnBack             = document.getElementById('btnBack');

  // Modals y detalles promo
  const detailModal         = document.getElementById('promoDetailModal');
  const detailClose         = document.getElementById('promoDetailClose');
  const detailTitle         = document.getElementById('promoDetailTitle');
  const detailMessage       = document.getElementById('promoDetailMessage');
  const detailImage         = document.getElementById('promoDetailImage');
  const detailTable         = document.getElementById('promoDetailTable');
  const detailMapDiv        = document.getElementById('promoDetailMap');

  // Modal y lista para posibles clientes
  const pcModal             = document.getElementById('possibleClientsModal');
  const pcClose             = document.getElementById('possibleClientsClose');
  const pcList              = document.getElementById('possibleClientsList');

  // 1) Cargo promociones y clientes del CRM
  const promosRaw  = JSON.parse(localStorage.getItem('promociones') || '[]');
  const clientsRaw = JSON.parse(localStorage.getItem('todos_data')  || '[]');

  // 2) Render de promociones
  function renderPromos(items) {
    list.innerHTML = '';
    if (!items.length) {
      list.innerHTML = '<p class="text-center p-4">No hay promociones.</p>';
      return;
    }
    items.forEach((p, idx) => {
      const card = document.createElement('div');
      card.className = 'promo-item';

      const thumb = p.image || 'https://via.placeholder.com/50';
      card.innerHTML = `
        <img src="${thumb}" class="promo-avatar" alt="${p.modelo}" />
        <div class="promo-info">
          <span class="promo-title">${p.modelo} – ${p.tipo}</span><br>
          <span class="promo-meta">
            ${formatDate(p.startDate)}${p.endDate? ' – ' + formatDate(p.endDate): ''}
          </span><br>
          <span class="promo-meta">${p.ubicacion}</span><br>
          <span class="view-clients-badge">Ver posibles clientes</span>
        </div>
        <i class="fa-solid fa-chevron-right promo-arrow"></i>
      `;

      // Flecha: detalle de promoción
      card.querySelector('.promo-arrow').addEventListener('click', e => {
        e.stopPropagation();
        showPromoDetail(p);
      });

      // Badge: posibles clientes
      card.querySelector('.view-clients-badge').addEventListener('click', e => {
        e.stopPropagation();
        showPossibleClients(p);
      });

      list.appendChild(card);
    });
  }
  renderPromos(promosRaw);

  // 3) Buscador con debounce
  let tmr;
  searchInput.addEventListener('input', () => {
    clearTimeout(tmr);
    tmr = setTimeout(() => {
      const q = searchInput.value.trim().toLowerCase();
      renderPromos(
        promosRaw.filter(p =>
          p.modelo.toLowerCase().includes(q) ||
          p.tipo.toLowerCase().includes(q) ||
          p.ubicacion.toLowerCase().includes(q)
        )
      );
    }, 200);
  });

  // 4) Detalle promo (igual que antes)
  function showPromoDetail(p) {
    detailTitle.textContent   = `${p.modelo} – ${p.tipo}`;
    detailMessage.textContent = p.ciudades ? `Ciudades: ${p.ciudades}` : '';
    detailImage.src           = p.image || '';

    // Tabla legible
    const rows = [];
    rows.push({ label:'Ubicación', value:p.ubicacion });
    if (p.startDate || p.endDate) {
      rows.push({ label:'Vigencia', value:
        `${formatDate(p.startDate)}${p.endDate? ' – '+formatDate(p.endDate):''}`
      });
    }
    if (p.radio) {
      rows.push({ label:'Radio (m)', value:Number(p.radio).toLocaleString('es-AR') });
    }
    detailTable.innerHTML = '';
    rows.forEach(r => {
      const tr = document.createElement('tr');
      tr.innerHTML = `<td>${r.label}</td><td>${r.value}</td>`;
      detailTable.appendChild(tr);
    });

   
    detailMapDiv.innerHTML = '';
    mapReady.then(_ => {
      const geo = new google.maps.Geocoder();
      geo.geocode({ address:p.ubicacion }, (res, st) => {
        if (st==='OK'&&res[0]) {
          const map = new google.maps.Map(detailMapDiv, {
            center:res[0].geometry.location, zoom:13
          });
          new google.maps.Marker({ map, position:res[0].geometry.location });
        } else {
          detailMapDiv.innerHTML = `<p style="color:red;">Ubicación no encontrada</p>`;
        }
      });
    });

    detailModal.style.display = 'flex';
  }

  // 5) Posibles clientes
  function showPossibleClients(promo) {
    // 5.a) Extraer ciudades de la promoción
    const cities = (promo.ciudades||'')
      .split(',').map(c=>c.trim().toLowerCase()).filter(Boolean);

    // 5.b) Filtrar clientes cuyo campo Ubicación contenga alguna ciudad
    const filtered = clientsRaw.filter(c => {
      const loc = (c.Ubicación||c.Ubicacion||'').toLowerCase();
      return cities.some(city=> loc.includes(city));
    });

    // 5.c) Renderizar lista idéntica a clientes.html
    pcList.innerHTML = '';
    if (!filtered.length) {
      pcList.innerHTML = '<p class="text-center p-4">No hay clientes en estas ciudades.</p>';
    } else {
      filtered.forEach(c => {
        const name  = c.Nombre || c.Cliente || 'Sin nombre';
        const phone = c.Telefono || c.Teléfono || c.Celular || '—';
        const card = document.createElement('div');
        card.className = 'client-item';
        card.innerHTML = `
          <img src="https://i.pravatar.cc/70?u=${encodeURIComponent(name)}"
               class="client-avatar" alt="${name}" />
          <div class="client-info">
            <span class="client-name">${name}</span>
            <span class="client-phone">
              <i class="fa-solid fa-phone"></i> ${phone}
            </span>
          </div>
          <i class="fa-solid fa-chevron-right client-arrow"></i>
        `;
        // Al click: abrir detalle de cliente en modal padre
        card.querySelector('.client-arrow').addEventListener('click', () => {
          window.parent.openInModal(`detalle_cliente.html?id=${encodeURIComponent(c['Nro Contrato']||c.id)}`);
        });
        pcList.appendChild(card);
      });
    }

    // Mostrar modal
    pcModal.style.display = 'flex';
  }

  // 6) Helpers & cierres
  function formatDate(iso) {
    if (!iso) return '';
    const d = new Date(iso);
    return d.toLocaleDateString('es-AR');
  }

  detailClose.addEventListener('click',   ()=> detailModal.style.display = 'none');
  detailModal.addEventListener('click', e => { if(e.target===detailModal) detailModal.style.display='none'; });

  pcClose.addEventListener('click',       ()=> pcModal.style.display = 'none');
  pcModal.addEventListener('click', e => { if(e.target===pcModal) pcModal.style.display='none'; });

  btnBack.addEventListener('click', e => {
    e.preventDefault();
    const modalEl = window.parent.document.getElementById('contentModal');
    window.parent.bootstrap.Modal.getInstance(modalEl).hide();
  });
});
