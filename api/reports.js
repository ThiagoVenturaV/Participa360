import sql from './_lib/db.js';
import { json, error, handleOptions } from './_lib/response.js';
import { verifyToken } from './_lib/auth.js';

export default async function handler(req, res) {
  if (handleOptions(req, res)) return;

  const url = new URL(req.url, `http://${req.headers.host || 'localhost'}`);
  const id = req.query.id || (url.pathname.split('/').length > 3 ? url.pathname.split('/').pop() : null);

  try {
    if (!id || id === 'reports' || id === 'index') {
      if (req.method === 'GET') {
        const { status, user_id } = req.query;
        let query = 'SELECT r.*, u.name as author_name, u.avatar_url as author_avatar FROM reports r JOIN users u ON r.user_id = u.id WHERE 1=1';
        
        if (status && status !== 'Todos') {
          const statusMap = { 'Em análise': 'em_analise', 'Em execução': 'em_execucao', 'Resolvido': 'resolvido' };
          const dbStatus = statusMap[status] || status;
          query += ` AND r.status = '${dbStatus}'`;
        }
        if (user_id) query += ` AND r.user_id = '${user_id}'`;
        query += ' ORDER BY r.created_at DESC LIMIT 50';

        const reports = await sql(query);
        return json(res, reports);
      }

      if (req.method === 'POST') {
        const decoded = verifyToken(req);
        const { category, description, photo_url, audio_url, latitude, longitude, address } = req.body || {};

        if (!category) return error(res, 'Category is required', 400);

        const reports = await sql`
          INSERT INTO reports (user_id, category, description, photo_url, audio_url, latitude, longitude, address)
          VALUES (${decoded.sub}, ${category}, ${description || ''}, ${photo_url || null}, ${audio_url || null}, ${latitude || null}, ${longitude || null}, ${address || ''})
          RETURNING *
        `;

        // Grant 10 points to user
        await sql`UPDATE users SET points = points + 10 WHERE id = ${decoded.sub}`;

        return json(res, reports[0]);
      }
    } else {
      if (req.method === 'GET') {
        const reports = await sql`
          SELECT r.*, u.name as author_name, u.avatar_url as author_avatar
          FROM reports r JOIN users u ON r.user_id = u.id WHERE r.id = ${id}
        `;
        if (reports.length === 0) return error(res, 'Report not found', 404);
        return json(res, reports[0]);
      }

      if (req.method === 'PATCH') {
        const decoded = verifyToken(req);
        if (decoded.role !== 'prefeitura' && decoded.role !== 'lider') {
          return error(res, 'Forbidden', 403);
        }

        const { status, progress } = req.body || {};
        const isResolved = status === 'resolvido';

        const reports = await sql`
          UPDATE reports
          SET status = COALESCE(${status}, status),
              progress = COALESCE(${progress}, progress),
              resolved_at = CASE WHEN ${isResolved} THEN NOW() ELSE resolved_at END
          WHERE id = ${id}
          RETURNING *
        `;

        if (reports.length === 0) return error(res, 'Report not found', 404);
        return json(res, reports[0]);
      }
    }

    return error(res, 'Method not allowed', 405);
  } catch (err) {
    return error(res, err.message || 'Internal Error', 500);
  }
}
