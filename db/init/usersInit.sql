CREATE TABLE IF NOT EXISTS users (
id SERIAL PRIMARY KEY, 
name TEXT,
authID TEXT,
userId SERIAL,
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