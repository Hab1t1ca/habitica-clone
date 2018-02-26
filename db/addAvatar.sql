UPDATE users
SET "avatar" = $1
WHERE userid = $2
RETURNING *;