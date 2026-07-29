import sql from '../_lib/db.js';
import { json, error, handleOptions } from '../_lib/response.js';

export default async function handler(req, res) {
  if (handleOptions(req, res)) return;

  if (req.method !== 'GET') return error(res, 'Method not allowed', 405);

  try {
    const polls = await sql`SELECT * FROM polls WHERE is_active = true ORDER BY created_at DESC LIMIT 1`;
    if (polls.length === 0) return json(res, null);

    const options = await sql`SELECT * FROM poll_options WHERE poll_id = ${polls[0].id}`;
    
    return json(res, {
      ...polls[0],
      options
    });
  } catch (err) {
    return error(res, err.message, 500);
  }
}
