CREATE TABLE IF NOT EXISTS users (
name TEXT,
authID TEXT,
userId SERIAL PRIMARY KEY,
hp INTEGER,
mana INTEGER,
avatar TEXT,
list TEXT[],
inventory TEXT[],
class TEXT[],
lvl INTEGER,
gold INTEGER,
message TEXT[]
)