SELECT *
FROM spd_911_reports
WHERE neighborhood = $1
ORDER BY tstamp DESC
LIMIT $2 OFFSET $3