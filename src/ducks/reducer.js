import axios from 'axios';
const initialState = {
    name: '',
    HP: 50,
    Mana: 50,
    XP: 0,
    Class: '',
    Gold: 0,
    list_items: [],
    inventory: [],
    avatar: '',
    shop: []
};

const NAME = 'NAME';
const SHOP = 'SHOP';

export function createChar(value) {

    let body = {
        "name": value
    }
    let user = axios.post(`/api/createChar`).then(res => {
        console.log(res.data, "Character Created");
        return res.data
    })

    return {
        type: NAME,
        payload: user.name
    }
}
export function shop() {
    
    let shop = axios.get(`/api/getitems`).then(res => {
        console.log(res.data, "reducer data")
        return res.data
        
    })
    return {
        type: SHOP,
        payload: shop
    }
}


function reducer(state = initialState, action) {
    switch (action.type) {
        case NAME + '_FULFILLED':
            return Object.assign({}, state, { name: action.payload });

        case SHOP + '_FULFILLED':
            return Object.assign({}, state, { shop: action.payload });

        default: return state;
    }
}


export default reducer;