select * from inventory
join items on items.itemid = inventory.itemid
where userid = $1;