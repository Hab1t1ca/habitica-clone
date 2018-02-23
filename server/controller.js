

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
    
    getUser: (req,res)=>{
        console.log("session", req.session.passport.user.userid)
        const userid = req.session.passport.user.userid;
        let db = req.app.get('db');
        db.getUser([userid]).then(user=>{
            res.send(user[0]) //this sends all the user data. We will need to filter out the data on the front end for what we want in each component. But this will put all user data into the Store. 
        }).catch(e=>console.log(e))
    },

    addDaily: (req,res)=>{
        const userid = req.session.passport.user.userid;
        let db = req.app.get('db');
        let {daily} = req.body;
        let d = new Date();
        let age = d.toString().substring(0,15)
        // let userid = 1; this one is for doing the unit tests

        db.addDaily([daily, userid, age]).then(dailies=>{
            res.send(dailies);//returns an array of an object. NOTE: THIS ONLY RETURNS THE DAILY YOU JUST POSTED, NOT THE ENTIRE DB. 
        }).catch(e=>console.log(e))
    },

    getLists: (req,res)=>{
        // let userid = req.session.passport.user.userid;
        let db = req.app.get('db');
        let userid = 1; //this is for testing purposes

        db.getLists([userid]).then(listitems=>{
            res.send(listitems)
        })

    },

}