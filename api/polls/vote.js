import sql from '../_lib/db.js';
import { json, error, handleOptions } from '../_lib/response.js';
import { verifyToken } from '../_lib/auth.js';

export default async function handler(req, res) {
  if (handleOptions(req, res)) return;

  if (req.method !== 'POST') return error(res, 'Method not allowed', 405);

  try {
    const decoded = verifyToken(req);
    const { poll_id, option_id } = req.body;
    
    if (!poll_id || !option_id) return error(res, 'Missing fields', 400);

    await sql.begin(async (sql) => {
      await sql`INSERT INTO poll_votes (poll_id, user_id, option_id) VALUES (${poll_id}, ${decoded.sub}, ${option_id})`;
      await sql`UPDATE poll_options SET votes_count = votes_count + 1 WHERE id = ${option_id}`;
      await sql`UPDATE users SET points = points + 5 WHERE id = ${decoded.sub}`;
    });

    return json(res, { success: true });
  } catch (err) {
    if (err.message === 'No token' || err.name === 'JsonWebTokenError') return error(res, 'Unauthorized', 401);
    if (err.message.includes('unique constraint')) return error(res, 'Already voted', 400);
    return error(res, err.message, 500);
  }
}
