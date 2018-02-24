const fns = require('../ducks/functions.js');

describe('items', () => {

    test.skip('grab shop', () => {
        var shop = fns.shop();
        console.log(shop)
        expect(Array.isArray(shop).toEqual(true))
    })
})

describe('lists', () => {
    test.skip('add daily', () => {//works as long as you hard code in a userid
        return fns.addDaily('something to do').then(response => {
            console.log(response)
            expect(Array.isArray(response)).toBeTruthy;
            expect(response.length).toBeGreaterThan(0);
        }).catch(e => console.log(e))
    })

    test.skip('add todo', () => {//works as long as you hard code in a userid
        return fns.addTodos('chew bubble gum and kick ass').then(response => {
            console.log(response)
            expect(Array.isArray(response)).toBeTruthy;
            expect(response.length).toBeGreaterThan(0);
        }).catch(e => console.log(e))
    })

    test.skip('receiving lists from DB', () => {//must hard code userid when testing. This works.
        return fns.getLists().then(response => {
            console.log(response);
            expect(Array.isArray(response)).toBeTruthy;
            expect(response.length).toBeGreaterThan(0);
        }).catch(e => console.log(e))
    })

    test.skip('can delete task from DB', () => {//this works
        return fns.deleteTask(1).then(response => {
            console.log(response);
            expect(response).toBe('task has been deleted');
        }).catch(e => console.log(e))
    })

    test('xp and gold test', () => {
        return fns.addGoldandXp(10, 1).then(response => {
            console.log(response, 'response');
            expect(Array.isArray(response)).toBeTruthy;
           
        })
    })

})