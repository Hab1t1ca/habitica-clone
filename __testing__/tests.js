const fns = require('./utils/functions.js');

describe('character creation', ()=>{
    test('username is created', ()=>{
        fns.userName('Sticky Sam').then(results=>{
            expect(results.name).toBe('Sticky Sam');
        })
    })
})
