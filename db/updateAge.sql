update lists
set "age" = $1
where id = $2
returning *;