CREATE TABLE IF NOT EXISTS classes (
id SERIAL PRIMARY KEY,
className TEXT,
description TEXT,
abilities json NOT NULL
)