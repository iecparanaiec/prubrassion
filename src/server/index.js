// src/server/index.js

import express from 'express';
import { createServer } from 'http';
import { Server as IOServer } from 'socket.io';
import pkg from 'pg';
import notesRouterRaw from './routes/notes.js';
import sharedNotesRouter from './routes/sharedNotes.js';
import { requireUserId } from './middleware/auth-middleware.js';
import { join, extname, dirname } from 'path';
import { fileURLToPath } from 'url';
import path from 'path';
import fs from 'fs';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import { initIO } from './socket.js';

dotenv.config();
const { Pool } = pkg;

// ── Express + HTTP + Socket.io ───────────────────────
const app = express();
const httpServer = createServer(app);
const io = initIO(httpServer);

const PORT     = process.env.PORT || 3002;
const __dirname = dirname(fileURLToPath(import.meta.url));
const htmlDir   = join(__dirname, '../html');
const assetsDir = join(__dirname, '../assets');
const distDir   = join(__dirname, '../../dist');

// PostgreSQL pool
const pool = new Pool({ connectionString: process.env.DB_URL });

// ── Middlewares ─────────────────────────────────────
app.use(express.json());

// ── Archivos públicos ────────────────────────────────
app.use('/assets', express.static(assetsDir));
app.use('/uploads', express.static(join(__dirname, '../uploads')));
app.use(express.static(htmlDir));
app.use(express.static(distDir));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(distDir, {
  setHeaders: (res, filePath) => {
    if (extname(filePath) === '.css') {
      res.setHeader('Content-Type', 'text/css');
    }
  }
}));

// ── Rutas de login ───────────────────────────────────
async function loginHandler(req, res) {
  const { username, password } = req.body;
  try {
    const { rows } = await pool.query(`
      SELECT id, username, full_name, password_hash, role
        FROM users
       WHERE username = $1
    `, [username]);
    if (!rows.length) return res.json({ success: false });

    const { id, full_name, password_hash, role } = rows[0];
    if (!await bcrypt.compare(password, password_hash)) {
      return res.json({ success: false });
    }
    return res.json({
      success: true,
      user: { id, username, full_name, role }
    });
  } catch (err) {
    console.error('Error en loginHandler:', err);
    return res.status(500).json({ success: false, error: 'Error interno' });
  }
}

// Redirige “/” a login
app.get('/',      (_, res) => res.redirect('/login'));
// Sirve la página de login
app.get('/login', (_, res) => res.sendFile(join(htmlDir, 'login.html')));
// Endpoint de login
app.post('/api/login', loginHandler);

// ── RUTAS PROTEGIDAS ─────────────────────────────────
// Todas requieren header 'x-user-id' válido
app.use('/api/notes',        requireUserId);
app.use('/api/shared_notes', requireUserId);
app.use('/api/notes/send',   requireUserId);
app.use('/api/notifications', requireUserId);

// ── CRUD Notas Propias con Socket.IO ────────────────
const notesRouterModified = express.Router();

// Delegamos GET, PUT, DELETE
notesRouterModified.use('/', notesRouterRaw);

// POST “/” con emisión de socket
notesRouterModified.post('/', async (req, res, next) => {
  try {
    await notesRouterRaw.handle(req, res, () => {});
    const created = res.locals.createdNote;
    if (created) io.emit('noteCreated', created);
  } catch (err) {
    next(err);
  }
});

// Montamos el router modificado
app.use('/api/notes', notesRouterModified);

// ── Notas Compartidas ───────────────────────────────
app.post('/api/notes/send', async (req, res) => {
  const {
    senderId, recipientId, noteContent,
    x, y, width, height,
    bg_color, alarm_on, alarm_time
  } = req.body;

  try {
    const { rows } = await pool.query(`
      INSERT INTO shared_notes
        ( sender_id, recipient_id, note_content,
          x, y, width, height,
          bg_color, alarm_on, alarm_time
        )
      VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)
      RETURNING *
    `, [
      senderId, recipientId, noteContent,
      x, y, width, height,
      bg_color, alarm_on, alarm_time
    ]);

    const raw = rows[0];
    const notification = {
      id:            raw.id,
      senderId:      raw.sender_id,
      recipientId:   raw.recipient_id,
      content:       raw.note_content,
      x:             raw.x,
      y:             raw.y,
      width:         raw.width,
      height:        raw.height,
      bgColor:       raw.bg_color,
      alarmOn:       raw.alarm_on,
      alarmDateTime: raw.alarm_time,
      createdAt:     raw.created_at
    };

    io.emit('noteShared', notification);
    return res.json({ success: true, notification });
  } catch (err) {
    console.error('Error en POST /api/notes/send:', err);
    return res.status(500).json({ success: false });
  }
});

