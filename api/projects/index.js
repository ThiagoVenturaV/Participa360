import sql from '../_lib/db.js';
import { json, error, handleOptions } from '../_lib/response.js';
import { verifyToken } from '../_lib/auth.js';

export default async function handler(req, res) {
  if (handleOptions(req, res)) return;

  if (req.method === 'GET') {
    try {
      const projects = await sql`SELECT * FROM projects ORDER BY created_at DESC`;
      return json(res, projects);
    } catch (err) {
      return error(res, err.message, 500);
    }
  }

  if (req.method === 'POST') {
    try {
      const decoded = verifyToken(req);
      if (decoded.role !== 'prefeitura' && decoded.role !== 'lider') return error(res, 'Forbidden', 403);

      const { title, description } = req.body;
      if (!title) return error(res, 'Missing title', 400);

      const projects = await sql`
        INSERT INTO projects (title, description, created_by)
        VALUES (${title}, ${description || null}, ${decoded.sub})
        RETURNING *
      `;
      return json(res, projects[0], 201);
    } catch (err) {
      if (err.message === 'No token' || err.name === 'JsonWebTokenError') return error(res, 'Unauthorized', 401);
      return error(res, err.message, 500);
    }
  }

  return error(res, 'Method not allowed', 405);
}
