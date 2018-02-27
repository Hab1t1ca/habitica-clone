UPDATE lists
SET "streak" = $1
WHERE id = $2
RETURNING *;