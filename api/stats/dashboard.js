import sql from '../_lib/db.js';
import { json, error, handleOptions } from '../_lib/response.js';
import { verifyToken } from '../_lib/auth.js';

export default async function handler(req, res) {
  if (handleOptions(req, res)) return;

  if (req.method !== 'GET') return error(res, 'Method not allowed', 405);

  try {
    const decoded = verifyToken(req);
    if (decoded.role !== 'prefeitura' && decoded.role !== 'empresa') return error(res, 'Forbidden', 403);

    const statsQuery = await sql`
      SELECT 
        COUNT(*) as total_reports,
        SUM(CASE WHEN status = 'resolvido' THEN 1 ELSE 0 END) as resolved_reports,
        SUM(CASE WHEN status != 'resolvido' THEN 1 ELSE 0 END) as active_reports
      FROM reports
    `;
    
    const stats = statsQuery[0];
    const engagement_rate = stats.total_reports > 0 ? (stats.resolved_reports / stats.total_reports) * 100 : 0;

    const categoryStats = await sql`
      SELECT category, COUNT(*) as count 
      FROM reports 
      GROUP BY category
    `;
    
    const thisWeekStatsQuery = await sql`
      SELECT COUNT(*) as count 
      FROM reports 
      WHERE created_at > CURRENT_DATE - INTERVAL '7 days'
    `;
    const lastWeekStatsQuery = await sql`
      SELECT COUNT(*) as count 
      FROM reports 
      WHERE created_at > CURRENT_DATE - INTERVAL '14 days' 
        AND created_at <= CURRENT_DATE - INTERVAL '7 days'
    `;

    return json(res, {
      ...stats,
      engagement_rate,
      reports_by_category: categoryStats,
      reports_this_week: thisWeekStatsQuery[0].count,
      reports_last_week: lastWeekStatsQuery[0].count
    });
  } catch (err) {
    if (err.message === 'No token' || err.name === 'JsonWebTokenError') return error(res, 'Unauthorized', 401);
    return error(res, err.message, 500);
  }
}
