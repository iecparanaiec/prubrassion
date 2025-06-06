import mapboxgl from "mapbox-gl";

const MAPBOX_TOKEN = 'TU_TOKEN_ACÁ';

document.addEventListener("DOMContentLoaded", () => {
  // DOM
  const modeloSel = document.getElementById("modelo-promocion");
  const tipoSel = document.getElementById("tipo-promocion");
  const ubicInput = document.getElementById("ubicacion-promocion");
  const radioRange = document.getElementById("radio-promocion");
  const radioLabel = document.getElementById("radio-value");
  const form = document.getElementById("promociones-form");
  const tbody = document.querySelector("#promociones-table tbody");

  const inputNuevoModelo = document.getElementById("inputNuevoModelo");
  const inputNuevoTipo = document.getElementById("inputNuevoTipo");

  let map, marker, circle;

  // Inicializar valores
  function get(key, def) {
    const d = localStorage.getItem(key);
    if (d) return JSON.parse(d);
    localStorage.setItem(key, JSON.stringify(def));
    return def;
  }

  function save(key, arr) {
    localStorage.setItem(key, JSON.stringify(arr));
  }

  function refreshSelects() {
    const modelos = get("pc_modelos", ["Sión", "Helen"]);
    const tipos = get("pc_tipos", ["Descuento", "Cuotas"]);

    modeloSel.innerHTML = modelos.map(m => `<option>${m}</option>`).join("");
    tipoSel.innerHTML = tipos.map(t => `<option>${t}</option>`).join("");
  }

  // Agregar Modelo
  document.getElementById("saveModeloBtn").addEventListener("click", () => {
    const val = inputNuevoModelo.value.trim();
    if (val) {
      const arr = get("pc_modelos", []);
      if (!arr.includes(val)) {
        arr.push(val);
        save("pc_modelos", arr);
        refreshSelects();
        modeloSel.value = val;
      }
    }
    inputNuevoModelo.value = "";
    bootstrap.Modal.getInstance(document.getElementById("modalModelo")).hide();
  });

  // Agregar Tipo
  document.getElementById("saveTipoBtn").addEventListener("click", () => {
    const val = inputNuevoTipo.value.trim();
    if (val) {
      const arr = get("pc_tipos", []);
      if (!arr.includes(val)) {
        arr.push(val);
        save("pc_tipos", arr);
        refreshSelects();
        tipoSel.value = val;
      }
    }
    inputNuevoTipo.value = "";
    bootstrap.Modal.getInstance(document.getElementById("modalTipo")).hide();
  });

  // Mapa
  function initMap() {
    mapboxgl.accessToken = MAPBOX_TOKEN;
    map = new mapboxgl.Map({
      container: "map",
      style: "mapbox://styles/mapbox/dark-v11",
      center: [-60.5238, -31.7384],
      zoom: 13,
    });

    map.on("click", async (e) => {
      const { lng, lat } = e.lngLat;

      if (marker) marker.remove();
      if (circle) map.removeLayer("radius-circle");

      marker = new mapboxgl.Marker().setLngLat([lng, lat]).addTo(map);

      updateCircle([lng, lat], parseFloat(radioRange.value));

      try {
        const r = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`);
        const data = await r.json();
        ubicInput.value = data.display_name || `${lat}, ${lng}`;
      } catch {
        ubicInput.value = `${lat.toFixed(5)}, ${lng.toFixed(5)}`;
      }
    });
  }

  function updateCircle(center, radius) {
    const id = "radius-circle";
    const rInKm = radius / 1000;

    if (map.getSource(id)) {
      map.getSource(id).setData(circleGeo(center, rInKm));
    } else {
      map.addSource(id, {
        type: "geojson",
        data: circleGeo(center, rInKm),
      });

      map.addLayer({
        id,
        type: "fill",
        source: id,
        layout: {},
        paint: {
          "fill-color": "#e71b1b",
          "fill-opacity": 0.3,
        },
      });
    }
  }

  function circleGeo(center, radiusInKm, points = 64) {
    const coords = [];
    for (let i = 0; i < points; i++) {
      const angle = (i * 360) / points;
      const dx = radiusInKm / 111 * Math.cos((angle * Math.PI) / 180);
      const dy = radiusInKm / 111 * Math.sin((angle * Math.PI) / 180);
      coords.push([center[0] + dx, center[1] + dy]);
    }
    coords.push(coords[0]);
    return {
      type: "Feature",
      geometry: {
        type: "Polygon",
        coordinates: [coords],
      },
    };
  }

  // Radio dinámico
  radioRange.addEventListener("input", () => {
    radioLabel.textContent = radioRange.value;
    if (marker) updateCircle(marker.getLngLat().toArray(), parseFloat(radioRange.value));
  });

  // Formulario
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const id = Date.now();
    const modelo = modeloSel.value;
    const tipo = tipoSel.value;
    const ubic = ubicInput.value;
    const radio = radioRange.value;
    const ciudades = "..."; // opcional

    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${id}</td>
      <td>${modelo}</td>
      <td>${tipo}</td>
      <td>${ubic}</td>
      <td>${radio}m</td>
      <td>${ciudades}</td>
      <td><button class="btn btn-sm btn-outline-light delete">🗑</button></td>
    `;
    row.querySelector(".delete").addEventListener("click", () => row.remove());
    tbody.appendChild(row);

    form.reset();
    radioLabel.textContent = "100";
    ubicInput.value = "";
    if (marker) marker.remove();
    if (circle) map.removeLayer("radius-circle");
  });

  // Init
  refreshSelects();
  initMap();
});
