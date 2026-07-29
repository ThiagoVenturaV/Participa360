import sql from '../_lib/db.js';
import { json, error, handleOptions } from '../_lib/response.js';
import * as argon2 from 'argon2';
import jwt from 'jsonwebtoken';

export default async function handler(req, res) {
  if (handleOptions(req, res)) return;

  if (req.method !== 'POST') return error(res, 'Method not allowed', 405);

  try {
    const { name, email, password, role = 'morador' } = req.body;
    
    if (!name || !email || !password) {
      return error(res, 'Missing fields', 400);
    }

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
      { expiresIn: '7d' }
    );

    return json(res, { token, user });
  } catch (err) {
    if (err.message.includes('unique constraint')) {
      return error(res, 'Email already exists', 400);
    }
    return error(res, err.message, 500);
  }
}
