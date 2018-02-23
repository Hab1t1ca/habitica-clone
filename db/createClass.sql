UPDATE users
SET "class" = $1
WHERE userid = $2
RETURNING *;