// GET /api/shared_notes
app.use('/api/shared_notes', sharedNotesRouter);

// ── Notificaciones ──────────────────────────────────
app.get('/api/notifications', async (req, res) => {
  const userId = req.userId;
  try {
    const { rows } = await pool.query(`
      SELECT id, sender_id, note_content, created_at
        FROM shared_notes
       WHERE recipient_id = $1
         AND is_read = false
       ORDER BY created_at DESC
    `, [userId]);
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json([]);
  }
});

app.put('/api/notifications/:id/read', async (req, res) => {
  const noteId = parseInt(req.params.id, 10);
  try {
    await pool.query(
      `UPDATE shared_notes SET is_read = true WHERE id = $1`,
      [noteId]
    );
    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false });
  }
});

app.delete('/api/notifications/:id', async (req, res) => {
  const noteId = parseInt(req.params.id, 10);
  try {
    await pool.query(`DELETE FROM shared_notes WHERE id = $1`, [noteId]);
    res.json({ success: true });
  } catch (err) {
    console.error('Error al borrar nota compartida:', err);
    res.status(500).json({ success: false, error: 'Error interno' });
  }
});

// ── CRUD Usuarios ───────────────────────────────────
app.get('/api/users', async (_, res) => {
  try {
    const { rows } = await pool.query(`
      SELECT id, username, email, full_name, role, created_at, updated_at
        FROM users
       ORDER BY username
    `);
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al obtener usuarios' });
  }
});

