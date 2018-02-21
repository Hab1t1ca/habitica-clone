insert into auth_user
(authid)
values
($1)
returning *;