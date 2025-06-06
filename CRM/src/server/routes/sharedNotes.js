// src/server/routes/sharedNotes.js
import { Router } from 'express';
import pkg from 'pg';
const { Pool } = pkg;
const pool = new Pool({ connectionString: process.env.DB_URL });

const router = Router();

router.get('/', async (req, res) => {
  const userId = parseInt(req.header('x-user-id'), 10);
  try {
    // Solo traer lo que existe realmente en shared_notes
    const { rows } = await pool.query(`
      SELECT id,
             note_content AS content,
             sender_id,
             created_at
        FROM shared_notes
       WHERE recipient_id = $1
    `, [userId]);

    // Mapear a la forma que espera tu front
    const notes = rows.map(r => ({
      id:             r.id,
      content:        r.content,
      x:              50,          // posición por defecto
      y:              50,
      width:          220,         // tamaño por defecto
      height:         120,
      bgColor:        '#333333',   // igual que tus notas “normales”
      alarmOn:        false,
      alarmDateTime:  null,
      editing:        false,
      shared:         true,
      senderId:       r.sender_id, // si lo necesitas en el front
      createdAt:      r.created_at // quizá quieras mostrarlo
    }));

    res.json(notes);

  } catch (err) {
    console.error('Error fetching shared_notes:', err);
    res.status(500).json([]);
  }
});

router.delete('/:id', async (req, res) => {
  const noteId = parseInt(req.params.id, 10);
  try {
    await pool.query('DELETE FROM shared_notes WHERE id = $1', [noteId]);
    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false });
  }
});

export default router;
