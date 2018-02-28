UPDATE users
SET "gold" = $1
WHERE userid = $2
RETURNING *;