
INSERT INTO inventory(itemid, userid)
VALUES
($1, $2)
RETURNING *;