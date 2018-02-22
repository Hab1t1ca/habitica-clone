

module.exports = {

    createName: (req,res) =>{
        const db = req.app.get('db');
        let {name} = req.body;
        console.log(name, "names", req.body)
        db.create_user([name, null, null, null, null]).then(user => {
            res.send(user[0])
        })
    },

    addClass: (req,res) =>{
        const db = req.app.get('db');
        let {Class, name} = req.body;
        console.log('backend class', Class, name)
        db.create_user([name, null, null, Class, null]).then(user => {
            res.send(user[0])
        })
    },

    getitems: (req,res) =>{
        let db = req.app.get('db');

        db.getItems().then(items=>{
            res.send(items)//returning an array of items
        })
    },
    
    getUser: (req,res)=>{
        console.log(req.session.passport.user, "session");
        const userid = req.session.passport.user;
        let db = req.app.get('db');
        db.getUser([userid]).then(user=>{
            res.send(user[0]) //this sends all the user data. We will need to filter out the data on the front end for what we want in each component. But this will put all user data into the Store. 
        })
    },

    addDaily: (req,res)=>{
        const userid = req.session.passport.user;
        let db = req.app.get('db');
        let {daily} = req.body;
        let d = new Date();
        let age = d.toString().substring(0,15)
        // let userid = 1; this one is for doing the unit tests

        db.addDaily([daily, userid, age]).then(dailies=>{
            res.send(dailies);//returns an array of an object. NOTE: THIS ONLY RETURNS THE DAILY YOU JUST POSTED, NOT THE ENTIRE DB. 
        }).catch(e=>console.log(e))
    }
}