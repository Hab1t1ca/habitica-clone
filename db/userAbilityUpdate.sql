update users
set ("hp", "mana", "gold", "currentexp") = ($1, $2, $3, $4)
where userid = $5
returning *;