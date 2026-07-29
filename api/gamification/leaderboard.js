import sql from '../_lib/db.js';
import { json, error, handleOptions } from '../_lib/response.js';

export default async function handler(req, res) {
  if (handleOptions(req, res)) return;

  if (req.method !== 'GET') return error(res, 'Method not allowed', 405);

  try {
    const users = await sql`
      SELECT name, points, level, avatar_url 
      FROM users 
      ORDER BY points DESC 
      LIMIT 10
    `;
    
    return json(res, users);
  } catch (err) {
    return error(res, err.message, 500);
  }
}
