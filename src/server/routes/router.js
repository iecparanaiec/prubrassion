import notesRouter from './notes.js';
// import notificationsRouter from './notifications.js'; // si lo tienes

export default function mountRouters(app) {
  app.use('/api/notes', notesRouter);
  // app.use('/api/notifications', notificationsRouter);
}
