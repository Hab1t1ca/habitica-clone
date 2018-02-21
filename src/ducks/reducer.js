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
    avatar: ''
};

const NAME = 'NAME';

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


function reducer(state = initialState, action) {
    switch (action.type) {
        case NAME:
            return Object.assign({}, state, { name: action.payload });

        default: return state;
    }
}


export default reducer;