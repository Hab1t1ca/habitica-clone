module.exports = {

    createName: (req,res) =>{
        const db = req.app.get('db');
        let {name} = req.body;
        db.create_user([name, null, null, null, null]).then(user => {
            res.send(user[0])
        })
    }
    
}