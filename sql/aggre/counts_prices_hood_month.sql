SELECT hp.neighborhood, hp.year_mo, hp.ptype,
  round(avg(hp.price)) as price, events.num_events
FROM home_prices as hp
  INNER JOIN
  (
    select neighborhood, year_month, COUNT(*) as num_events
    from spd_911_reports
    GROUP BY neighborhood, year_month
    HAVING COUNT(*) > 0
    ORDER BY neighborhood, year_month
  ) AS events ON events.neighborhood = hp.neighborhood
       AND events.year_month = hp.year_mo
WHERE hp.year_mo BETWEEN $1 and $2
GROUP BY hp.neighborhood, hp.year_mo, hp.ptype, events.num_events
ORDER BY hp.neighborhood, hp.year_mo, hp.ptype
LIMIT $3 OFFSET $4