import sql from './_lib/db.js';
import { json, error, handleOptions } from './_lib/response.js';
import { verifyToken } from './_lib/auth.js';

export default async function handler(req, res) {
  if (handleOptions(req, res)) return;

  if (req.method !== 'GET') return error(res, 'Method not allowed', 405);

  try {
    const decoded = verifyToken(req);
    const userRole = decoded.role;

    const alerts = await sql`
      SELECT * FROM alerts
      WHERE target_role IS NULL OR target_role = ${userRole}
      ORDER BY created_at DESC
      LIMIT 20
    `;

    return json(res, alerts);
  } catch (err) {
    return error(res, err.message || 'Unauthorized', 401);
  }
}
