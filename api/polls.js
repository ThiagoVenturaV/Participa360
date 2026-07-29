import sql from './_lib/db.js';
import { json, error, handleOptions } from './_lib/response.js';
import { verifyToken } from './_lib/auth.js';

export default async function handler(req, res) {
  if (handleOptions(req, res)) return;

  const url = new URL(req.url, `http://${req.headers.host || 'localhost'}`);
  const action = req.query.action || url.pathname.split('/').pop();

  try {
    if (action === 'vote' && req.method === 'POST') {
      const decoded = verifyToken(req);
      const { poll_id, option_id } = req.body || {};

      if (!poll_id || !option_id) return error(res, 'Missing poll_id or option_id', 400);

      const existingVotes = await sql`
        SELECT id FROM poll_votes WHERE poll_id = ${poll_id} AND user_id = ${decoded.sub}
      `;
      if (existingVotes.length > 0) return error(res, 'Already voted in this poll', 400);

      await sql`
        INSERT INTO poll_votes (poll_id, option_id, user_id)
        VALUES (${poll_id}, ${option_id}, ${decoded.sub})
      `;

      await sql`UPDATE poll_options SET votes_count = votes_count + 1 WHERE id = ${option_id}`;
      await sql`UPDATE users SET points = points + 5 WHERE id = ${decoded.sub}`;

      return json(res, { success: true, message: 'Vote registered successfully (+5 pts)' });
    }

    if (req.method === 'GET') {
      const polls = await sql`SELECT * FROM polls WHERE active = true LIMIT 1`;
      if (polls.length === 0) return json(res, null);

      const poll = polls[0];
      const options = await sql`SELECT * FROM poll_options WHERE poll_id = ${poll.id}`;

      return json(res, { ...poll, options });
    }

    return error(res, 'Method not allowed', 405);
  } catch (err) {
    return error(res, err.message || 'Internal Error', 500);
  }
}
