import { Router } from 'express';
import multer from 'multer';
import pkg from 'pg';
const { Pool } = pkg;

const pool = new Pool({ connectionString: process.env.DB_URL });

const router = Router();

// Para subir imágenes (opcional, si las tratas aparte)
const upload = multer({ dest: 'uploads/' });
router.post('/upload', upload.single('file'), (req, res) => {
  // req.file.path es la ruta en disco; podrías renombrar o mover...
  res.json({ url: `/uploads/${req.file.filename}` });
});

// CRUD notas
router.get('/', async (req, res) => {
  const userId = parseInt(req.header('x-user-id'), 10);
  const { rows } = await pool.query(
    `SELECT * FROM notes WHERE user_id=$1 ORDER BY updated_at DESC`,
    [userId]
  );
  res.json(rows);
});

router.post('/', async (req, res) => {
  const userId       = parseInt(req.header('x-user-id'), 10);
  const { content, x, y, width, height, bg_color, alarm_on, alarm_datetime } = req.body;
  const { rows } = await pool.query(
    ` INSERT INTO notes
    (user_id, content, x, y, width, height, bg_color, alarm_on, alarm_time)
     VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9)
     RETURNING *`,
    [userId, content, x, y, width, height, bg_color, alarm_on, alarm_datetime]
  );
  res.status(201).json(rows[0]);
});

router.put('/:id', async (req, res) => {
    const userId   = parseInt(req.header('x-user-id'),10);
    const noteId   = parseInt(req.params.id,10);
    const {
      content, x, y, width, height,
      bg_color, alarm_on, alarm_time
    } = req.body;
  
    const { rows } = await pool.query(`
      UPDATE notes
         SET content    = $1,
             x          = $2,
             y          = $3,
             width      = $4,
             height     = $5,
             bg_color   = $6,
             alarm_on   = $7,
             alarm_time = $8,
             updated_at = NOW()
       WHERE id = $9 AND user_id = $10
       RETURNING *;
    `, [
      content, x, y, width, height,
      bg_color, alarm_on, alarm_time,
      noteId, userId
    ]);
  
    if (!rows.length) {
      return res.status(404).json({ error: 'Nota no encontrada' });
    }
    res.json(rows[0]);
  });
  

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
