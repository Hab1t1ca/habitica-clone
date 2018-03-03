UPDATE users
SET ("class", "inventory") = ($1, array_append(inventory,101))
WHERE userid = $2