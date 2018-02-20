INSERT INTO users 
(name, authID, hp, mana, avatar, list, class, lvl, gold, message)
values
($1, $2, 50, 50, $3, $4, $5, 1, 0, $8)
returning *;
