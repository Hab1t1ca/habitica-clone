update users
set equipped = array_remove(equipped, $1)
where userid = $2;
