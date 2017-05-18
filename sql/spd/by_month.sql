SELECT *
FROM spd_911_reports
WHERE year_month BETWEEN $1 AND $2
ORDER BY year_month DESC
LIMIT $3 OFFSET $4