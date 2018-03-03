update users
set ("hp", "damage", "quest", "bossdmg", "bosshp") = ($1, $2, $3, $4, $5)
where userid = $6
returning *;