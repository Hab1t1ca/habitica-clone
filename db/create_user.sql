INSERT INTO users 
(name, authid, hp, mana, avatar, list, class, lvl, gold, message)
values
($1, $2, 50, 50, $3, $4, $5, 1, 0, $6)
returning *;
