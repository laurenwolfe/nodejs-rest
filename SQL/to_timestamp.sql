ALTER TABLE spd_911_reports
ALTER COLUMN call_time
TYPE timestamp
USING EXTRACT()to_timestamp(call_time, 'YYYY-MM-DD HH24:MI:SS');