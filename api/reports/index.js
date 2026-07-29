import sql from '../_lib/db.js';
import { json, error, handleOptions } from '../_lib/response.js';
import { verifyToken } from '../_lib/auth.js';

export default async function handler(req, res) {
  if (handleOptions(req, res)) return;

  if (req.method === 'GET') {
    try {
      const { status, user_id } = req.query;
      let reports;
      
      if (status && user_id) {
        reports = await sql`SELECT * FROM reports WHERE status = ${status} AND user_id = ${user_id} ORDER BY created_at DESC LIMIT 20`;
      } else if (status) {
        reports = await sql`SELECT * FROM reports WHERE status = ${status} ORDER BY created_at DESC LIMIT 20`;
      } else if (user_id) {
        reports = await sql`SELECT * FROM reports WHERE user_id = ${user_id} ORDER BY created_at DESC LIMIT 20`;
      } else {
        reports = await sql`SELECT * FROM reports ORDER BY created_at DESC LIMIT 20`;
      }
      
      return json(res, reports);
    } catch (err) {
      return error(res, err.message, 500);
    }
  }

  if (req.method === 'POST') {
    try {
      const decoded = verifyToken(req);
      const { category, description, photo_url, audio_url, latitude, longitude, address } = req.body;
      
      if (!category || !description) return error(res, 'Missing fields', 400);

      const reports = await sql`
        INSERT INTO reports (user_id, category, description, photo_url, audio_url, latitude, longitude, address)
        VALUES (${decoded.sub}, ${category}, ${description}, ${photo_url || null}, ${audio_url || null}, ${latitude || null}, ${longitude || null}, ${address || null})
        RETURNING *
      `;
      
      await sql`UPDATE users SET points = points + 10 WHERE id = ${decoded.sub}`;

      return json(res, reports[0], 201);
    } catch (err) {
      if (err.message === 'No token' || err.name === 'JsonWebTokenError') return error(res, 'Unauthorized', 401);
      return error(res, err.message, 500);
    }
  }

  return error(res, 'Method not allowed', 405);
}
