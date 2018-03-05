UPDATE users
SET "inventory" = array_append(inventory,$1)
WHERE userid = $2;