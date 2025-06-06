/****************************************************
 * script-inicio.js
 ****************************************************/
document.addEventListener('DOMContentLoaded', () => {
  /********************* CONSTANTES *********************/
  const board           = document.getElementById('board');
  const newNoteBtn      = document.getElementById('newNoteBtn');
  const currentDateElem = document.getElementById('currentDate');
  const headerH1        = document.querySelector('.header h1');
  const storedUser      = JSON.parse(localStorage.getItem('currentUser') || '{}');

  // Fecha actual YYYY-MM-DD
  const today   = new Date();
  const dateStr = today.toISOString().split('T')[0];
  if (currentDateElem) currentDateElem.textContent = dateStr;



  // Para el dropdown de destinatarios
  let usersList = [];
  fetch('/api/users')
    .then(r => r.json())
    .then(list => { usersList = list; });

  // Saludo en header
  if (headerH1 && storedUser) {
    const name = storedUser.full_name || storedUser.username || 'Usuario';
    headerH1.textContent = `Tablero de ${name}`;
  }

  // RANGO DE ROLES (cuanto mayor, más privilegios)
  const roleRank = {
    'admin-superior': 100,
    'gerente ventas':  80,
    'gerente compras': 80,
    'area técnica':    50,
    'vendedor':        10,
    'compras':         10
  };

  /******************* NOTAS COMPARTIDAS VISTAS *******************/
  // Declaramos el set aquí para poder usarlo tanto en loadNotes
  // como en checkIncomingNotifications.
  const seenNotificationIds = new Set();



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

  /******************* FUNCIONES PRINCIPALES *******************/
  /** 1) Carga inicial de notas desde servidor */
  async function loadNotes() {
    const headers = { 'x-user-id': storedUser.id };

    // 1.a) Traer notas propias y compartidas en paralelo
    const [respMy, respShared] = await Promise.all([
      fetch('/api/notes',       { headers }),
      fetch('/api/shared_notes',{ headers }),
    ]);

    const myNotes     = await respMy.json();
    const sharedNotes = await respShared.json();

    // 1.b) Pintar mis notas
    myNotes.forEach(n => createNoteElement({
      id:             n.id,
      content:        n.content,
      x:              n.x,
      y:              n.y,
      width:          n.width,
      height:         n.height,
      bgColor:        n.bgColor,
      alarmOn:        n.alarm_on,
      alarmDateTime:  n.alarm_time,
      editing:        false,
      shared:         false,
      senderRole:   n.sender_role 
    }));

    // 1.c) Pintar notas compartidas
 sharedNotes.forEach(n => {
   createNoteElement({
     id:             n.id,
     content:        n.content,
     x:              n.x    || 50,
     y:              n.y    || 50,
     width:          n.width  || 220,
     height:         n.height || 120,
     bgColor:        n.bgColor,
     alarmOn:        n.alarm_on,
     alarmDateTime:  n.alarm_time,
     editing:        false,
     shared:         true,
     senderRole:     n.sender_role      // <-- lo añadimos
   });
   seenNotificationIds.add(n.id);
 });
  }

  /** 2) Actualiza la nota en el servidor tras un cambio */
  async function updateNoteOnServer(noteData) {
    try {
      const res = await fetch(`/api/notes/${noteData.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'x-user-id':     storedUser.id
        },
        body: JSON.stringify({
          content:    noteData.content,
          x:          noteData.x,
          y:          noteData.y,
          width:      noteData.width,
          height:     noteData.height,
          bg_color:   noteData.bgColor,
          alarm_on:   noteData.alarmOn,
          alarm_time: noteData.alarmDateTime
        })
      });
      if (!res.ok) throw new Error(res.statusText);
    } catch (err) {
      console.error('Error actualizando nota en servidor:', err);
    }
  }

  /** 3) Guarda en localStorage (por si acaso) */
  function saveNotes() {
    const notesData = [];
    document.querySelectorAll('.note').forEach(noteEl => {
      const toolbar = noteEl.querySelector('.formatting-toolbar');
      if (!toolbar) return;
      const chk   = toolbar.querySelector('input[type="checkbox"]');
      const dateI = toolbar.querySelector('input[type="datetime-local"]');
      notesData.push({
        id:            noteEl.dataset.id,
        content:       noteEl.querySelector('.note-content').innerHTML,
        x:             noteEl.offsetLeft,
        y:             noteEl.offsetTop,
        width:         noteEl.offsetWidth,
        height:        noteEl.offsetHeight,
        bgColor:       noteEl.style.backgroundColor || '#333333',
        alarmOn:       chk   ? chk.checked : false,
        alarmDateTime: dateI ? dateI.value : '',
        editing:       noteEl.classList.contains('edit-mode')
      });
    });
    localStorage.setItem(`notes_${dateStr}`, JSON.stringify(notesData));
  }

  /** 4) Crea e inserta una nota en el DOM, con todos sus eventos */
  function createNoteElement(noteData) {
      if (document.querySelector(`.note[data-id="${noteData.id}"]`)) return;
  



    // --------- CONTENEDOR ----------
    const noteEl = document.createElement('div');
    noteEl.classList.add('note');
    noteEl.dataset.id = noteData.id;
    Object.assign(noteEl.style, {
      left:   noteData.x + 'px',
      top:    noteData.y + 'px',
      width:  noteData.width + 'px',
      height: noteData.height+'px',
      backgroundColor: noteData.bgColor
    });
    if (noteData.editing) noteEl.classList.add('edit-mode');
    if (noteData.shared)  noteEl.dataset.shared = 'true';

    // --------- HEADER ----------
    const header      = document.createElement('div'); header.classList.add('note-header');
    const headerIcons = document.createElement('div'); headerIcons.classList.add('header-icons');
    const pencilBtn   = document.createElement('button'); pencilBtn.innerHTML='&#9998;';
    const alarmBtn    = document.createElement('button'); alarmBtn.innerHTML = noteData.alarmOn ? '🔔':'🔕';
    const deleteBtn   = document.createElement('button'); deleteBtn.innerHTML='🗑';
    headerIcons.append(pencilBtn, alarmBtn, deleteBtn);
    header.append(headerIcons);
    noteEl.append(header);


      // ——— NUEVO BLOQUE para jerarquías ——————————————————
  const myRank   = roleRank[ (storedUser.role   || '').toLowerCase() ] || 0;
  const sendRank = roleRank[ (noteData.senderRole || '').toLowerCase() ] || 0;

  // Si es nota compartida y quien la envió tiene igual o más rango que yo,
  // y además NO soy admin-superior, deshabilito editar/borrar:
 if ( noteData.shared &&
       myRank <= sendRank &&
       (storedUser.role || '').toLowerCase() !== 'admin-superior'
     ) {
    pencilBtn.disabled = true;
    deleteBtn.disabled = true;

  }
    const myRole = (storedUser.role || '').trim().toLowerCase();
    const isAdmin = myRole === 'admin-superior';
    if (noteData.shared && !isAdmin) {
      pencilBtn.style.display = 'none';
      deleteBtn.style.display = 'none';
      // opcionalmente deshabilitar alarmBtn si tampoco quieres que cambien la alarma:
      // alarmBtn.disabled = true;
    }


    // --------- TOOLBAR ----------
    const toolbar = document.createElement('div'); toolbar.classList.add('formatting-toolbar');
    toolbar.style.display = noteData.editing?'flex':'none';
    if(noteData.editing) toolbar.style.backgroundColor='#3b3b3b';
    // botones B/U
    const btnBold      = document.createElement('button'); btnBold.innerHTML='<b>B</b>'; btnBold.dataset.command='bold';
    const btnUnderline = document.createElement('button'); btnUnderline.innerHTML='<u>U</u>'; btnUnderline.dataset.command='underline';
    toolbar.append(btnBold, btnUnderline);
    // select tamaño
    const selectFontSize = document.createElement('select');
    [1,2,3,4,5,6,7].forEach(v=>{
      const opt = document.createElement('option');
      opt.value = v; opt.textContent = {1:'12px',2:'14px',3:'16px',4:'18px',5:'20px',6:'24px',7:'28px'}[v];
      if(v===2) opt.selected=true;
      selectFontSize.append(opt);
    });
    toolbar.append(selectFontSize);
    // color texto / fondo
    const inputTextColor = document.createElement('input'); inputTextColor.type='color'; inputTextColor.title='Color de texto';
    const inputBgColor   = document.createElement('input'); inputBgColor.type='color'; inputBgColor.value=noteData.bgColor; inputBgColor.title='Color de fondo';
    toolbar.append(inputTextColor, inputBgColor);
    // imagen
    const btnImage  = document.createElement('button'); btnImage.textContent='📷';
    const fileInput = document.createElement('input'); fileInput.type='file'; fileInput.accept='image/*'; fileInput.style.display='none';
    toolbar.append(btnImage, fileInput);
    // emojis
    const btnEmoji   = document.createElement('button'); btnEmoji.textContent='😀';
    const emojiPanel = document.createElement('div'); emojiPanel.classList.add('emoji-panel'); emojiPanel.style.display='none';
    ['😀','😂','❤️','😎','🎉','👍','🤔','⭐','✅','⚠️','📌','🔔'].forEach(em=>{
      const eb = document.createElement('button'); eb.textContent=em;
      eb.addEventListener('click',()=>{
        if(!noteData.editing) return alert('Activa edición');
        contentDiv.focus(); document.execCommand('insertText',false,em);
        saveNotes(); updateNoteOnServer(noteData);
        emojiPanel.style.display='none';
      });
      emojiPanel.append(eb);
    });
    toolbar.append(btnEmoji, emojiPanel);
    noteEl.append(toolbar);

    // --------- CONTENIDO ----------
    const contentDiv = document.createElement('div'); contentDiv.classList.add('note-content');
    contentDiv.innerHTML = noteData.content;
    contentDiv.contentEditable = noteData.editing;
    noteEl.append(contentDiv);

    // --------- ALARMA ----------
    const alarmContainer = document.createElement('div'); alarmContainer.classList.add('toggle-container');
    alarmContainer.innerHTML = `
      <label>Alarma:</label>
      <input type="checkbox">
      <input type="datetime-local" style="display:none">
    `;
    const alarmToggle    = alarmContainer.querySelector('input[type="checkbox"]');
    const alarmDateInput = alarmContainer.querySelector('input[type="datetime-local"]');
    alarmToggle.checked  = noteData.alarmOn;
    alarmDateInput.value = noteData.alarmDateTime||'';
    if(alarmToggle.checked) alarmDateInput.style.display='inline-block';
    toolbar.append(alarmContainer);

    // --------- ENVÍO ENTRE USUARIOS ----------
    const sendContainer   = document.createElement('div'); sendContainer.classList.add('send-note-container');
    const selectRecipient = document.createElement('select');
    usersList.filter(u=>u.id!==storedUser.id).forEach(u=>{
      const opt = document.createElement('option'); opt.value=u.id; opt.textContent=u.full_name||u.username;
      selectRecipient.append(opt);
    });
    const sendBtn2 = document.createElement('button'); sendBtn2.textContent='Enviar';
    sendBtn2.addEventListener('click',async()=>{
          const payload = {
        senderId:    storedUser.id,
        recipientId: selectRecipient.value,
        noteContent: contentDiv.innerHTML,
        bg_color:    noteData.bgColor,
        x:           noteData.x,
        y:           noteData.y,
        width:       noteData.width,
        height:      noteData.height,
        alarm_on:    noteData.alarmOn,
        alarm_time:  noteData.alarmDateTime
      };
      try{
      const res = await fetch('/api/shared_notes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // Si tu backend espera un header de autenticación como 'x-user-id':
          'x-user-id': storedUser.id
        },
        body: JSON.stringify({
          senderId:    storedUser.id,
          recipientId: selectRecipient.value,
          noteContent: contentDiv.innerHTML,
          x:           noteEl.offsetLeft,
          y:           noteEl.offsetTop,
          width:       noteEl.offsetWidth,
          height:      noteEl.offsetHeight,
          bg_color:    noteEl.style.backgroundColor,
          alarm_on:    toolbar.querySelector('input[type="checkbox"]').checked,
          alarm_time:  toolbar.querySelector('input[type="datetime-local"]').value || null
        })
      });

        const j = await res.json();
        alert(j.success?'Nota enviada':'Error al enviar');
      }catch{
        alert('Error de red');
      }
    });
    sendContainer.append(selectRecipient, sendBtn2);
    noteEl.append(sendContainer);

    // Añadir al DOM
    board.append(noteEl);


    /******************* EVENTOS DENTRO DE LA NOTA *******************/
    // 1) Formato
    toolbar.addEventListener('click', e => {
      const btn = e.target.closest('button');
      if (!btn) return;
      const cmd = btn.dataset.command;
      if (cmd && noteData.editing) {
        contentDiv.focus();
        document.execCommand(cmd, false, null);
        saveNotes();
        updateNoteOnServer(noteData);
      }
    });
    selectFontSize.addEventListener('change', () => {
      if (!noteData.editing) return alert('Activa edición');
      contentDiv.focus();
      document.execCommand('fontSize', false, selectFontSize.value);
      saveNotes();
      updateNoteOnServer(noteData);
    });
    inputTextColor.addEventListener('change', () => {
      if (!noteData.editing) return alert('Activa edición');
      contentDiv.focus();
      document.execCommand('foreColor', false, inputTextColor.value);
      saveNotes();
      updateNoteOnServer(noteData);
    });
       contentDiv.addEventListener('blur',()=>{
      noteData.content = contentDiv.innerHTML;
      saveNotes();
      updateNoteOnServer(noteData);
    });
    inputBgColor.addEventListener('change', () => {
      noteData.bgColor = inputBgColor.value;
      noteEl.style.backgroundColor = noteData.bgColor;
      saveNotes();
      updateNoteOnServer(noteData);
    });

    // 2) Emojis toggle
    btnEmoji.addEventListener('click', () => {
      if (!noteData.editing) return alert('Activa edición');
      emojiPanel.style.display = emojiPanel.style.display === 'none' ? 'flex' : 'none';
    });

    // 3) Insertar imagen
    btnImage.addEventListener('click', () => {
      if (!noteData.editing) return alert('Activa edición');
      fileInput.click();
    });
    fileInput.addEventListener('change', () => {
      const f = fileInput.files[0];
      if (!f) return;
      const reader = new FileReader();
      reader.onload = e => {
        contentDiv.focus();
        document.execCommand('insertImage', false, e.target.result);
        // puedes envolver la imagen como antes…
        saveNotes();
        updateNoteOnServer(noteData);
      };
      reader.readAsDataURL(f);
    });

    // 4) Toggle edición (lápiz)
    pencilBtn.addEventListener('click', () => {
      noteData.editing = !noteData.editing;
      noteEl.classList.toggle('edit-mode', noteData.editing);
      toolbar.style.display   = noteData.editing ? 'flex' : 'none';
      contentDiv.contentEditable = noteData.editing;
      saveNotes();
      updateNoteOnServer(noteData);
    });

    // 5) Blur al editar contenido → actualizar
    contentDiv.addEventListener('blur', () => {
      noteData.content = contentDiv.innerHTML;
      saveNotes();
      updateNoteOnServer(noteData);
    });

    // 6) Alarma on/off y fecha
    alarmToggle.addEventListener('change', () => {
      noteData.alarmOn = alarmToggle.checked;
      alarmBtn.innerHTML = noteData.alarmOn ? '🔔' : '🔕';
      alarmDateInput.style.display = noteData.alarmOn ? 'inline-block' : 'none';
      if (!noteData.alarmOn) {
        noteData.alarmDateTime = null;
        alarmDateInput.value = '';
      }
      saveNotes();
      updateNoteOnServer(noteData);
    });
    alarmDateInput.addEventListener('change', () => {
      noteData.alarmDateTime = alarmDateInput.value;
      saveNotes();
      updateNoteOnServer(noteData);
    });

 // Drag / resize
    makeDraggable(noteEl, header);
    noteEl.addEventListener('mouseup',()=>{
      noteData.x      = noteEl.offsetLeft;
      noteData.y      = noteEl.offsetTop;
      noteData.width  = noteEl.offsetWidth;
      noteData.height = noteEl.offsetHeight;
      saveNotes();
      updateNoteOnServer(noteData);
    });

 // Borrar
    deleteBtn.addEventListener('click',async()=>{
      const pass = prompt('Clave para eliminar esta nota:');
      if(pass!=='Maxi1234') return alert('Clave incorrecta');
      if(noteData.shared) {
        await fetch(`/api/shared_notes/${noteData.id}`,{ method:'DELETE' });
      } else {
        await fetch(`/api/notes/${noteData.id}`,{ method:'DELETE', headers:{'x-user-id':storedUser.id} });
      }
      noteEl.remove();
    });
  }

  /** Drag sólo por header */
  function makeDraggable(noteEl, headerEl){
    let startX, startY, initX, initY, dragging=false;
    const threshold = 5, topOffset = document.querySelector('.header')?.offsetHeight||0;
    headerEl.addEventListener('mousedown', e=>{
      e.preventDefault();
      startX = e.clientX; startY = e.clientY;
      initX  = noteEl.offsetLeft; initY = noteEl.offsetTop;
      const onMouseMove = mv=>{
        const dx = mv.clientX - startX, dy = mv.clientY - startY;
        if(!dragging && (Math.abs(dx)>threshold||Math.abs(dy)>threshold)) dragging=true;
        if(dragging){
          noteEl.style.left = initX + dx + 'px';
          noteEl.style.top  = Math.max(initY + dy, topOffset) + 'px';
        }
      };
      const onMouseUp = ()=>{
        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup',   onMouseUp);
        saveNotes();
      };
      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup',   onMouseUp);
    });
  }


/** 5) Polling de notificaciones entrantes */
  async function checkIncomingNotifications() {
    try {
      const r = await fetch('/api/notifications',{ headers:{ 'x-user-id':storedUser.id } });
      const notes = await r.json();
      for (const n of notes) {
        if (seenNotificationIds.has(n.id)) continue;
        createNoteElement({
          id:            n.id,
          content:       n.note_content,
          x:             50, y: 50,
          width:         220, height:120,
          bgColor:       '#333333',
          alarmOn:       false,
          alarmDateTime: null,
          editing:       false,
          shared:        true
        });
        await fetch(`/api/notifications/${n.id}/read`,{ method:'PUT' });
        seenNotificationIds.add(n.id);
      }
    } catch(err) {
      console.error('Error notifications polling:', err);
    }
  }

  /******************* ARRANQUE *******************/
  loadNotes();
  checkIncomingNotifications();
  setInterval(checkIncomingNotifications, 60000);

 // Crear nueva nota en servidor + en pantalla
  newNoteBtn.addEventListener('click', async () => {
    const payload = {
      content:     '',
      x:           50,
      y:           50,
      width:       220,
      height:      120,
      bg_color:    '#333333',
      alarm_on:    false,
      alarm_time:  null
    };
    try {
      const res = await fetch('/api/notes',{ method:'POST',
        headers:{ 'Content-Type':'application/json','x-user-id':storedUser.id },
        body: JSON.stringify(payload)
      });
      if(!res.ok) throw new Error(res.statusText);
      const note = await res.json();
      createNoteElement({
        id:            note.id,
        content:       note.content,
        x:             note.x,
        y:             note.y,
        width:         note.width,
        height:        note.height,
        bgColor:       note.bgColor,
        alarmOn:       note.alarm_on,
        alarmDateTime: note.alarm_time,
        editing:       false,
        shared:        false
      });
    } catch(err) {
      console.error('Error creando nota:', err);
      alert('No se pudo crear la nota en el servidor');
    }
  });

const socket = io();


// Cuando alguien crea una nota nueva:
socket.on('noteCreated', nota => {
  createNoteElement({
    id:            nota.id,
    content:       nota.content,
    x:             nota.x,
    y:             nota.y,
    width:         nota.width,
    height:        nota.height,
    bgColor:       nota.bgColor,         // <-- camelCase aquí
    alarmOn:       nota.alarmOn,
    alarmDateTime: nota.alarmDateTime,
    editing:       false,
    shared:        false
  });
});

// Cuando alguien comparte una nota conmigo:
socket.on('noteShared', n => {
  if (n.recipientId !== storedUser.id) return;    // ← usa recipientId
  seenNotificationIds.add(n.id);
  createNoteElement({
    id:            n.id,
    content:       n.content,
    x:             n.x    ?? 50,
    y:             n.y    ?? 50,
    width:         n.width  ?? 220,
    height:        n.height ?? 120,
    bgColor:       n.bgColor,                     // ← usa bgColor
    alarmOn:       n.alarmOn,
    alarmDateTime: n.alarmDateTime,
    editing:       false,
    shared:        true,
    senderRole:    n.senderRole
  });
});

// … cuando el emisor borra su nota compartida …
socket.on('sharedNoteDeleted', ({ id, recipientId }) => {
    // ─── Aquí añade este log ────────────────────────
    console.log('🟢 [CLIENT] recibí sharedNoteDeleted:', { id, recipientId, storedUser });
    // ───
  if (recipientId !== storedUser.id) return;      // ← idem aquí
  const noteEl = document.querySelector(`.note[data-id="${id}"]`);
  if (noteEl) noteEl.remove();
});

});