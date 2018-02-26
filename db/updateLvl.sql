UPDATE users
SET (lvl, hp, mana, nextexp, currentexp, gold, maxhp, maxmana) = ($1, $2, $3, $4, $5, $6, $2, $3)
WHERE userid = $7
RETURNING *;