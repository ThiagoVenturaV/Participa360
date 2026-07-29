import sql from './_lib/db.js';
import { json, error, handleOptions } from './_lib/response.js';
import { verifyToken } from './_lib/auth.js';

export default async function handler(req, res) {
  if (handleOptions(req, res)) return;

  const url = new URL(req.url, `http://${req.headers.host || 'localhost'}`);
  const action = req.query.action || url.pathname.split('/').pop();

  try {
    if (action === 'redeem' && req.method === 'POST') {
      const decoded = verifyToken(req);
      const { reward_id } = req.body || {};

      if (!reward_id) return error(res, 'Reward ID is required', 400);

      const rewards = await sql`SELECT * FROM rewards WHERE id = ${reward_id} AND available = true`;
      if (rewards.length === 0) return error(res, 'Reward unavailable', 404);
      const reward = rewards[0];

      const users = await sql`SELECT points FROM users WHERE id = ${decoded.sub}`;
      if (users.length === 0) return error(res, 'User not found', 404);
      const user = users[0];

      if (user.points < reward.points_cost) {
        return error(res, 'Insufficient points', 400);
      }

      await sql`UPDATE users SET points = points - ${reward.points_cost} WHERE id = ${decoded.sub}`;
      await sql`
        INSERT INTO redemptions (user_id, reward_id, points_spent)
        VALUES (${decoded.sub}, ${reward_id}, ${reward.points_cost})
      `;

      return json(res, { success: true, message: 'Reward redeemed successfully', reward });
    }

    if (req.method === 'GET') {
      const rewards = await sql`SELECT * FROM rewards WHERE available = true ORDER BY points_cost ASC`;
      return json(res, rewards);
    }

    return error(res, 'Method not allowed', 405);
  } catch (err) {
    return error(res, err.message || 'Internal Error', 500);
  }
}
