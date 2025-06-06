/* =========================================================
   CRM – Planilla con listas desplegables y edición completa
   ========================================================= */
   (() => {
    /* ---- refs ---- */
    const fechaEl    = document.getElementById("fecha");
    const excelInput = document.getElementById("excelInput");
    const exportBtn  = document.getElementById("exportBtn");
    const addRowBtn  = document.getElementById("addRowBtn");
    const saveBtn    = document.getElementById("saveBtn");
    const tabsEl     = document.getElementById("tabs");
    const panesEl    = document.getElementById("panes");
  
    fechaEl.textContent = new Date().toISOString().split("T")[0];
  
    /* ---- estado ---- */
    let tables = {};         // hoja -> Tabulator
    let activeSheet = null;
  
    /* ---- helpers localStorage ---- */
    const LS_KEY = (s) => `crm_data_${s}`;
  
    const saveLocal = (sheet) => {
      localStorage.setItem(LS_KEY(sheet),
        JSON.stringify(tables[sheet].getData()));
    };
    const loadLocal = (sheet) => {
      const raw = localStorage.getItem(LS_KEY(sheet));
      return raw ? JSON.parse(raw) : null;
    };
  
    /* ---- detectar columnas SELECT ---- */
    function columnDefs(data){
      const headers = Object.keys(data[0] ?? {});
      return headers.map(h => {
        const uniques = [...new Set(data.map(r=>r[h]).filter(v=>v!=="" && v!=null))];
        // si hay pocos valores distintos => desplegable
        if(uniques.length && uniques.length <= 30){
          return {
            title:h, field:h,
            editor:"select",
            editorParams:{values:uniques},
            headerSort:false,
            widthGrow:1,
          };
        }
        // texto libre
        return {
          title:h, field:h,
          editor:"input",
          headerSort:false,
          widthGrow:1,
        };
      });
    }
  
    /* ---- render workbook ---- */
    function renderWorkbook(wb){
      // limpiar anteriores
      Object.values(tables).forEach(t=>t.destroy());
      tables = {};
      tabsEl.innerHTML = "";
      panesEl.innerHTML = "";
      activeSheet = null;
  
      wb.SheetNames.forEach((name,i)=>{
        // convertir a JSON, quitando cols __EMPTY
        let json = XLSX.utils.sheet_to_json(wb.Sheets[name], {defval:""});
        if(!json.length) return;
  
        json = json.map(row=>{
          Object.keys(row).forEach(k=>{
            if(/^__EMPTY/.test(k)) delete row[k];
          });
          return row;
        });
  
        // merge con localStorage si existe
        const local = loadLocal(name);
        if(local) json = local;
  
        // column defs
        const cols = columnDefs(json);
  
        /* tab btn */
        tabsEl.insertAdjacentHTML("beforeend",
          `<li class="nav-item">
             <button class="nav-link ${i?"" :"active"}"
                     data-sheet="${name}">${name}</button>
           </li>`);
  
        /* pane */
        const pane = document.createElement("div");
        pane.id    = `pane-${i}`;
        pane.className = `tab-pane fade ${i?"":"show active"}`;
        panesEl.appendChild(pane);
  
        /* Tabulator */
        const table = new Tabulator(pane,{
          data:json,
          columns:cols,
          height:"calc(100vh - 240px)",
          layout:"fitDataStretch",
          clipboard:true,
          movableColumns:true,
          placeholder:"Sin datos",
          reactiveData:true,
        });
  
        tables[name] = table;
        if(i===0) activeSheet = name;
      });
  
      /* listeners nav */
      tabsEl.querySelectorAll(".nav-link").forEach(btn=>
        btn.addEventListener("click",e=>{
          tabsEl.querySelectorAll(".nav-link").forEach(b=>b.classList.remove("active"));
          e.target.classList.add("active");
          const idx=[...tabsEl.querySelectorAll(".nav-link")].indexOf(e.target);
          panesEl.querySelectorAll(".tab-pane").forEach((p,i)=>{
            p.classList.toggle("show", i===idx);
            p.classList.toggle("active", i===idx);
          });
          activeSheet = e.target.dataset.sheet;
        })
      );
  
      exportBtn.classList.remove("d-none");
      addRowBtn.classList.remove("d-none");
      saveBtn.classList.remove("d-none");
    }
  
    /* ---- eventos ---- */
    excelInput.addEventListener("change",({target})=>{
      const file=target.files[0];
      if(!file) return;
      const reader=new FileReader();
      reader.onload=e=>{
        const wb=XLSX.read(new Uint8Array(e.target.result),{type:"array"});
        renderWorkbook(wb);
      };
      reader.readAsArrayBuffer(file);
    });
  
    addRowBtn.addEventListener("click",()=>{
      if(!activeSheet) return;
      tables[activeSheet].addRow({});
    });
  
    saveBtn.addEventListener("click",()=>{
      if(!activeSheet) return;
      saveLocal(activeSheet);
      alert("Datos guardados");
    });
  
    exportBtn.addEventListener("click",()=>{
      if(!Object.keys(tables).length) return;
      const wb=XLSX.utils.book_new();
      Object.entries(tables).forEach(([name,table])=>{
        const ws=XLSX.utils.json_to_sheet(table.getData());
        XLSX.utils.book_append_sheet(wb,ws,name.substring(0,31));
      });
      XLSX.writeFile(wb,"clientes_editado.xlsx");
    });
  })();
  