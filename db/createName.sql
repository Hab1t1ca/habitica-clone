UPDATE users
SET "name" = $1
WHERE userid = $2
RETURNING *;