UPDATE lists
SET "content" = $1
WHERE id = $2
RETURNING *;