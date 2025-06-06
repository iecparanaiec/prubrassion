// gestión de vendedores (almacenados en localStorage)
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('vendedores-form');
    const tbody = document.querySelector('#vendedores-table tbody');
  
    form.addEventListener('submit', e => {
      e.preventDefault();
      const id = Date.now();
      const nombre = form['nombre-vendedor'].value;
      const region = form['region-vendedor'].value;
  
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td>${id}</td>
        <td>${nombre}</td>
        <td>${region}</td>
        <td><button class="btn btn-sm btn-danger delete">Eliminar</button></td>
      `;
      tbody.appendChild(tr);
      tr.querySelector('.delete').onclick = () => tr.remove();
      form.reset();
    });
  });
  