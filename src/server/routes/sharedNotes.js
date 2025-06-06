// src/server/routes/sharedNotes.js
import { Router } from 'express';
import pkg from 'pg';
import { getIO } from '../socket.js';

const { Pool } = pkg;
const pool = new Pool({ connectionString: process.env.DB_URL });
const router = Router();

/**
 * GET /api/shared_notes
 * → devolvemos sólo la forma que el front espera (camelCase)
 */
// src/server/routes/sharedNotes.js
router.get('/', async (req, res) => {
  const userId = parseInt(req.header('x-user-id'), 10);
  try {
    const { rows } = await pool.query(`
      SELECT
        sn.id,
        sn.sender_id,
        u.role            AS sender_role,
        sn.note_content   AS content,
        sn.x,             -- posición X
        sn.y,             -- posición Y
        sn.width,         -- ancho
        sn.height,        -- alto
        sn.bg_color,      -- color de fondo
        sn.alarm_on,      -- alarma activada
        sn.alarm_time,    -- hora de alarma
        sn.created_at
      FROM shared_notes sn
      JOIN users u ON u.id = sn.sender_id
      WHERE sn.recipient_id = $1
    `, [userId]);

    // mapeo a camelCase, etc...
    const notes = rows.map(r => ({
      id:            r.id,
      senderId:      r.sender_id,
      senderRole:    r.sender_role,
      content:       r.content,
      x:             r.x,
      y:             r.y,
      width:         r.width,
      height:        r.height,
      bgColor:       r.bg_color,
      alarmOn:       r.alarm_on,
      alarmDateTime: r.alarm_time,
      createdAt:     r.created_at,
      editing:       false,
      shared:        true
    }));

    return res.json(notes);
  } catch (err) {
    console.error('Error fetching shared_notes:', err);
    return res.status(500).json([]);
  }
});


/**
 * POST /api/shared_notes
 * → insertamos y emitimos la nota compartida en camelCase
 */
router.post('/', async (req, res) => {
  const {
    senderId, recipientId, noteContent,
    x, y, width, height, bg_color, alarm_on, alarm_time
  } = req.body;

  try {
    const { rows } = await pool.query(`
      INSERT INTO shared_notes (
        sender_id, recipient_id, note_content,
        x, y, width, height, bg_color, alarm_on, alarm_time
      ) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)
      RETURNING *
    `, [
      senderId, recipientId, noteContent,
      x, y, width, height, bg_color, alarm_on, alarm_time
    ]);

    const raw = rows[0];
    // aquí también mapeamos a camelCase
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

    // emitimos esa pieza ya mapeada
    getIO().emit('noteShared', notification);

    return res.json({ success: true, notification });
  } catch (err) {
    console.error('Error en POST /api/shared_notes:', err);
    return res.status(500).json({ success: false });
  }
});

// DELETE /api/shared_notes/:id
router.delete('/:id', async (req, res) => {
  const noteId = parseInt(req.params.id, 10);
  // 1) Sacamos el recipient_id
  const { rows } = await pool.query(
    `SELECT recipient_id FROM shared_notes WHERE id = $1`,
    [noteId]
  );
  if (!rows.length) return res.status(404).json({ success: false });

  const recipientId = rows[0].recipient_id;

    // ─── Aquí añade este log ────────────────────────
  console.log('🔴 [SERVER] emitendo sharedNoteDeleted:', { id: noteId, recipientId });
  // ────────────────────────────────────────────────

  // 2) Emitimos en camelCase
  getIO().emit('sharedNoteDeleted', {
    id,           // id de la nota
    recipientId   // en camelCase
  });

  // 3) No borramos de la DB
  res.json({ success: true });
});

export default router;