app.get('/api/users/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const { rows } = await pool.query(`
      SELECT id, username, email, full_name, role, created_at, updated_at
        FROM users
       WHERE id = $1
    `, [id]);
    if (!rows.length) return res.status(404).json({ error: 'Usuario no encontrado' });
    res.json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al obtener usuario' });
  }
});

app.post('/api/users', async (req, res) => {
  const { username, email, full_name, role, password } = req.body;
  try {
    const hash = await bcrypt.hash(password, 10);
    const { rows } = await pool.query(`
      INSERT INTO users (username, email, full_name, role, password_hash)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING id, username, email, full_name, role, created_at, updated_at
    `, [username, email, full_name, role, hash]);
    res.json({ success: true, user: rows[0] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: 'Error al crear usuario' });
  }
});

app.put('/api/users/:id', async (req, res) => {
  const { id } = req.params;
  const { username, email, full_name, role, password } = req.body;
  try {
    let query, params;
    if (password) {
      const hash = await bcrypt.hash(password, 10);
      query = `
        UPDATE users SET
          username=$1, email=$2, full_name=$3, role=$4,
          password_hash=$5, updated_at=NOW()
         WHERE id=$6
       RETURNING id, username, email, full_name, role, created_at, updated_at
      `;
      params = [username, email, full_name, role, hash, id];
    } else {
      query = `
        UPDATE users SET
          username=$1, email=$2, full_name=$3, role=$4, updated_at=NOW()
         WHERE id=$5
       RETURNING id, username, email, full_name, role, created_at, updated_at
      `;
      params = [username, email, full_name, role, id];
    }
    const { rows } = await pool.query(query, params);
    if (!rows.length) return res.status(404).json({ success: false, error: 'Usuario no encontrado' });
    res.json({ success: true, user: rows[0] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: 'Error al actualizar usuario' });
  }
});

app.delete('/api/users/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query('DELETE FROM users WHERE id=$1', [id]);
    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: 'Error al eliminar usuario' });
  }
});

// ── Turnos (Appointments) ───────────────────────────
app.get('/api/appointments', async (_, res) => {
  try {
    const { rows } = await pool.query(`
      SELECT id, client_index, service_id, appointment_date, appointment_time
        FROM appointments
       ORDER BY appointment_date, appointment_time
    `);
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al obtener turnos' });
  }
});

app.post('/api/appointments', async (req, res) => {
  const { client_index, service_id, appointment_date, appointment_time } = req.body;
  try {
    const { rows } = await pool.query(`
      INSERT INTO appointments (client_index, service_id, appointment_date, appointment_time)
      VALUES ($1,$2,$3,$4) RETURNING *
    `, [client_index, service_id, appointment_date, appointment_time]);
    res.status(201).json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al crear turno' });
  }
});

app.put('/api/appointments/:id', async (req, res) => {
  const { id } = req.params;
  const { client_index, service_id, appointment_date, appointment_time } = req.body;
  try {
    const { rows } = await pool.query(`
      UPDATE appointments
         SET client_index=$1, service_id=$2, appointment_date=$3, appointment_time=$4, updated_at=NOW()
       WHERE id=$5 RETURNING *
    `, [client_index, service_id, appointment_date, appointment_time, id]);
    if (!rows.length) return res.status(404).json({ error: 'Turno no encontrado' });
    res.json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al actualizar turno' });
  }
});

app.delete('/api/appointments/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query('DELETE FROM appointments WHERE id = $1', [id]);
    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al eliminar turno' });
  }
});

// ── Asignaciones de Material ────────────────────────
app.get('/api/material_assignments', async (_, res) => {
  try {
    const { rows } = await pool.query(`
      SELECT id, client_index, area, bricks, cement, sand, plasticor, iron, assigned_at
        FROM material_assignments
       ORDER BY assigned_at DESC
    `);
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al obtener asignaciones' });
  }
});

app.post('/api/material_assignments', async (req, res) => {
  const { client_index, area, bricks, cement, sand, plasticor, iron } = req.body;
  try {
    const { rows } = await pool.query(`
      INSERT INTO material_assignments (client_index, area, bricks, cement, sand, plasticor, iron)
      VALUES ($1,$2,$3,$4,$5,$6,$7) RETURNING *
    `, [client_index, area, bricks, cement, sand, plasticor, iron]);
    res.status(201).json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al crear asignación' });
  }
});

// ── Actualizar home.html dinámicamente ─────────────
app.post('/api/update-home', (req, res) => {
  const { logoHeader, logoFooter, menuItems } = req.body;
  const homeFilePath = join(__dirname, '../html/home.html');
  fs.readFile(homeFilePath, 'utf8', (err, data) => {
    if (err) {
      console.error('Error leyendo home.html:', err);
      return res.status(500).json({ success: false, message: 'Error al leer home.html' });
    }
    let updated = data.replace(
      /<img src=".*?" alt="Logo de la empresa" \/>/,
      `<img src="${logoHeader}" alt="Logo de la empresa" />`
    );
    updated = updated.replace(
      /<img src=".*?" alt="Logo Smarteco" class="footer-logo" \/>/,
      `<img src="${logoFooter}" alt="Logo Smarteco" class="footer-logo" />`
    );
    updated = updated.replace(
      /<ul class="nav-menu" id="navMenu">[\s\S]*?<\/ul>/,
      `<ul class="nav-menu" id="navMenu">
        ${menuItems.map(item => `<li><a href="${item.href}">${item.text}</a></li>`).join('\n')}
      </ul>`
    );
    fs.writeFile(homeFilePath, updated, 'utf8', writeErr => {
      if (writeErr) {
        console.error('Error escribiendo home.html:', writeErr);
        return res.status(500).json({ success: false, message: 'Error al guardar cambios' });
      }
      res.json({ success: true });
    });
  });
});

// ── Servir HTML específicos ─────────────────────────
app.use('/html', express.static(htmlDir));

const htmlPages = [
  'calendar.html', 'area_tecnica.html',
  'chatbot_corrientes.html', 'chatbot_entrerios.html',
  'chatbot_mardelplata.html', 'chatbot_neuquen.html',
  'chatbot.html', 'clientes.html', 'tablero.html'
];

htmlPages.forEach(page =>
  app.get(`/${page}`, (_, res) =>
    res.sendFile(join(htmlDir, page))
  )
);

// Ventas (subrutas bajo /ventas)
app.get('/ventas/vendedores.html', (req, res) =>
  res.sendFile(join(htmlDir, 'ventas/vendedores.html'))
);
app.get('/ventas/turnos.html', (req, res) =>
  res.sendFile(join(htmlDir, 'ventas/turnos.html'))
);
app.get('/ventas/promociones.html', (req, res) =>
  res.sendFile(join(htmlDir, 'ventas/promociones.html'))
);
app.get('/ventas/venta_nueva.html', (req, res) =>
  res.sendFile(join(htmlDir, 'ventas/vendedores/venta_nueva.html'))
);

// ── Iniciar servidor ────────────────────────────────
httpServer.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
  console.log('Socket.io listo para conexiones en el mismo puerto');
});
