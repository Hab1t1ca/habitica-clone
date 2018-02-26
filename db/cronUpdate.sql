UPDATE users
SET ("hp", "gold") = ($1, $2)
WHERE userid = $3
RETURNING *;