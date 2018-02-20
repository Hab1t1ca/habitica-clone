SELECT DISTINCT ON (inventory.itemid) inventory.itemid
join users
on inventory.userid = users.userid;
