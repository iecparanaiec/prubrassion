document.addEventListener('DOMContentLoaded', () => {
    const selClient   = document.getElementById('selTurnoClient');
    const selService  = document.getElementById('selTurnoService');
    const inpDate     = document.getElementById('inpTurnoDate');
    const inpTime     = document.getElementById('inpTurnoTime');
    const form        = document.getElementById('formTurno');
    const todayList   = document.getElementById('todayAppointments');
    const btnBack     = document.getElementById('btnBack');
  
    const dayModal    = document.getElementById('dayAppointmentsModal');
    const dayClose    = document.getElementById('dayClose');
    const dayTitle    = document.getElementById('dayAppointmentsTitle');
    const dayList     = document.getElementById('dayAppointmentsList');
  
    // 1) Leo datos CRM
    const clientsRaw  = JSON.parse(localStorage.getItem('todos_data') || '[]');
    const servicesRaw = JSON.parse(localStorage.getItem('servicios')  || '[]');
    const savedTurns  = JSON.parse(localStorage.getItem('turnos')     || '[]');
  
    // 2) Relleno selects
    clientsRaw.forEach((c,i) => {
      const name = c.Nombre || c.Cliente || `Cliente ${i+1}`;
      selClient.add(new Option(name, i));
    });
    servicesRaw.forEach((s,i) => {
      const svc = s.nombre || s.name || `Servicio ${i+1}`;
      selService.add(new Option(svc, i));
    });
  
    // 3) Inicializo FullCalendar
    const calendar = new FullCalendar.Calendar(
      document.getElementById('calendar'),
      {
        initialView: 'dayGridMonth',
        locale: 'es',
        headerToolbar: {
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridMonth,timeGridWeek,timeGridDay'
        },
        height: '100%',
        contentHeight: 'auto',
        events: savedTurns.map(ev => ({ title: ev.title, start: ev.start })),
        dateClick: info => {
          const d = info.dateStr;
          dayTitle.textContent = `Turnos ${formatDate(d)}`;
          const todays = savedTurns.filter(ev => ev.start.startsWith(d));
          dayList.innerHTML = todays.length
            ? todays.map(ev => `<li class="client-item">
                <div class="client-info">
                  <span class="client-name">${ev.title}</span><br>
                  <small>${ev.start.substr(11,5)}</small>
                </div>
              </li>`).join('')
            : `<p class="text-center">No hay turnos ese día.</p>`;
          dayModal.style.display = 'flex';
        }
      }
    );
    calendar.render();
  
    // 4) Mostrar Turnos de hoy
    function updateToday() {
      const today = new Date().toISOString().split('T')[0];
      const listToday = savedTurns.filter(ev => ev.start.startsWith(today));
      todayList.innerHTML = listToday.length
        ? listToday.map(ev => `<li class="client-item">
            <div class="client-info">
              <span class="client-name">${ev.title}</span><br>
              <small>${ev.start.substr(11,5)}</small>
            </div>
          </li>`).join('')
        : `<p class="text-center">No hay turnos hoy.</p>`;
    }
    updateToday();
  
    // 5) Agendar nuevo turno
    form.addEventListener('submit', e => {
      e.preventDefault();
      const ci = selClient.value, si = selService.value,
            d  = inpDate.value, t = inpTime.value;
      if (!ci || !si || !d || !t) return;
  
      const clientName = clientsRaw[ci].Nombre || clientsRaw[ci].Cliente;
      const serviceName= servicesRaw[si].nombre || servicesRaw[si].name;
      const title      = `${clientName} — ${serviceName}`;
      const start      = `${d}T${t}`;
  
      // Guardo y actualizo
      savedTurns.push({ title, start });
      localStorage.setItem('turnos', JSON.stringify(savedTurns));
      calendar.addEvent({ title, start });
      updateToday();
      form.reset();
    });
  
    // 6) Cerrar modales
    dayClose.addEventListener('click', () => dayModal.style.display = 'none');
    dayModal.addEventListener('click', e => {
      if (e.target === dayModal) dayModal.style.display = 'none';
    });
  
    // 7) Volver al modal padre
    btnBack.addEventListener('click', e => {
      e.preventDefault();
      const m = window.parent.bootstrap.Modal.getInstance(
        window.parent.document.getElementById('contentModal')
      );
      m.hide();
    });
  
    // Helper fecha DD/MM/AAAA
    function formatDate(iso) {
      return new Date(iso).toLocaleDateString('es-AR');
    }
  });
  