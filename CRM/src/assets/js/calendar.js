// URL de tu webhook de n8n
const WEBHOOK_URL = 'https://n8n.smarteco.com.ar/webhook-test/4990248b-a866-4020-b76f-1c6b9a894ee3';

const form = document.getElementById('calendar-form');
const list = document.getElementById('appointments');

form.addEventListener('submit', async e => {
  e.preventDefault();

  // Capturar valores
  const name    = form.name.value.trim();
  const date    = form.date.value;    // YYYY-MM-DD
  const time    = form.time.value;    // HH:MM
  const purpose = form.purpose.value.trim();

  // Construir payload para n8n
  const payload = { name, date, time, purpose };

  try {
    const res = await fetch(WEBHOOK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    if (!res.ok) throw new Error(`Error ${res.status}`);

    // Mostrar en lista local
    appendAppointment({ name, date, time, purpose });
    form.reset();
  } catch (err) {
    alert('No se pudo agendar: ' + err.message);
  }
});

function appendAppointment({ name, date, time, purpose }) {
  const li = document.createElement('li');
  li.textContent = `${date} ${time} — ${name}: ${purpose}`;
  list.appendChild(li);
}
