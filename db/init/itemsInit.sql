CREATE TABLE IF NOT EXISTS items (
id SERIAL PRIMARY KEY,
itemId TEXT,
name TEXT,
description TEXT,
lvlAvailable INTEGER,
image TEXT,
stats json NOT NULL,
cost INTEGER,
bodlocation TEXT,
class TEXT
)