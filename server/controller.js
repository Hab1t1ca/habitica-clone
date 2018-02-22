

module.exports = {

    createName: (req,res) =>{
        const db = req.app.get('db');
        let {name} = req.body;
        console.log(name, "names", req.body)
        db.create_user([name, null, null, null, null]).then(user => {
            res.send(user[0])
        })
    },

    getitems: (req,res) =>{
        let db = req.app.get('db');

        db.getItems().then(items=>{
            console.log('items', items);
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
    }
}