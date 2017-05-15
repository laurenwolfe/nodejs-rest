DROP TABLE spd_911_reports;
DROP TABLE incident_categories;
DROP TABLE tracts_neighborhood_mapping;
DROP TABLE test_table;

CREATE TABLE IF NOT EXISTS spd_911_reports (
    event_id        BIGINT          PRIMARY KEY NOT NULL,
    neighborhood    VARCHAR(100)    NOT NULL,
    event_type      VARCHAR(100)    NOT NULL,
    call_time       VARCHAR(100)    NOT NULL,
    census_tract    NUMERIC,
    latitude        NUMERIC,
    longitude       NUMERIC
);

CREATE TABLE IF NOT EXISTS incident_categories (
    id INT PRIMARY KEY,
    category_id INT NOT NULL,
    event_type VARCHAR(100) NOT NULL
);

CREATE TABLE IF NOT EXISTS tracts_neighborhood_mapping (
    census_tract NUMERIC PRIMARY KEY NOT NULL,
    neighborhood VARCHAR(100) NOT NULL
);