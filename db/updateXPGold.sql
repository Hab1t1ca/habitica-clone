UPDATE users
SET ("gold", "currentexp") = ($1, $2)
WHERE userid = $3
RETURNING *;
