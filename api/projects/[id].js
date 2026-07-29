import sql from '../../_lib/db.js';
import { json, error, handleOptions } from '../../_lib/response.js';

export default async function handler(req, res) {
  if (handleOptions(req, res)) return;

  if (req.method !== 'GET') return error(res, 'Method not allowed', 405);

  const { id } = req.query;

  try {
    const projects = await sql`SELECT * FROM projects WHERE id = ${id}`;
    if (projects.length === 0) return error(res, 'Not found', 404);

    const phases = await sql`SELECT * FROM project_phases WHERE project_id = ${id} ORDER BY created_at ASC`;
    
    return json(res, {
      ...projects[0],
      phases
    });
  } catch (err) {
    return error(res, err.message, 500);
  }
}
