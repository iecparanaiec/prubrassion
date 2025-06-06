document.addEventListener('DOMContentLoaded', () => {
    const usersTable = document.querySelector('#usersTable tbody');
    const userModal = new bootstrap.Modal('#userModal');
    const form = document.getElementById('userForm');
    const btnAdd = document.getElementById('btnAdd');
  
    // Campos
    const userIdField = document.getElementById('userId');
    const usernameField = document.getElementById('username');
    const emailField    = document.getElementById('email');
    const roleField     = document.getElementById('role');
    const passwordField = document.getElementById('password');
  
    // Carga inicial
    async function loadUsers() {
      usersTable.innerHTML = '<tr><td colspan="4">Cargando...</td></tr>';
      try {
        const res = await fetch('/api/users');
        const users = await res.json();
        usersTable.innerHTML = '';
        users.forEach(u => {
          const tr = document.createElement('tr');
          tr.innerHTML = `
            <td>${u.username}</td>
            <td>${u.email}</td>
            <td>${u.role}</td>
            <td>
              <button class="btn btn-sm btn-warning me-1 btn-edit" data-id="${u.id}">
                <span class="material-icons">edit</span>
              </button>
              <button class="btn btn-sm btn-danger btn-delete" data-id="${u.id}">
                <span class="material-icons">delete</span>
              </button>
            </td>`;
          usersTable.appendChild(tr);
        });
        attachRowEvents();
      } catch (e) {
        usersTable.innerHTML = '<tr><td colspan="4">Error al cargar.</td></tr>';
      }
    }
  
    function attachRowEvents() {
      document.querySelectorAll('.btn-edit').forEach(btn =>
        btn.onclick = () => openModal(btn.dataset.id)
      );
      document.querySelectorAll('.btn-delete').forEach(btn =>
        btn.onclick = () => deleteUser(btn.dataset.id)
      );
    }
  
    // Abrir modal
    function openModal(id = null) {
      form.reset();
      if (id) {
        // editar
        fetch(`/api/users/${id}`)
          .then(res => res.json())
          .then(u => {
            userIdField.value = u.id;
            usernameField.value = u.username;
            emailField.value = u.email;
            roleField.value = u.role;
            passwordField.placeholder = 'Dejar en blanco para no cambiar';
            userModal.show();
          });
      } else {
        // nuevo
        userIdField.value = '';
        passwordField.required = true;
        passwordField.placeholder = '';
        userModal.show();
      }
    }
  
    // Guardar
    form.addEventListener('submit', async e => {
      e.preventDefault();
      const id = userIdField.value;
      const payload = {
        username: usernameField.value,
        email: emailField.value,
        role: roleField.value,
      };
      if (passwordField.value) {
        payload.password = passwordField.value;
      }
      const url = id ? `/api/users/${id}` : '/api/users';
      const method = id ? 'PUT' : 'POST';
  
      try {
        const res = await fetch(url, {
          method,
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
        const { success, message } = await res.json();
        if (!success) throw new Error(message);
        userModal.hide();
        loadUsers();
      } catch (err) {
        alert(err.message || 'Error al guardar');
      }
    });
  
    // Borrar
    async function deleteUser(id) {
      if (!confirm('¿Confirma eliminar este usuario?')) return;
      try {
        const res = await fetch(`/api/users/${id}`, { method: 'DELETE' });
        const { success } = await res.json();
        if (success) loadUsers();
        else alert('No se pudo eliminar');
      } catch {
        alert('Error de conexión');
      }
    }
  
    // Nuevo usuario
    btnAdd.addEventListener('click', () => openModal());
  
    // Inicializar
    loadUsers();
  });
  