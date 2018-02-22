UPDATE users
SET $1 = $2
WHERE userid = $3
RETURNING *;

