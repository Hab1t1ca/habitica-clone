SELECT DISTINCT ON (items.name) items.name, items.description, items.image, items.stats, items.bodlocation
from items
join users
on inventory.itemId = items.itemId
