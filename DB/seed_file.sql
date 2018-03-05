-- create Auth table
CREATE TABLE auth_user (
authid TEXT,
userid SERIAL PRIMARY KEY
)

-- create user table
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
damage INT, 
quest invnetory
)

-- create new user
INSERT INTO users 
(name, authID, hp, mana, avatar, list, inventory, class, lvl, gold, message)
values
($1, $2, 50, 50, $3, $4, $5, $6, $7, $8, $9)
returning *;

-- create inventory table
CREATE TABLE IF NOT EXISTS inventory (
id SERIAL PRIMARY KEY,
itemId TEXT,
userId SERIAL
)

-- join items to invnetory
SELECT DISTINCT ON (items.name) items.name, items.description, items.image, items.stats, items.bodlocation
from items
join users
on inventory.itemId = items.itemId

-- create items table
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

-- create inventory table
CREATE TABLE inventory (
id SERIAL PRIMARY KEY,
itemId TEXT,
userId SERIAL
)

-- create classes table
create table classes (class VARCHAR(50), ability1 json, ability2 json)

-- create class abilities
insert into classes (class, ability1, ability2)
values ('Mage', '{"name" : "Burst of Flames", "manacost" : 20, "description" : "You light the world on fire. You get +3 XP and you do +2 damage to bosses."}', '{"name" : "alchemy", "manacost" : 40, "description" : "You turn Utah tap water into gold! (It is not like you can drink it anyway.) You get +5 gold!"}'
)

-- create quests table
create table quests (name text, avatar text, description text, bosshp int, rewards json, bossdmg int, level int, id serial primary key)