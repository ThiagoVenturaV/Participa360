import sql from '../_lib/db.js';
import { json, error, handleOptions } from '../_lib/response.js';
import { verifyToken } from '../_lib/auth.js';

export default async function handler(req, res) {
  if (handleOptions(req, res)) return;

  if (req.method !== 'GET') return error(res, 'Method not allowed', 405);

  try {
    const decoded = verifyToken(req);
    
    const users = await sql`
      SELECT id, name, email, role, points, level, avatar_url, neighborhood, created_at
      FROM users WHERE id = ${decoded.sub}
    `;

    if (users.length === 0) return error(res, 'User not found', 404);

    return json(res, users[0]);
  } catch (err) {
    return error(res, 'Unauthorized', 401);
  }
}
