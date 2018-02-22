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
    shop: [],
    user: {}
};

const NAME = 'NAME';
const SHOP = 'SHOP';
const USER = 'USER';

export function createChar(value) {
    console.log(value)
    let body = {
        "name": value
    }
    let user = axios.post(`/api/createChar`, body).then(res => {
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
        return res.data
    })
    return {
        type: SHOP,
        payload: shop
    }
}
export function getUser() {
    let user = axios.get('/api/getUser').then(res => {
        return res.data
    })
    return {
        type: USER,
        payload: user
    }
}


function reducer(state = initialState, action) {
    switch (action.type) {
        case NAME + '_FULFILLED':
            return Object.assign({}, state, { name: action.payload });

        case SHOP + '_FULFILLED':
            return Object.assign({}, state, { shop: action.payload });

        case USER + '_FULFILLED':
            return Object.assign({}, state, { user: action.payload })

        default: return state;
    }
}


export default reducer;