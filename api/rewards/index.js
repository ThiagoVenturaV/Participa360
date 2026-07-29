import sql from '../_lib/db.js';
import { json, error, handleOptions } from '../_lib/response.js';

export default async function handler(req, res) {
  if (handleOptions(req, res)) return;

  if (req.method !== 'GET') return error(res, 'Method not allowed', 405);

  try {
    const rewards = await sql`SELECT * FROM rewards WHERE available = true ORDER BY points_cost ASC`;
    return json(res, rewards);
  } catch (err) {
    return error(res, err.message, 500);
  }
}
