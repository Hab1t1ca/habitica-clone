const lvlFns = require('./onLvl.js');

module.exports = {

    createName: (req,res) =>{
        const db = req.app.get('db');
        let userid = req.session.passport.user.userid;
        let {name} = req.body;
        console.log('name me', name)

        db.createName([name, userid]).then(user => {
            res.send(user[0])
        }).catch(e=>console.log(e))
    },

    addClass: (req,res) =>{//and add default items
        const db = req.app.get('db');
        let {Class} = req.body;
        var userid = req.session.passport.user.userid;

        var itemid = 10;
        db.addDefaultItem([itemid, userid]).then(results=>{//adds DevMountain Hat and Stick
            itemid = 101;
            db.addDefaultItem([itemid,userid]).then(resp=>{
                return results
            })
        })
        
        console.log("adding item to inveotry table", itemid, userid);

        db.addDefaultItemToInvenTable([userid,itemid]).then(results=>{
            itemid = 101;
            db.addDefaultItemToInvenTable([userid, itemid]).then(resp=>{
                return resp
            }).catch(e=>console.log(e))
        }).catch(e=>console.log(e))

        db.createClass([Class, userid]).then(user => {
            res.send(user[0])
        }).catch(e=>console.log(e))
    },

    getitems: (req,res) =>{
        let db = req.app.get('db');

        db.getItems().then(items=>{
            res.send(items)//returning an array of items
        }).catch(e=>console.log(e))
    },

    buyItem: (req,res) =>{
        let db = req.app.get('db');
        let userid = req.session.passport.user.userid;
        let {userGold, itemid, cost} = req.body;
        userGold-=cost;
        db.goldBuyItem([userGold,userid]).then(user=>{
            return user[0]
        })

        db.putItemInUserInven([itemid, userid]).then(item=>{
            return item
        })

        db.buyItem([itemid, userid]).then(item =>{
            res.send(item)
        }).catch(e=>console.log(e))
    },

    buyPotion: (req,res) =>{
        let db = req.app.get('db');
        let userid = req.session.passport.user.userid;
        let {userGold, itemid, cost, hp, mp, maxhp, maxmana} = req.body;
        console.log(userGold, itemid, cost, userid, hp, mp, maxhp, maxmana,"potion stuff")
        userGold -= cost;

        db.goldBuyItem([userGold,userid]).then(user=>{
            return user[0]
        })

        if(itemid == 201){
            console.log('hitting health potion', hp, userid)
            let add = maxhp - hp
            if(add <= 10){
                hp += add
            }
            db.buyHealth([hp, userid]).then(item =>{
                res.send(item)
            }).catch(e=>console.log(e))
    }
        if(itemid == 202){

            let add = maxmana - mp
            if(add <= 10){
                mp += add
            }
        db.buyMana([mp, userid]).then(item =>{
            res.send(item)
        }).catch(e=>console.log(e))
    }
    }
    ,

    getEquipped: (req,res)=>{
        let db = req.app.get('db');
        let userid = req.session.passport.user.userid;

        db.getEquipped([userid]).then(item =>{
            res.send(item)
        }).catch(e=>console.log(e))
    }
    ,
    
    equipItem: (req,res)=>{
        let db = req.app.get('db');
        let userid = req.session.passport.user.userid;
        let {itemid} = req.body;

        db.equipItem([itemid, userid]).then(item =>{
            res.send(item)
        }).catch(e=>console.log(e))

    }

    ,
    getUser: (req,res)=>{
        console.log("session", req.session.passport.user.userid)
        const userid = req.session.passport.user.userid;
        let db = req.app.get('db');
        db.getUser([userid]).then(user=>{
            res.send(user[0]) //this sends all the user data. We will need to filter out the data on the front end for what we want in each component. But this will put all user data into the Store. 
        }).catch(e=>console.log(e))
    },

    addDaily: (req, res)=>{
        
        let userid = req.user;
        let db = req.app.get('db');
        let {daily} = req.body;
        let age = 0;

        // let userid = 1; this one is for doing the unit tests

        db.addDaily([daily, userid, age]).then(dailies=>{
            res.send(dailies);//returns an array of an object. NOTE: THIS ONLY RETURNS THE DAILY YOU JUST POSTED, NOT THE ENTIRE DB. 
        }).catch(e=>console.log(e))
    },

    getLists: (req,res)=>{
        let userid = req.user;
        console.log('get lists userid', userid)
        let db = req.app.get('db');
        // let userid = 1; //this is for testing purposes

        db.getLists([userid]).then(listitems=>{
            res.send(listitems)
        }).catch(e=>console.log(e))
    },

    addTodo: (req,res)=>{
        let userid = req.session.passport.user.userid;
        let db = req.app.get('db');
        let {todo} = req.body;
        let d = new Date();
        let age = d.toString().substring(0,15)
        // let userid = 1; //for testing purposes

        db.addTodo([todo, userid, age]).then(todos=>{
            res.send(todos)
        }).catch(e=>console.log(e))
    },

    deleteTask: (req,res)=>{
        let db = req.app.get('db');
        let listid = req.params.listid;
        let userid = req.session.passport.user.userid;

        db.deleteTask([listid]).then(results=>{
            db.getLists([userid]).then(lists=>{
                res.send(lists);
            })
        }).catch(e=>console.log(e))
    },

    checkLvl: (user, db)=>{//this function runs inside of updateXPGold
        console.log('checking lvl user', user);
        if (user.currentexp>=user.nextexp){
            let {lvl, nextexp, currentexp, gold, mana, userid, hp} = user;
            lvl+=1;
            currentexp = 0;
            gold+=lvlFns.goldCalc(lvl);
            hp = lvlFns.generalHealthCalc(lvl);
            mana = lvlFns.generalMana(lvl);
            nextexp += 15;
            // console.log("what up", lvl, nextexp, currentexp, gold, mana, userid, hp);
            db.updateLvl([lvl, hp, mana, nextexp, currentexp, gold, userid]).then(user=>{
                return user;
            }).catch(e=>console.log(e))
        }
        else{
            return user;
        }
    },

    updateXPGold: (req,res)=>{
        let {XP, Gold} = req.body;
        let userid = req.session.passport.user.userid;
        let db = req.app.get('db');

        db.updateXPGold([Gold,XP,userid]).then(user=>{
            console.log(user[0], 'update xp user')
            let response = module.exports.checkLvl(user[0], db)
            res.send(response);
        }).catch(e=>console.log(e))
    },

    complete: (req,res)=>{
        let listid = req.params.listid;
        let {damage} = req.body;
        let userid = req.session.passport.user.userid;
        let db = req.app.get('db');
        damage += 1;
        console.log("completing daily", req.body, damage)
        db.updateUserDmg([damage,userid]).then(user=>{
            return user
        })

        db.completeDaily([listid]).then(daily=>{
            res.send(daily);
        }).catch(e=>console.log(e))
    },

    avatar: (req,res)=>{
        let {avatar} = req.body;
        let userid = req.session.passport.user.userid;

        req.app.get('db').addAvatar([avatar, userid]).then(user=>{
            res.send(user[0]);
        }).catch(e=>console.log(e))
    },

    editTask: (req,res)=>{
        let {content, id, duedate} = req.body;

        req.app.get('db').editTask([content, id, duedate]).then(task=>{
            res.send(task);
        })
    },

    logout: (req, res) => {
        req.logOut();
        res.redirect('https://sticktoit.auth0.com/v2/logout?returnTo=http%3A%2F%2Flocalhost%3A3000%2F')
      },

    pullInventory: (req,res)=>{
        let userid = req.session.passport.user.userid;

        req.app.get("db").getInventoryInfo([userid]).then(inventory=>{
            res.send(inventory);
        })
    },

    getClasses: (req,res)=>{
        req.app.get('db').getClasses().then(classes=>{
            res.send(classes)
        })
    },

    getUserAbilities: (req,res)=>{
        let userid = req.session.passport.user.userid;

        req.app.get('db').getUserAbilities([userid]).then(results=>{
            res.send(results[0]);
        })
    },

    useAbility: (req,res)=>{
        let {hp, mana, currentexp, gold, dailies, status, damage} = req.body;
        let db = req.app.get('db');
        let userid = req.session.passport.user.userid;

        db.userAbilityUpdate([hp,mana,gold,currentexp,userid,damage]).then(user=>{
            return user
        })

        if (status===true){
            dailies.forEach(daily=>{
                let id = daily.id;
                db.dailyAbility([id]).then(results=>{
                    return results
                })
            })
        }
    },

    getQuests: (req,res)=>{
        let db = req.app.get('db');
        let userid = req.session.passport.user.userid;

        db.getQuests([userid]).then(quest =>{
            res.send(quest)
        }).catch(e=>console.log(e))
    }
}