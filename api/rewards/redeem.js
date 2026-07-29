import sql from '../_lib/db.js';
import { json, error, handleOptions } from '../_lib/response.js';
import { verifyToken } from '../_lib/auth.js';

export default async function handler(req, res) {
  if (handleOptions(req, res)) return;

  if (req.method !== 'POST') return error(res, 'Method not allowed', 405);

  try {
    const decoded = verifyToken(req);
    const { reward_id } = req.body;
    
    if (!reward_id) return error(res, 'Missing reward_id', 400);

    const users = await sql`SELECT points FROM users WHERE id = ${decoded.sub}`;
    const rewards = await sql`SELECT points_cost, available FROM rewards WHERE id = ${reward_id}`;

    if (users.length === 0 || rewards.length === 0) return error(res, 'Not found', 404);
    if (!rewards[0].available) return error(res, 'Reward not available', 400);
    if (users[0].points < rewards[0].points_cost) return error(res, 'Not enough points', 400);

    await sql.begin(async (sql) => {
      await sql`UPDATE users SET points = points - ${rewards[0].points_cost} WHERE id = ${decoded.sub}`;
      await sql`INSERT INTO redemptions (user_id, reward_id) VALUES (${decoded.sub}, ${reward_id})`;
    });

    return json(res, { success: true });
  } catch (err) {
    if (err.message === 'No token' || err.name === 'JsonWebTokenError') return error(res, 'Unauthorized', 401);
    return error(res, err.message, 500);
  }
}
