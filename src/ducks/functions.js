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
        // return shop
        return {
            type: 'SHOP',
            payload: shop
        }
    }
}