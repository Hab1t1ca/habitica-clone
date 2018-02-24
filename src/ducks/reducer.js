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
    user: {},
    daily: {},
    todo: {},
    lists: [],
    maxhp: 50,
    maxmana: 50
};

const NAME = 'NAME';
const SHOP = 'SHOP';
const USER = 'USER';
const CLASS = 'CLASS';
const ADD_DAILY = 'ADD_DAILY';
const ADD_TODO = 'ADD_TODO';
const GET_LISTS = 'ADD_LISTS';
const SHOW_MAX_HEALTH = "SHOW_MAX_HEALTH";
const SHOW_MAX_MANA = "SHOW_MAX_MANA";
//delete me
//Create Character function
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

//Get shop function
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

//Get user function
export function getUser() {

    let user = axios.get('/api/getUser').then(res => {
        console.log(res.data)
        return res.data
    })
    return {
        type: USER,
        payload: user
    }
}

//add class to character

export function addClass(value) {
    let body = {
        "Class": value
    }
    let addClass = axios.post(`/api/addClass`, body).then(res => {
        return res.data
    })

    return {
        type: CLASS,
        payload: addClass.Class
    }
}

//addDailies
export function addDailies(daily) {
    let body = {
        daily
    }
    let dailies = axios.post('/api/addDaily', body).then(res => {
        return res.data
    })
    return {
        type: ADD_DAILY,
        payload: dailies
    }
}

//addTodos
export function addTodos(todo) {
    let body = {
        todo
    }
    let addTodo = axios.post(`api/addTodo`, body).then(res => {
        return res.data
    })
    return {
        type: ADD_TODO,
        payload: addTodo
    }
}

//getLists
export function getLists() {
    let lists = axios.get('/api/getLists').then(res => {
        return res.data
    })
    return {
        type: GET_LISTS,
        payload: lists
    }
}

//show max health
export function showMaxHp() {
    return {
        type: SHOW_MAX_HEALTH,
        payload: maxhp
    }
}

//show max mana
export function showMaxMana() {
    return {
        type: SHOW_MAX_MANA,
        payload: maxmana
    }
}


function reducer(state = initialState, action) {
    switch (action.type) {
        case NAME + '_FULFILLED':
            return Object.assign({}, state, { name: action.payload });

        case SHOP + '_FULFILLED':
            return Object.assign({}, state, { shop: action.payload });

        case USER + '_FULFILLED':
            return Object.assign({}, state, { user: action.payload });

        case CLASS + '_FULFILLED':
            return Object.assign({}, state, { Class: action.payload })

        case ADD_DAILY + '_FULFILLED':
            return Object.assign({}, state, { daily: action.payload })

        case ADD_TODO + '_FULFILLED':
            return Object.assign({}, state, { todo: action.payload })

        case GET_LISTS + '_FULFILLED':
            return Object.assign({}, state, { lists: action.payload })

        case SHOW_MAX_HEALTH + '_FULFILLED':
            return Object.assign({}, state, { maxhp: action.payload })

        case SHOW_MAX_MANA + '_FULFILLED':
            return Object.assign({}, state, { maxmana: action.payload })

        default: return state;
    }
}


export default reducer;