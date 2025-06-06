document.addEventListener('DOMContentLoaded', function() {
    // Simulación de carga de datos - reemplazar con llamadas a la API real
    let fakeData = [
      {username: 'user1', fullName: 'Nombre Apellido', registrationDate: '2024-03-19', actions: 'Ver | Aprobar | Rechazar'},
      // ...más datos simulados
    ];
  
    let requestsTable = document.getElementById('requestsTable').getElementsByTagName('tbody')[0];
  
    fakeData.forEach((data) => {
      let row = requestsTable.insertRow();
      Object.values(data).forEach(text => {
        let cell = row.insertCell();
        cell.innerText = text;
      });
    });
  
    // Simulación de búsqueda - implementar la lógica de búsqueda real
    document.getElementById('searchBox').addEventListener('keyup', function(event) {
      let term = event.target.value.toLowerCase();
      let rows = requestsTable.getElementsByTagName('tr');
      Array.from(rows).forEach(row => {
        let username = row.cells[0].textContent.toLowerCase();
        row.style.display = username.includes(term) ? '' : 'none';
      });
    });
  });

  document.getElementById('menu-toggle').addEventListener('click', function() {
    var sidebar = document.querySelector('.sidebar');
    sidebar.style.display = sidebar.offsetParent === null ? 'block' : 'none';
  });
  
  // Código existente...

// Navegación de pestañas
let tabs = document.querySelectorAll('.sidebar nav ul li a');
let contents = document.querySelectorAll('.tab-content');

tabs.forEach(tab => {
  tab.addEventListener('click', function(e) {
    e.preventDefault();

    let activeTabAttr = e.target.getAttribute('href').substring(1);
    for (let i = 0; i < contents.length; i++) {
      let contentAttr = contents[i].id;
      if (activeTabAttr === contentAttr) {
        contents[i].classList.add('active');
        tabs[i].classList.add('active');
      } else {
        contents[i].classList.remove('active');
        tabs[i].classList.remove('active');
      }
    }
  });
});

// Funcionalidad de botones simulada
document.addEventListener('click', function(e) {
  if (e.target.tagName === 'BUTTON') {
    let action = e.target.dataset.action;
    let userId = e.target.closest('tr').dataset.userId;
    alert('Acción "' + action + '" para el usuario ID ' + userId);
    // Aquí iría el código para realizar la acción correspondiente
  }
});
