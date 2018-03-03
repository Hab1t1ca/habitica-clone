

SELECT "equipped" from users
WHERE userid = $1;

-- SELECT * FROM items JOIN users
-- WHERE items.itemid = users.equipped

-- SELECT t.*
-- FROM unnest(ARRAY[1,2,3,2,3,5]) item_id
-- LEFT JOIN items t on t.id=item_id