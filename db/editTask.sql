UPDATE lists
SET ("content", "duedate") = ($1, $3)
WHERE id = $2
RETURNING *;