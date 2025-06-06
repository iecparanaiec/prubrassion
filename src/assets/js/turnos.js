// gestión de turnos
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('turnos-form');
    const tbody = document.querySelector('#turnos-table tbody');
  
    form.addEventListener('submit', e => {
      e.preventDefault();
      const id = Date.now();
      const cliente = form['cliente-turno'].value;
      const servicio = form['servicio-turno'].value;
      const fecha = form['fecha-turno'].value;
      const hora = form['hora-turno'].value;
  
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td>${id}</td>
        <td>${cliente}</td>
        <td>${servicio}</td>
        <td>${fecha}</td>
        <td>${hora}</td>
        <td><button class="btn btn-sm btn-danger delete">Eliminar</button></td>
      `;
      tbody.appendChild(tr);
      tr.querySelector('.delete').onclick = () => tr.remove();
      form.reset();
    });
  });
  