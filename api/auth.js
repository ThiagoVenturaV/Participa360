import sql from './_lib/db.js';
import { json, error, handleOptions } from './_lib/response.js';
import { verifyToken } from './_lib/auth.js';
import * as argon2 from 'argon2';
import jwt from 'jsonwebtoken';

export default async function handler(req, res) {
  if (handleOptions(req, res)) return;

  const url = new URL(req.url, `http://${req.headers.host || 'localhost'}`);
  const action = req.query.action || url.pathname.split('/').pop();

  try {
    if (action === 'login' && req.method === 'POST') {
      const { email, password } = req.body || {};
      if (!email || !password) return error(res, 'Missing fields', 400);

      const users = await sql`SELECT * FROM users WHERE email = ${email}`;
      if (users.length === 0) return error(res, 'Invalid credentials', 401);

      const user = users[0];
      const valid = await argon2.verify(user.password_hash, password);
      if (!valid) return error(res, 'Invalid credentials', 401);

      const token = jwt.sign(
        { sub: user.id, role: user.role, name: user.name },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
      );

      const userData = {
        id: user.id,
        name: user.name,
        role: user.role,
        points: user.points,
        level: user.level,
        avatar_url: user.avatar_url,
        neighborhood: user.neighborhood
      };

      return json(res, { token, user: userData });
    }

    if (action === 'register' && req.method === 'POST') {
      const { name, email, password, role = 'morador' } = req.body || {};
      if (!name || !email || !password) return error(res, 'Missing fields', 400);

      const passwordHash = await argon2.hash(password);

      const users = await sql`
        INSERT INTO users (name, email, password_hash, role)
        VALUES (${name}, ${email}, ${passwordHash}, ${role})
        RETURNING id, name, role, points, level, avatar_url, neighborhood
      `;

      const user = users[0];

      const token = jwt.sign(
        { sub: user.id, role: user.role, name: user.name },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
      );

      return json(res, { token, user });
    }

    if (action === 'me' && req.method === 'GET') {
      const decoded = verifyToken(req);
      const users = await sql`
        SELECT id, name, email, role, points, level, avatar_url, neighborhood, created_at
        FROM users WHERE id = ${decoded.sub}
      `;
      if (users.length === 0) return error(res, 'User not found', 404);
      return json(res, users[0]);
    }

    return error(res, 'Action or method not supported', 404);
  } catch (err) {
    if (err.message?.includes('unique constraint')) {
      return error(res, 'Email already exists', 400);
    }
    return error(res, err.message || 'Internal Server Error', 500);
  }
}
