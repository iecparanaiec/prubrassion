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

  /******************* FUNCIONES PRINCIPALES *******************/
  /** 1) Carga inicial de notas desde servidor */
  async function loadNotes() {
    const headers = { 'x-user-id': storedUser.id };
  
    // 2.a) Cargar tus notas propias
    const [respMy, respShared] = await Promise.all([
      fetch('/api/notes',     { headers }),
      fetch('/api/shared_notes', { headers }),
    ]);
  
    const myNotes     = await respMy.json();
    const sharedNotes = await respShared.json();
  
    // 2.b) Pintar ambas
    myNotes.forEach(n => createNoteElement({
      id:          n.id,
      content:     n.content,
      x:           n.x,
      y:           n.y,
      width:       n.width,
      height:      n.height,
      bgColor:     n.bg_color,
      alarmOn:     n.alarm_on,
      alarmDateTime: n.alarm_time,
      editing:     false,
      shared:      false
    }));
  
    sharedNotes.forEach(n => createNoteElement({
      id:          n.id,
      content:     n.content,
      x:           n.x    || 50,    // o posiciones fijas si no las guardas
      y:           n.y    || 50,
      width:       n.width  || 220,
      height:      n.height || 120,
      bgColor:     n.bg_color,
      alarmOn:     n.alarm_on,
      alarmDateTime: n.alarm_time,
      editing:     false,
      shared:      true
    }));
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
      const chk    = toolbar.querySelector('input[type="checkbox"]');
      const dateI  = toolbar.querySelector('input[type="datetime-local"]');
      notesData.push({
        id:       noteEl.dataset.id,
        content:  noteEl.querySelector('.note-content').innerHTML,
        x:        noteEl.offsetLeft,
        y:        noteEl.offsetTop,
        width:    noteEl.offsetWidth,
        height:   noteEl.offsetHeight,
        bgColor:  noteEl.style.backgroundColor || '#333333',
        alarmOn:  chk   ? chk.checked : false,
        alarmDateTime: dateI ? dateI.value : '',
        editing:  noteEl.classList.contains('edit-mode')
      });
    });
    localStorage.setItem(`notes_${dateStr}`, JSON.stringify(notesData));
  }

  /** 4) Crea e inserta la nota en el DOM, con todos sus eventos */
  function createNoteElement(noteData) {
    // contenedor
    const noteEl = document.createElement('div');
    noteEl.classList.add('note');
    noteEl.dataset.id = noteData.id;
    Object.assign(noteEl.style, {
      left:   noteData.x + 'px',
      top:    noteData.y + 'px',
      width:  noteData.width + 'px',
      height: noteData.height + 'px',
      backgroundColor: noteData.bgColor
    });
    if (noteData.editing) noteEl.classList.add('edit-mode');
    if (noteData.shared)  noteEl.dataset.shared = 'true';

    // header
    const header = document.createElement('div');
    header.classList.add('note-header');
    const headerIcons = document.createElement('div');
    headerIcons.classList.add('header-icons');
    const pencilBtn = document.createElement('button'); pencilBtn.innerHTML = '&#9998;';
    const alarmBtn  = document.createElement('button');
    alarmBtn.innerHTML = noteData.alarmOn ? '🔔' : '🔕';
    const deleteBtn = document.createElement('button'); deleteBtn.innerHTML = '🗑';
    headerIcons.append(pencilBtn, alarmBtn, deleteBtn);
    header.append(headerIcons);
    noteEl.append(header);

    // toolbar
    const toolbar = document.createElement('div');
    toolbar.classList.add('formatting-toolbar');
    toolbar.style.display = noteData.editing ? 'flex' : 'none';
    if (noteData.editing) toolbar.style.backgroundColor = '#3b3b3b';
    // formato básico
    const btnBold      = document.createElement('button'); btnBold.innerHTML = '<b>B</b>'; btnBold.dataset.command = 'bold';
    const btnUnderline = document.createElement('button'); btnUnderline.innerHTML = '<u>U</u>'; btnUnderline.dataset.command = 'underline';
    toolbar.append(btnBold, btnUnderline);
    // tamaño fuente
    const selectFontSize = document.createElement('select');
    [1,2,3,4,5,6,7].forEach(v => {
      const opt = document.createElement('option');
      opt.value = v;
      opt.textContent = {1:'12px',2:'14px',3:'16px',4:'18px',5:'20px',6:'24px',7:'28px'}[v];
      if (v === 2) opt.selected = true;
      selectFontSize.append(opt);
    });
    toolbar.append(selectFontSize);
    // colores
    const inputTextColor = document.createElement('input');
    inputTextColor.type = 'color'; inputTextColor.title = 'Color de texto';
    const inputBgColor   = document.createElement('input');
    inputBgColor.type    = 'color'; inputBgColor.value = noteData.bgColor; inputBgColor.title = 'Color de fondo';
    toolbar.append(inputTextColor, inputBgColor);
    // imagen
    const btnImage  = document.createElement('button'); btnImage.textContent = '📷';
    const fileInput = document.createElement('input');
    fileInput.type = 'file'; fileInput.accept = 'image/*'; fileInput.style.display = 'none';
    toolbar.append(btnImage, fileInput);
    // emojis
    const btnEmoji   = document.createElement('button'); btnEmoji.textContent = '😀';
    const emojiPanel = document.createElement('div'); emojiPanel.classList.add('emoji-panel'); emojiPanel.style.display = 'none';
    ['😀','😂','❤️','😎','🎉','👍','🤔','⭐','✅','⚠️','📌','🔔'].forEach(em => {
      const eb = document.createElement('button'); eb.textContent = em;
      eb.addEventListener('click', () => {
        if (!noteData.editing) return alert('Activa edición');
        contentDiv.focus();
        document.execCommand('insertText', false, em);
        saveNotes(); updateNoteOnServer(noteData);
        emojiPanel.style.display = 'none';
      });
      emojiPanel.append(eb);
    });
    toolbar.append(btnEmoji, emojiPanel);
    noteEl.append(toolbar);

    // contenido
    const contentDiv = document.createElement('div');
    contentDiv.classList.add('note-content');
    contentDiv.innerHTML = noteData.content;
    contentDiv.contentEditable = noteData.editing;
    noteEl.append(contentDiv);

    // alarma
    const alarmContainer = document.createElement('div');
    alarmContainer.classList.add('toggle-container');
    alarmContainer.innerHTML = `
      <label>Alarma:</label>
      <input type="checkbox">
      <input type="datetime-local" style="display:none">
    `;
    const alarmToggle    = alarmContainer.querySelector('input[type="checkbox"]');
    const alarmDateInput = alarmContainer.querySelector('input[type="datetime-local"]');
    alarmToggle.checked  = noteData.alarmOn;
    alarmDateInput.value = noteData.alarmDateTime || '';
    if (alarmToggle.checked) alarmDateInput.style.display = 'inline-block';
    toolbar.append(alarmContainer);

    // envío entre usuarios (igual que antes)
    const sendContainer = document.createElement('div');
    sendContainer.classList.add('send-note-container');
    const selectRecipient = document.createElement('select');
    usersList.filter(u => u.id !== storedUser.id).forEach(u => {
      const opt = document.createElement('option');
      opt.value = u.id; opt.textContent = u.full_name || u.username;
      selectRecipient.append(opt);
    });
    const sendBtn2 = document.createElement('button'); sendBtn2.textContent = 'Enviar';
    sendBtn2.addEventListener('click', async () => {
      try {
        const res = await fetch('/api/notes/send', {
          method: 'POST',
          headers: {'Content-Type':'application/json'},
          body: JSON.stringify({
            senderId:    storedUser.id,
            recipientId: selectRecipient.value,
            noteContent: contentDiv.innerHTML
          })
        });
        const j = await res.json();
        alert(j.success ? 'Nota enviada' : 'Error al enviar');
      } catch {
        alert('Error de red');
      }
    });
    sendContainer.append(selectRecipient, sendBtn2);
    noteEl.append(sendContainer);

    // al final, añadimos la nota al tablero
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

    // 7) Drag & resize — al soltar guardamos y actualizamos
    makeDraggable(noteEl, header);
    noteEl.addEventListener('mouseup', () => {
      noteData.x      = noteEl.offsetLeft;
      noteData.y      = noteEl.offsetTop;
      noteData.width  = noteEl.offsetWidth;
      noteData.height = noteEl.offsetHeight;
      saveNotes();
      updateNoteOnServer(noteData);
    });

    // 8) Borrar nota (local + servidor si es compartida)
    deleteBtn.addEventListener('click', async () => {
      const pass = prompt('Clave para eliminar esta nota:');
      if (pass !== 'Maxi1234') return alert('Clave incorrecta');
      
      // 3.a) Llamar al endpoint apropiado
      if (noteData.shared) {
        await fetch(`/api/shared_notes/${noteData.id}`, { method: 'DELETE' });
      } else {
        await fetch(`/api/notes/${noteData.id}`, { 
          method: 'DELETE', 
          headers: { 'x-user-id': storedUser.id } 
        });
      }
      
      // 3.b) Quitar del DOM
      noteEl.remove();
    });
  }

  /** Drag sólo por header */
  function makeDraggable(noteEl, headerEl) {
    let startX, startY, initX, initY, dragging = false;
    const threshold = 5, topOffset = document.querySelector('.header')?.offsetHeight || 0;
    headerEl.addEventListener('mousedown', e => {
      e.preventDefault();
      startX = e.clientX; startY = e.clientY;
      initX  = noteEl.offsetLeft; initY = noteEl.offsetTop;
      const onMouseMove = mv => {
        const dx = mv.clientX - startX, dy = mv.clientY - startY;
        if (!dragging && (Math.abs(dx) > threshold || Math.abs(dy) > threshold)) dragging = true;
        if (dragging) {
          noteEl.style.left = initX + dx + 'px';
          noteEl.style.top  = Math.max(initY + dy, topOffset) + 'px';
        }
      };
      const onMouseUp = () => {
        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
        saveNotes();
      };
      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);
    });
  }

  /** Filter de notificaciones entrantes (igual que antes) */
  const seenNotificationIds = new Set();
  async function checkIncomingNotifications() {
    try {
      const r = await fetch('/api/notifications', { headers: { 'x-user-id': storedUser.id } });
      const notes = await r.json();
      for (const n of notes) {
        if (seenNotificationIds.has(n.id)) continue;
        createNoteElement({
          id:            n.id,
          content:       n.note_content,
          x:             50, y: 50,
          width:         220, height: 120,
          bgColor:       '#333333',
          alarmOn:       false,
          alarmDateTime: null,
          editing:       false,
          shared:        true
        });
        await fetch(`/api/notifications/${n.id}/read`, { method: 'PUT' });
        seenNotificationIds.add(n.id);
      }
    } catch (err) {
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
      content:      '',
      x:            50,
      y:            50,
      width:        220,
      height:       120,
      bg_color:     '#333333',
      alarm_on:     false,
      alarm_time:   null
    };
    try {
      const res  = await fetch('/api/notes', {
        method:  'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-user-id':    storedUser.id
        },
        body: JSON.stringify(payload)
      });
      if (!res.ok) throw new Error(res.statusText);
      const note = await res.json();
      createNoteElement({
        id:             note.id,
        content:        note.content,
        x:              note.x,
        y:              note.y,
        width:          note.width,
        height:         note.height,
        bgColor:        note.bg_color,
        alarmOn:        note.alarm_on,
        alarmDateTime:  note.alarm_time,
        editing:        false,
        shared:         false
      });
    } catch (err) {
      console.error('Error creando nota:', err);
      alert('No se pudo crear la nota en el servidor');
    }
  });
});
