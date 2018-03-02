update users
set ("hp", "mana", "gold", "currentexp", "damage") = ($1, $2, $3, $4, $6)
where userid = $5
returning *;