CREATE USER pg WITH PASSWORD 'pg';
CREATE DATABASE pg OWNER pg;
GRANT ALL PRIVILEGES ON DATABASE pg to pg;
ALTER DATABASE pg OWNER TO pg;