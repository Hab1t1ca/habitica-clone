INSERT INTO lists (daily_todo, content, userid, age)
VALUES ('daily', $1, $2, $3)
RETURNING *;