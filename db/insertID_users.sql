INSERT INTO users
(userid)
VALUES
($1)
RETURNING *;