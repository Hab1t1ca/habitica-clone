INSERT INTO users 
(name, hp, mana, avatar, list, class, lvl, gold, message)
values
($1, 50, 50, $2, $3, $4, 1, 0, $5)
returning *;
