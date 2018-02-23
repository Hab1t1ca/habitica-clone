  UPDATE users 
    SET ("name", "hp", "mana", "lvl", "gold", "currentexp", "nextexp", "maxhp", "maxmana") = ($1, 50, 50, 1, 0, 0, 100, 50, 50)
    WHERE userid = $2;