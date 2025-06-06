import { Router } from 'express';
import multer from 'multer';
import pkg from 'pg';
const { Pool } = pkg;

const pool = new Pool({ connectionString: process.env.DB_URL });

const router = Router();

// Para subir imágenes (opcional, si las tratas aparte)
const upload = multer({ dest: 'uploads/' });
router.post('/upload', upload.single('file'), (req, res) => {
 
  res.json({ url: `/uploads/${req.file.filename}` });
});

// CRUD notas
// src/server/routes/notes.js  (GET /api/notes)
router.get('/', async (req, res) => {
  const userId = parseInt(req.header('x-user-id'), 10);
  const { rows } = await pool.query(`
    SELECT
      id,
      content,
      x, y, width, height,
      bg_color   AS "bgColor",
      alarm_on   AS "alarmOn",
      alarm_time AS "alarmDateTime"
    FROM notes
    WHERE user_id = $1
    ORDER BY updated_at DESC
  `, [userId]);
  res.json(rows);
});


// src/server/routes/notes.js

router.post('/', async (req, res) => {
  const userId = parseInt(req.header('x-user-id'), 10);

  // Destructuramos TODO en camelCase y snake_case
  const {
    content,
    x, y, width, height,
    /* snake */ bg_color, alarm_on, alarm_time, alarm_datetime,
    /* camel */ bgColor, alarmOn, alarmTime, alarmDateTime
  } = req.body;

  // 1) Mapear cualquier convención que venga del cliente:
  const bgColorToSave   = bg_color   ?? bgColor;
  const alarmOnToSave   = alarm_on   != null ? alarm_on
                         : alarmOn   != null ? alarmOn
                         : false;
  const alarmTimeToSave = alarm_time      != null ? alarm_time
                         : alarmTime      != null ? alarmTime
                         : alarm_datetime != null ? alarm_datetime
                         : alarmDateTime  != null ? alarmDateTime
                         : null;

  // 2) Validar que el cliente siempre envíe color
  if (!bgColorToSave) {
    return res.status(400).json({ error: 'El campo bg_color es obligatorio' });
  }

  try {
    const { rows } = await pool.query(
      `INSERT INTO notes
         ( user_id, content, x, y, width, height,
           bg_color, alarm_on, alarm_time
         )
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9)
       RETURNING *`,
      [
        userId, content, x, y, width, height,
        bgColorToSave, alarmOnToSave, alarmTimeToSave
      ]
    );
    return res.status(201).json(rows[0]);
  } catch (err) {
    console.error('Error creando nota:', err);
    return res.status(500).json({ error: 'Error interno al crear nota' });
  }
});  // ← Aquí cerramos el router.post

// src/server/routes/notes.js

// Ahora sí arrancamos el router.put
router.put('/:id', async (req, res) => {
  const userId = parseInt(req.header('x-user-id'), 10);
  const noteId = parseInt(req.params.id, 10);

  // Destructuramos tanto snake_case como camelCase
  const {
    content,
    x, y, width, height,
    /* snake */ bg_color, alarm_on, alarm_time,
    /* camel */ bgColor, alarmOn, alarmTime, alarmDateTime
  } = req.body;

  // Mapear a valores únicos que nunca sean null
  const bgColorToSave = bg_color ?? bgColor;
  const alarmOnToSave = alarm_on != null
                        ? alarm_on
                        : alarmOn != null
                          ? alarmOn
                          : false;
  const alarmTimeToSave = alarm_time != null
                          ? alarm_time
                          : alarmTime != null
                            ? alarmTime
                            : alarmDateTime != null
                              ? alarmDateTime
                              : null;

  // Validar que siempre haya color
  if (!bgColorToSave) {
    return res.status(400).json({ error: 'El campo bg_color es obligatorio' });
  }

  try {
    const { rows } = await pool.query(`
      UPDATE notes
         SET content     = $1,
             x           = $2,
             y           = $3,
             width       = $4,
             height      = $5,
             bg_color    = $6,
             alarm_on    = $7,
             alarm_time  = $8,
             updated_at  = NOW()
       WHERE id = $9 AND user_id = $10
       RETURNING *;
    `, [
      content,
      x, y, width, height,
      bgColorToSave,
      alarmOnToSave,
      alarmTimeToSave,
      noteId, userId
    ]);

    if (!rows.length) {
      return res.status(404).json({ error: 'Nota no encontrada' });
    }
    res.json(rows[0]);

  } catch (err) {
    console.error('Error actualizando nota:', err);
    res.status(500).json({ error: 'Error interno al actualizar nota' });
  }
});

// DELETE intacto
router.delete('/:id', async (req, res) => {
  const userId = parseInt(req.header('x-user-id'), 10);
  const noteId = parseInt(req.params.id, 10);
  await pool.query(
    `DELETE FROM notes WHERE id=$1 AND user_id=$2`,
    [noteId, userId]
  );
  res.json({ success: true });
});


export default router;

