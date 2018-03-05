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
    equipped: [],
    avatar: '',
    shop: [],
    user: {},
    daily: {},
    todo: {},
    lists: [],
    maxhp: 50,
    maxmana: 50,
    baseexp: 100,
    completed: false,
    avatar: '',
    classes: [],
    abilities: []
};

const NAME = 'NAME';
const SHOP = 'SHOP';
const BUY = 'BUY';
const BUYPOTION = 'BUYPOTION';
const INVENTORY = 'INVENTORY';
const EQUIP = 'EQUIP';
const GETEQUIPPED = 'GETEQUIPPED';
const USER = 'USER';
const CLASS = 'CLASS';
const ADD_DAILY = 'ADD_DAILY';
const ADD_TODO = 'ADD_TODO';
const GET_LISTS = 'ADD_LISTS';
const SHOW_MAX_HEALTH = "SHOW_MAX_HEALTH";
const SHOW_MAX_MANA = "SHOW_MAX_MANA";
const SHOW_BASE_EXP = "SHOW_BASE_EXP";
const DELETE_TASK = "DELETE_TASK";
const UPDATE_GOEXP = "UPDATE_GOEXP";
const COMPLETE_DAILY = "COMPLETE_DAILY";
const COMPLETED = "COMPLETED";
const AVATAR = "AVATAR";
const EDIT_TASK = "EDIT_TASK";
const CLASSES = "CLASSES";
const ABILITIES = "ABILITIES";


//Create Character function
export function createChar(value) {
    // console.log(value)
    let body = {
        "name": value
    }
    let user = axios.post(`/api/createChar`, body).then(res => {
        // console.log(res.data, "Character Created");
        return res.data
    })

    return {
        type: NAME,
        payload: user.name
    }
}

//Avatar
export function createAvatar(value) {
    // console.log(value, 'url')
    let body = {
        "avatar": value
    }
    let user = axios.put(`/api/avatar`, body).then(res => {
        // console.log(res.data, "Avatar Cropped");
        return res.data
    })

    return {
        type: AVATAR,
        payload: body
    }
}

//Get shop function
export function shop() {

    let shop = axios.get(`/api/getitems`).then(res => {
        // console.log(res.data, "reducer data")
        return res.data

    })
    return {
        type: SHOP,
        payload: shop
    }
}

//buy shop item
export function buy(itemid, cost, userGold) {
    let body = {
        itemid: itemid,
        cost: cost,
        userGold: userGold
    }
    let buy = axios.post(`/api/buyitem`, body).then(res => {
        // console.log(body)
        return res.data
    }).catch(e => { console.log(e) })

    return {
        type: BUY,
        payload: buy
    }
}

export function buyPotion(itemid, cost, userGold, hp, mp ,maxhp, maxmana){
    let body = {
        itemid: itemid,
        cost: cost,
        userGold: userGold,
        hp: hp,
        mp: mp,
        maxhp: maxhp,
        maxmana: maxmana
    }

    let buy = axios.put(`/api/buypotion`, body).then(res => {
        // console.log(body)
        return res.data
    }).catch(e => { console.log(e) })

    return {
        type: BUYPOTION,
        payload: buy
    }

}

//inventory
export function getInventory() {
    let inventory = axios.get(`/api/inventory`).then(res => {
        console.log(res.data,)
        return res.data
    }).catch(e => { console.log(e) })

    return {
        type: INVENTORY,
        payload: inventory
    }
}

export function getEquipped(){
    let equipped = axios.get(`/api/equipped`).then(res => {
        console.log(res.data[0].equipped)
        return res.data[0].equipped
    }).catch(e => { console.log(e) })

    return {
        type: GETEQUIPPED,
        payload: equipped
    }
}

export function equipItem(id){
    let body = {
        itemid: id
    }
    let equip = axios.put(`/api/equip`, body).then(res => {
        console.log(res.data,)
        return res.data
    }).catch(e => { console.log(e) })

    return {
        type: EQUIP,
        payload: equip
    }
}

//Get user function
export function getUser() {

    let user = axios.get('/api/getUser').then(res => {
        // console.log(res.data)
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

//delete task
export function deleteTask(id) {
    let listid = id;
    let lists = axios.delete(`/api/deleteTask/${listid}`).then(res => {
        return res.data
    })

    window.location.reload()
    return {
        type: DELETE_TASK,
        payload: lists
    }
}

//update gold and exp on task completion
export function goldExpTask(xp, gold) {
    let body = {
        "XP": xp,
        "Gold": gold
    }
    let taskComp = axios.put('/api/taskComp', body).then(res => {
        return res.data
    })
    return {
        type: UPDATE_GOEXP,
        payload: taskComp
    }
}

//show max health
export function showMaxHp(maxhp) {
    return {
        type: SHOW_MAX_HEALTH,
        payload: maxhp
    }
}

//show max mana
export function showMaxMana(maxmana) {
    return {
        type: SHOW_MAX_MANA,
        payload: maxmana
    }
}

//Show base exp
export function showBaseExp(baseexp) {
    return {
        type: SHOW_BASE_EXP,
        payload: baseexp
    }
}


//Complete
export function complete(listid) {
    let complete = axios.put(`/api/complete/${listid}`).then(res => {
        return res.data
    })
    return {
        type: COMPLETED,
        payload: complete
    }
}

//edit task
export function editTask(content, id, duedate) {
    let body = {
        "content": content,
        "id": id,
        "duedate": duedate
    }
    let editTask = axios.put('/api/editTask', body).then(res => {
        return res.data
    })

    window.location.reload()
    return {
        type: EDIT_TASK,
        payload: editTask
    }
}

//classes task
export function getClasses() {
    let getClasses = axios.get('/api/getClasses').then(res => {
        console.log('classes in reducer', res.data)
        return res.data
    })
    return {
        type: CLASSES,
        payload: getClasses
    }
}

//abilities
export function abilities(body) {
    
    let ability = axios.put('/api/ability', body).then(res => {
        return res.data
    })
    return {
        type: ABILITIES,
        payload: ability
    }
}


function reducer(state = initialState, action) {
    switch (action.type) {
        case NAME + '_FULFILLED':
            return Object.assign({}, state, { name: action.payload });

        case SHOP + '_FULFILLED':
            return Object.assign({}, state, { shop: action.payload });

        case INVENTORY + '_FULFILLED':
            return Object.assign({}, state, { inventory: action.payload })

        case GETEQUIPPED + '_FULFILLED':
        console.log(action.payload)
            return Object.assign({}, state, { equipped: action.payload })

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

        case SHOW_BASE_EXP + '_FULFILLED':
            return Object.assign({}, state, { baseexp: action.payload })

        case DELETE_TASK + '_FULFILLED':
            return Object.assign({}, state, { lists: action.payload })

        case UPDATE_GOEXP + '_FULFILLED':
            // var tempobject = Object.assign({},state.user, action.payload)
            return Object.assign({}, state, {user : action.payload})

        case COMPLETE_DAILY + '_FULFILLED':
            return Object.assign({}, state, { completed: action.payload })

        case COMPLETED + '_FULFILLED':
            return Object.assign({}, state, { completed: action.payload })

        case AVATAR + '_FULFILLED':
            return Object.assign({}, state, { avatar: action.payload })

        case EDIT_TASK + '_FULFILLED':
            return Object.assign({}, state, { lists: action.payload })

        case CLASSES + '_FULFILLED':
            return Object.assign({}, state, { classes: action.payload })

        case ABILITIES + '_FULFILLED':
            return Object.assign({}, state, { abilities: action.payload })

        default: return state;
    }
}


export default reducer;