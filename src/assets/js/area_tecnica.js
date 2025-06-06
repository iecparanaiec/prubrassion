// src/assets/js/area_tecnica.js
console.log("🔔 area_tecnica.js cargado");

document.addEventListener('DOMContentLoaded', async () => {
  // Clientes y Servicios siguen en localStorage
  const clients  = JSON.parse(localStorage.getItem('clientesData')  || '[]');
  const services = JSON.parse(localStorage.getItem('services')     || '[]');

  // Turnos y asignaciones vienen de la API
  let appts = [];
  let mats  = [];
  let calendar;



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


  // --- Carga inicial de datos desde el servidor ---
  console.log("📡 Llamando a GET /api/appointments y /api/material_assignments");
  try {
    const [respAppts, respMats] = await Promise.all([
      fetch('/api/appointments'),
      fetch('/api/material_assignments')
    ]);
    if (!respAppts.ok) throw new Error('No se pudieron cargar los turnos');
    if (!respMats.ok) throw new Error('No se pudieron cargar las asignaciones');
    appts = await respAppts.json();
    mats  = await respMats.json();
  } catch (err) {
    alert(err.message);
    return;
  }

  // --- Modal de Cálculos ---
  const modalCalc = new bootstrap.Modal(document.getElementById('modalCalc'));
  document.getElementById('openCalc').onclick = () => modalCalc.show();
  document.getElementById('calcBtn').onclick = e => {
    e.preventDefault();
    const area = parseFloat(document.getElementById('inpArea').value) || 0;
    const v = [
      area,
      Math.ceil(area * 56),
      Math.ceil(area * 13/50),
      Math.ceil(area * 0.085),
      Math.ceil(area * 15/40),
      Math.ceil(area * 0.2)
    ];
    ['oArea','oBricks','oCement','oSand','oPlasticor','oIron']
      .forEach((id,i) => document.getElementById(id).innerText = v[i]);
    document.getElementById('selCalcClient').innerHTML =
      clients.map((c,i) => `<option value="${i}">${c.nombre}</option>`).join('');
  };

  document.getElementById('assignBtn').onclick = async () => {
    const clientIndex = +document.getElementById('selCalcClient').value;
    const payload = {
      client_index: clientIndex,
      area:       +document.getElementById('oArea').innerText,
      bricks:     +document.getElementById('oBricks').innerText,
      cement:     +document.getElementById('oCement').innerText,
      sand:       +document.getElementById('oSand').innerText,
      plasticor:  +document.getElementById('oPlasticor').innerText,
      iron:       +document.getElementById('oIron').innerText
    };
    try {
      const res = await fetch('/api/material_assignments', {
        method: 'POST',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify(payload)
      });
      if (!res.ok) throw new Error(`Error ${res.status}`);
      const newMat = await res.json();
      mats.unshift(newMat);
  
      // ←── AÑADE ESTAS LÍNEAS justo aquí ──→
      // Guardar el cálculo en localStorage para que clientes1.html lo detecte
      localStorage.setItem(
        'materials_' + clientIndex,
        JSON.stringify({
          area:      payload.area,
          bricks:    payload.bricks,
          cement:    payload.cement,
          sand:      payload.sand,
          plasticor: payload.plasticor,
          iron:      payload.iron
        })
      );
      // (Opcional) notificar a otras pestañas/frames de este cambio
      window.dispatchEvent(new Event('storage'));
      // ←──────────────────────────────────────→
  
      modalCalc.hide();
    } catch (err) {
      alert('Error al asignar materiales: ' + err.message);
    }
  };
  

  // --- Gestión de Servicios (sin cambio) ---
  const formService  = document.getElementById('formService'),
        svcNameInput = document.getElementById('svcName'),
        svcDescInput = document.getElementById('svcDesc'),
        svcTableBody = document.getElementById('svcTable');
  let svcList = services; // alias

  function renderServices() {
    svcTableBody.innerHTML = '';
    svcList.forEach(s => {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td>${s.id}</td>
        <td>${s.name}</td>
        <td>${s.desc}</td>
        <td>
          <button class="btn btn-sm btn-light me-1 edit-btn" data-id="${s.id}"><i class="fas fa-edit"></i></button>
          <button class="btn btn-sm btn-danger del-btn" data-id="${s.id}"><i class="fas fa-trash"></i></button>
        </td>`;
      svcTableBody.appendChild(tr);
    });
    localStorage.setItem('services', JSON.stringify(svcList));
    populateSelects();
  }
  formService.addEventListener('submit', e => {
    e.preventDefault();
    const name = svcNameInput.value.trim(),
          desc = svcDescInput.value.trim();
    if (!name) return;
    const nextId = svcList.length ? Math.max(...svcList.map(x=>x.id))+1 : 1;
    svcList.push({ id: nextId, name, desc });
    renderServices();
    formService.reset();
  });
  svcTableBody.addEventListener('click', e => {
    const btn = e.target.closest('button');
    if (!btn) return;
    const id = +btn.dataset.id;
    if (btn.classList.contains('edit-btn')) {
      const s = svcList.find(x=>x.id===id);
      const nn = prompt('Nuevo nombre de servicio', s.name);
      if (nn!=null) s.name = nn.trim();
      const nd = prompt('Nueva descripción', s.desc);
      if (nd!=null) s.desc = nd.trim();
      renderServices();
    }
    if (btn.classList.contains('del-btn') && confirm('¿Eliminar servicio?')) {
      svcList = svcList.filter(x=>x.id!==id);
      renderServices();
    }
  });
  renderServices();

  // --- Poblar selects de cliente y servicio ---
  function populateSelects() {
    document.querySelectorAll('#selTurnoClient,#dayModalClient,#editAppointmentClient')
      .forEach(sel => {
        sel.innerHTML = clients.map((c,i)=>`<option value="${i}">${c.nombre}</option>`).join('');
      });
    document.querySelectorAll('#selTurnoService,#dayModalService,#editAppointmentService')
      .forEach(sel => {
        sel.innerHTML = svcList.map(s=>`<option value="${s.id}">${s.name}</option>`).join('');
      });
  }
  populateSelects();

  // --- Render Turnos de Hoy ---
  const todayList = document.getElementById('todayAppointments');
  function renderToday() {
    const today = new Date().toISOString().split('T')[0];
    const html = appts
      .filter(a =>
        a.appointment_date.split('T')[0] === today &&
        clients[a.client_index] !== undefined
      )
      .map(a => {
        const c   = clients[a.client_index];
        const srv = svcList.find(s => s.id === a.service_id) || {};
        return `
          <li class="list-group-item d-flex justify-content-between">
            ${a.appointment_time} – ${c.nombre} (${srv.name || '—'})
            <button class="btn btn-sm btn-light" onclick="openEdit(${a.id})">
              <i class="fas fa-edit"></i>
            </button>
          </li>
        `;
      })
      .join('');

    document.getElementById('todayAppointments').innerHTML = html;
  }
  renderToday();

  // --- Inicializar FullCalendar con fuente dinámica ---
  function initCalendar() {
    if (calendar) return;

    calendar = new FullCalendar.Calendar(
      document.getElementById('calendar'),
      {
        initialView: 'dayGridMonth',
        height: 'auto',

        events: (fetchInfo, successCallback, failureCallback) => {
          fetch('/api/appointments')
            .then(res => res.json())
            .then(data => {
              const evs = data
                .filter(a => clients[a.client_index] !== undefined)
                .map(a => {
                  const dateOnly = a.appointment_date.split('T')[0];
                  const c   = clients[a.client_index];
                  const srv = svcList.find(s => s.id === a.service_id) || {};
                  return {
                    id:    String(a.id),
                    title: `${c.nombre} – ${srv.name || 'Servicio Desconocido'}`,
                    start: `${dateOnly}T${a.appointment_time}`
                  };
                });
              successCallback(evs);
            })
            .catch(err => failureCallback(err));
        },

        dateClick: info => showDay(info.dateStr),
        eventClick: info => openEdit(parseInt(info.event.id, 10))
      }
    );

    calendar.render();
  }

  const turnosTab = document.querySelector('#areaTabs button[data-bs-target="#turnos"]');
  turnosTab.addEventListener('shown.bs.tab', initCalendar);
  if (turnosTab.classList.contains('active')) initCalendar();

  // --- Función para mostrar modal del día con sus turnos ---
  function showDay(date) {
    document.getElementById('dayAppointmentsDate').innerText = date;
    const dayAppointments = appts.filter(a =>
      a.appointment_date.split('T')[0] === date
    );
    const listHTML = dayAppointments.length
      ? dayAppointments.map(a => {
          const c   = clients[a.client_index];
          const srv = svcList.find(s => s.id === a.service_id) || {};
          return `
            <li class="list-group-item d-flex justify-content-between">
              ${a.appointment_time} – ${c.nombre} (${srv.name || '—'})
              <div>
                <button class="btn btn-sm btn-light me-1" onclick="openEdit(${a.id})">
                  <i class="fas fa-edit"></i>
                </button>
                <button class="btn btn-sm btn-danger" onclick="deleteAppt(${a.id})">
                  <i class="fas fa-trash"></i>
                </button>
              </div>
            </li>
          `;
        }).join('')
      : `<li class="list-group-item">No hay turnos para este día</li>`;
    document.getElementById('dayAppointmentsList').innerHTML = listHTML;
    new bootstrap.Modal(document.getElementById('dayAppointmentsModal')).show();
  }

  // --- Global: editar turno ---
  window.openEdit = id => {
    const idx = appts.findIndex(a => a.id === id);
    if (idx < 0) return;
    const a = appts[idx];
    document.getElementById('editAppointmentIndex').value   = id;
    document.getElementById('editAppointmentClient').value  = a.client_index;
    document.getElementById('editAppointmentService').value = a.service_id;
    document.getElementById('editAppointmentDate').value    = a.appointment_date.split('T')[0];
    document.getElementById('editAppointmentTime').value    = a.appointment_time;
    new bootstrap.Modal(document.getElementById('editAppointmentModal')).show();
  };

  // --- Global: eliminar turno ---
  window.deleteAppt = async id => {
    if (!confirm('¿Eliminar este turno?')) return;
    try {
      const res = await fetch(`/api/appointments/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error(`Error ${res.status}`);
      appts = appts.filter(a => a.id !== id);
      renderToday();
      if (calendar) calendar.refetchEvents();
      bootstrap.Modal.getInstance(document.getElementById('editAppointmentModal')).hide();
    } catch (err) {
      alert('Error al eliminar turno: ' + err.message);
    }
  };

  // --- Guardar edición de turno ---
  document.getElementById('saveAppointmentBtn').addEventListener('click', async () => {
    const id  = +document.getElementById('editAppointmentIndex').value;
    const idx = appts.findIndex(a => a.id === id);
    if (idx < 0) return;
    const payload = {
      client_index:     +document.getElementById('editAppointmentClient').value,
      service_id:       +document.getElementById('editAppointmentService').value,
      appointment_date: document.getElementById('editAppointmentDate').value,
      appointment_time: document.getElementById('editAppointmentTime').value
    };
    try {
      const res = await fetch(`/api/appointments/${id}`, {
        method:  'PUT',
        headers: {'Content-Type':'application/json'},
        body:    JSON.stringify(payload)
      });
      if (!res.ok) throw new Error(`Error ${res.status}`);
      const updated = await res.json();
      appts[idx] = updated;
      renderToday();
      if (calendar) calendar.refetchEvents();
      bootstrap.Modal.getInstance(document.getElementById('editAppointmentModal')).hide();
    } catch (err) {
      alert('Error al guardar cambios: ' + err.message);
    }
  });

  // --- Agregar turno desde pestaña principal ---
  document.getElementById('formTurno').addEventListener('submit', async e => {
    e.preventDefault();
    const payload = {
      client_index:     +document.getElementById('selTurnoClient').value,
      service_id:       +document.getElementById('selTurnoService').value,
      appointment_date: document.getElementById('inpTurnoDate').value,
      appointment_time: document.getElementById('inpTurnoTime').value
    };
    try {
      const res = await fetch('/api/appointments', {
        method:  'POST',
        headers: {'Content-Type':'application/json'},
        body:    JSON.stringify(payload)
      });
      if (!res.ok) throw new Error(`Error ${res.status}`);
      const newAppt = await res.json();
      appts.push(newAppt);
      renderToday();
      if (calendar) calendar.refetchEvents();
      e.target.reset();
    } catch (err) {
      alert('Error al agendar: ' + err.message);
    }
  });

  // --- Agregar turno desde modal de día específico ---
  document.getElementById('addTurnoFormDayModal').addEventListener('submit', async e => {
    e.preventDefault();
    const date    = document.getElementById('dayAppointmentsDate').innerText;
    const payload = {
      client_index:     +document.getElementById('dayModalClient').value,
      service_id:       +document.getElementById('dayModalService').value,
      appointment_date: date,
      appointment_time: document.getElementById('dayModalTime').value
    };
    try {
      const res = await fetch('/api/appointments', {
        method:  'POST',
        headers: {'Content-Type':'application/json'},
        body:    JSON.stringify(payload)
      });
      if (!res.ok) throw new Error(`Error ${res.status}`);
      const newAppt = await res.json();
      appts.push(newAppt);
      renderToday();
      showDay(date);
      if (calendar) calendar.refetchEvents();
      e.target.reset();
    } catch (err) {
      alert('Error agregando turno: ' + err.message);
    }
  });
  

});
