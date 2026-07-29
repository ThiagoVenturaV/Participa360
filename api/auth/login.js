import sql from '../_lib/db.js';
import { json, error, handleOptions } from '../_lib/response.js';
import * as argon2 from 'argon2';
import jwt from 'jsonwebtoken';

export default async function handler(req, res) {
  if (handleOptions(req, res)) return;

  if (req.method !== 'POST') return error(res, 'Method not allowed', 405);

  try {
    const { email, password } = req.body;
    
    if (!email || !password) {
      return error(res, 'Missing fields', 400);
    }

    const users = await sql`SELECT * FROM users WHERE email = ${email}`;
    if (users.length === 0) {
      return error(res, 'Invalid credentials', 401);
    }

    const user = users[0];
    const valid = await argon2.verify(user.password_hash, password);
    if (!valid) {
      return error(res, 'Invalid credentials', 401);
    }

    const token = jwt.sign(
      { sub: user.id, role: user.role, name: user.name },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
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
  } catch (err) {
    return error(res, err.message, 500);
  }
}
