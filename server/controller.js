const lvlFns = require('./onLvl.js');

module.exports = {

    createName: (req,res) =>{
        const db = req.app.get('db');
        let userid = req.session.passport.user.userid;
        let {name} = req.body;
        console.log('name me', name)

        db.createName([name, userid]).then(user => {
            console.log('i am within you', user)
            res.send(user[0])
        }).catch(e=>console.log(e))
    },

    addClass: (req,res) =>{
        const db = req.app.get('db');
        let {Class} = req.body;
        let userid = req.session.passport.user.userid;

        console.log('classless like a Marxist Utopia', Class, userid);

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
        db.buyItem([req.body.itemid]).then(item =>{
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
        // console.log('request', req);
        
        let userid = req.user;
        // let userid = 13;
        let db = req.app.get('db');
        let {daily} = req.body;
        let d = new Date();
        let age = d.toString().substring(0,15)

        console.log('hitting add Daily', daily, userid, age)
        // let userid = 1; this one is for doing the unit tests

        db.addDaily([daily, userid, age]).then(dailies=>{
            console.log('daily added to db', dailies)
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

    updateXPGold: (req,res)=>{
        let {XP, Gold} = req.body;
        let userid = req.session.passport.user.userid;
        let db = req.app.get('db');

        db.updateXPGold([Gold,XP,userid]).then(user=>{
            checkLvl(user[0]);
        })
    },

    streak: (req,res)=>{
        //pull streak number off of the req.body. and we will need list item number. 

        req.app.get('db').updateStreak([/*streak*/]).then(user=>{
            res.send(user[0]);
        })
    },

    complete: (req,res)=>{
        let listid = req.params.listid;

        req.app.get('db').completeDaily([listid]).then(daily=>{
            res.send(daily);
        })
    },

    checkLvl: (req,res, user)=>{//this function runs inside of updateXPGold
        if (user.currentexp===user.nextexp){
            let {lvl, nextexp, currentexp, gold, mana, userid, hp} = user;
            lvl+=1;
            currentexp = 0;
            gold+=lvlFns.goldCalc(lvl);
            hp = lvlFns.generalHealthCalc(lvl);
            mana = lvlFns.generalMana(lvl);
            nextexp = 200; //don't have function right now. This is a placeholder. 
            db.updateLvl([lvl, hp, mana, nextexp, currentexp, gold, userid]).then(user=>{
                res.send(user[0]);
            })
        }
        else{
            res.send(user[0]);
        }
    }
}