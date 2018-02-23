const axios = require('axios');

module.exports = {
    userName: function (name) {
        let body = { "name": name };
        axios.post('/api/createChar', body).then(
            res => {
                return res.data;
            }
        )
    },

    shop: function () {
        let shop = axios.get(`/api/getitems`).then(res => {
            return res.data
        })
        return shop;
        // return {
        //     type: 'SHOP',
        //     payload: shop
        // }
    },

    addDaily: (daily)=>{

        let body = {
            daily
        }

        return axios.post('http://localhost:3020/api/addDaily', body).then(res=>{
            console.log(res.data)
            return res.data
        })

        //add action creator when putting this into the reducer. 
    },

    addTodos: (todo)=>{
        let body = {
            todo
        }

        return axios.post('http://localhost:3020/api/addTodo', body).then(res=>{
            console.log(res.data)
            return res.data
        })
    }
}
