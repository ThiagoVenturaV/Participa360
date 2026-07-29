import sql from '../../_lib/db.js';
import { json, error, handleOptions } from '../../_lib/response.js';
import { verifyToken } from '../../_lib/auth.js';

export default async function handler(req, res) {
  if (handleOptions(req, res)) return;

  const { id } = req.query;

  if (req.method === 'GET') {
    try {
      const reports = await sql`SELECT * FROM reports WHERE id = ${id}`;
      if (reports.length === 0) return error(res, 'Not found', 404);
      return json(res, reports[0]);
    } catch (err) {
      return error(res, err.message, 500);
    }
  }

  if (req.method === 'PATCH') {
    try {
      const decoded = verifyToken(req);
      if (decoded.role !== 'prefeitura') return error(res, 'Forbidden', 403);

      const { status, progress } = req.body;
      const reports = await sql`SELECT * FROM reports WHERE id = ${id}`;
      
      if (reports.length === 0) return error(res, 'Not found', 404);

      let updateQuery;
      if (status === 'resolvido') {
        updateQuery = await sql`
          UPDATE reports SET status = ${status || reports[0].status}, progress = ${progress !== undefined ? progress : reports[0].progress}, resolved_at = NOW()
          WHERE id = ${id} RETURNING *
        `;
      } else {
        updateQuery = await sql`
          UPDATE reports SET status = ${status || reports[0].status}, progress = ${progress !== undefined ? progress : reports[0].progress}
          WHERE id = ${id} RETURNING *
        `;
      }

      return json(res, updateQuery[0]);
    } catch (err) {
      if (err.message === 'No token' || err.name === 'JsonWebTokenError') return error(res, 'Unauthorized', 401);
      return error(res, err.message, 500);
    }
  }

  return error(res, 'Method not allowed', 405);
}
