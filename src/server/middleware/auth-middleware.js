// src/server/middleware/auth-middleware.js
export function requireUserId(req, res, next) {
  const header = req.header('x-user-id');
  const userId = parseInt(header, 10);
  if (!Number.isInteger(userId)) {
    return res
      .status(401)
      .json({ error: 'No estás autenticado (x-user-id inválido)' });
  }
  req.userId = userId;
  next();
}
