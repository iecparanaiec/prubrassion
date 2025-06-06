/***********************************************************
 * 1. FUNCIONALIDAD DE LA BARRA LATERAL
 ***********************************************************/
const menuItems       = document.querySelectorAll('.menu-item');
const sectionContents = document.querySelectorAll('.section-content');

menuItems.forEach(item => {
  item.addEventListener('click', () => {
    menuItems.forEach(i => i.classList.remove('active'));
    item.classList.add('active');

    sectionContents.forEach(sec => sec.classList.remove('active'));
    const target = document.querySelector(item.dataset.sectionTarget);
    if (target) target.classList.add('active');
  });
});

/***********************************************************
 * 2. PESTAÑAS (solo para sección "Chats", si las usás)
 ***********************************************************/
const tabs       = document.querySelectorAll(".tab");
const tabContents= document.querySelectorAll(".tab-content");

tabs.forEach(tab => {
  tab.addEventListener("click", () => {
    tabs.forEach(t => t.classList.remove("active"));
    tab.classList.add("active");

    tabContents.forEach(c => c.classList.remove("active"));
    const target = document.querySelector(tab.dataset.tabTarget);
    if (target) target.classList.add("active");
  });
});

/***********************************************************
 * 3. FILTROS DE CHATS (ejemplo)
 ***********************************************************/
const filterStatus = document.getElementById("filter-status");
const filterView   = document.getElementById("filter-view");

filterStatus?.addEventListener("change", e => {
  console.log("Estado:", e.target.value);
});
filterView?.addEventListener("change", e => {
  console.log("Vista:", e.target.value);
});

/***********************************************************
 * 4. PROGRAMACIÓN DE PUBLICACIONES (ejemplo)
 ***********************************************************/
const postForm        = document.getElementById('postForm');
const scheduledPosts  = document.getElementById('scheduledPosts');

postForm?.addEventListener('submit', e => {
  e.preventDefault();
  const postText = document.getElementById('postText').value.trim();
  const postDate = document.getElementById('postDate').value;
  const networks = [];
  ['checkFacebook','checkInstagram','checkTwitter'].forEach(id => {
    if (document.getElementById(id).checked) networks.push(id.replace('check',''));
  });
  if (!postText || !postDate || networks.length===0) {
    return alert('Completa todos los campos.');
  }
  const li = document.createElement('li');
  li.classList.add('list-group-item','d-flex','justify-content-between','align-items-center');
  li.innerHTML = `
    <div>
      <strong>${postText}</strong><br>
      Redes: ${networks.join(', ')}<br>
      Fecha/Hora: ${postDate}
    </div>
    <button class="btn btn-sm btn-outline-danger">Eliminar</button>
  `;
  li.querySelector('button').onclick = () => li.remove();
  scheduledPosts.appendChild(li);
  postForm.reset();
});

/***********************************************************
 * 5. COMPRAS – guardamos cada cálculo asignado como “orden de compra”
 ***********************************************************/
// Cargamos el historial desde localStorage
let purchases = JSON.parse(localStorage.getItem('compras') || '[]');

// Función para pintar la tabla de Compras
function updateComprasTable() {
  const clientes = JSON.parse(localStorage.getItem('clientesData') || '[]');
  const tbody    = document.querySelector('#comprasTable tbody');
  if (!tbody) return;
  tbody.innerHTML = '';

  purchases.forEach(p => {
    const clienteObj = clientes[p.client] || {};
    const nombre     = clienteObj.nombre || '—';
    const { area, bricks, cement, sand, plasticor, iron } = p.materials;
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${nombre}</td>
      <td>${p.date}</td>
      <td>${area}</td>
      <td>${bricks}</td>
      <td>${cement}</td>
      <td>${sand}</td>
      <td>${plasticor}</td>
      <td>${iron}</td>
    `;
    tbody.appendChild(tr);
  });
}

// Cuando el usuario hace click en “Compras” actualizamos la tabla
const comprasMenu = document.querySelector('[data-section-target="#compras"]');
comprasMenu?.addEventListener('click', updateComprasTable);


/***********************************************************
 * 6. CÁLCULOS – mismo código que ya tenías, pero agregamos
 *    el registro en “purchases” al asignar materiales
 ***********************************************************/
document.getElementById('assignBtn').onclick = () => {
  const idx = +document.getElementById('selCalcClient').value;
  const m = {
    area:+document.getElementById('oArea').innerText,
    bricks:+document.getElementById('oBricks').innerText,
    cement:+document.getElementById('oCement').innerText,
    sand:+document.getElementById('oSand').innerText,
    plasticor:+document.getElementById('oPlasticor').innerText,
    iron:+document.getElementById('oIron').innerText
  };
  // Guardamos en materials_<cliente>
  localStorage.setItem(`materials_${idx}`, JSON.stringify(m));
  // **NUEVO**: agregamos también al historial de compras
  purchases.push({
    client: idx,
    materials: m,
    date: new Date().toISOString().split('T')[0]  // YYYY-MM-DD
  });
  localStorage.setItem('compras', JSON.stringify(purchases));
  // Refrescamos la tabla en caso de que esté visible
  updateComprasTable();
  // Cerramos el modal (si aplica)
  const modalEl = document.getElementById('modalCalc');
  bootstrap.Modal.getInstance(modalEl)?.hide();
};

// …el resto de tu script.js sigue idéntico a cómo lo tenías…
