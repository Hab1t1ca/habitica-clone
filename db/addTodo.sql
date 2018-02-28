INSERT INTO lists (daily_todo, content, userid, age)
VALUES ('todo', $1, $2, 0)
RETURNING *;