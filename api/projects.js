import sql from './_lib/db.js';
import { json, error, handleOptions } from './_lib/response.js';
import { verifyToken } from './_lib/auth.js';

export default async function handler(req, res) {
  if (handleOptions(req, res)) return;

  const url = new URL(req.url, `http://${req.headers.host || 'localhost'}`);
  const id = req.query.id || (url.pathname.split('/').length > 3 ? url.pathname.split('/').pop() : null);

  try {
    if (!id || id === 'projects' || id === 'index') {
      if (req.method === 'GET') {
        const projects = await sql`SELECT * FROM projects ORDER BY created_at DESC`;
        return json(res, projects);
      }

      if (req.method === 'POST') {
        const decoded = verifyToken(req);
        if (decoded.role !== 'prefeitura' && decoded.role !== 'lider') {
          return error(res, 'Forbidden', 403);
        }

        const { title, description, location, neighborhood, hero_image_url, volunteer_slots } = req.body || {};
        if (!title) return error(res, 'Title is required', 400);

        const projects = await sql`
          INSERT INTO projects (title, description, location, neighborhood, hero_image_url, volunteer_slots)
          VALUES (${title}, ${description || ''}, ${location || ''}, ${neighborhood || ''}, ${hero_image_url || null}, ${volunteer_slots || 0})
          RETURNING *
        `;

        return json(res, projects[0]);
      }
    } else {
      if (req.method === 'GET') {
        const projects = await sql`SELECT * FROM projects WHERE id = ${id}`;
        if (projects.length === 0) return error(res, 'Project not found', 404);

        const phases = await sql`SELECT * FROM project_phases WHERE project_id = ${id} ORDER BY sort_order ASC`;
        return json(res, { ...projects[0], phases });
      }
    }

    return error(res, 'Method not allowed', 405);
  } catch (err) {
    return error(res, err.message || 'Internal Error', 500);
  }
}
