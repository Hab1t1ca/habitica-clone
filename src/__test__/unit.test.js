const fns = require('../ducks/functions.js');

// describe('character creation', ()=>{
//     test.skip('username is created', ()=>{
//         fns.userName('Sticky Sam').then(results=>{
//             expect(results.name).toBe('Sticky Sam');
//         })
//     })
// })

describe('items', ()=>{
    
    test.skip('grab shop', ()=>{
    var shop = fns.shop();
    console.log(shop)
        expect(Array.isArray(shop).toEqual(true))
        })
})

describe('lists', ()=>{
    test('add daily', ()=>{//works as long as you hard code in a userid
        return fns.addDaily('something to do').then(response=>{
            console.log(response)
            expect(Array.isArray(response)).toBeTruthy;
            expect(response.length).toBeGreaterThan(0);
        }).catch(e=>console.log(e))
    })

    test('add todo', ()=>{//works as long as you hard code in a userid
        return fns.addTodos('chew bubble gum and kick ass').then(response=>{
            console.log(response)
            expect(Array.isArray(response)).toBeTruthy;
            expect(response.length).toBeGreaterThan(0);
        }).catch(e=>console.log(e))
    })
})