UPDATE users
SET (lvl, hp, mana, nextexp, currentexp, gold) = {$1, $2, $3, $4, $5, $6}
WHERE userid = $7
RETURNING *;