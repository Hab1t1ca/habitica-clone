update users
set ("quest", "bosshp", "bossdmg") = ($1, $2, $3)
where userid = $4