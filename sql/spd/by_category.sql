SELECT * FROM spd_911_reports AS r
JOIN incident_categories AS c
    ON c.event_type = r.event_type
WHERE c.category_id = $1
ORDER BY tstamp DESC
LIMIT $2 OFFSET $3