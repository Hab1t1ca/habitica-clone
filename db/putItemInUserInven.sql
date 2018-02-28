update users
set "inventory" = array_append(inventory, $1)
where userid = $2
returning *;