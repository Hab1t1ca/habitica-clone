const fns = require('../ducks/functions.js');

// describe('character creation', ()=>{
//     test.skip('username is created', ()=>{
//         fns.userName('Sticky Sam').then(results=>{
//             expect(results.name).toBe('Sticky Sam');
//         })
//     })
// })

describe('items', ()=>{
    
    test('grab shop', ()=>{
    var shop = fns.shop();
    console.log(shop)
        expect(Array.isArray(shop).toEqual(true))
            // expect(res.payload.length).greaterThan(0)
        })
})