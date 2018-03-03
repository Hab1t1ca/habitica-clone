UPDATE users
SET ("class", "inventory") = ($1, array_append(inventory,1))
WHERE userid = $2
RETURNING *;