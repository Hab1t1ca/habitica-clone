
update users
set "equipped" = array_append(equipped, $1)
where userid = $2
return *;