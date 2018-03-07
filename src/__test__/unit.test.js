const fns = require('../ducks/functions.js');
const fun = require('../../server/onLvl.js');


var baseHealth = 50;
var hExpo = 0.3;
var goldExpo = 0.029;
var baseMana = 50;
var mExpo = 0.2;
var warHealthExpo = 0.41;
var baseExpforLvl = 100;

describe('items', () => {

    test.skip('grab shop', () => {
        var shop = fns.shop();
        
        expect(Array.isArray(shop).toEqual(true))
    })
})

describe('lists', () => {
    test('add daily', () => {//works as long as you hard code in a userid - Tiarra
        return fns.addDaily('something to do').then(response => {
            
            expect(Array.isArray(response)).toBeTruthy;
            expect(response.length).toBeGreaterThan(0);
        }).catch(e => console.log(e))
    })

    test('add todo', () => {//works as long as you hard code in a userid - Tiarra
        return fns.addTodos('chew bubble gum and kick ass').then(response => {
            
            expect(Array.isArray(response)).toBeTruthy;
            expect(response.length).toBeGreaterThan(0);
        }).catch(e => console.log(e))
    })

    test('receiving lists from DB', () => {//must hard code userid when testing. This works. - Tiarra
        return fns.getLists().then(response => {
            
            expect(Array.isArray(response)).toBeTruthy;
            expect(response.length).toBeGreaterThan(0);
        }).catch(e => console.log(e))
    })

    test('can delete task from DB', () => {//this works - Tiarra
        return fns.deleteTask(1).then(response => {
            
            expect(response).toBe('task has been deleted');
        }).catch(e => console.log(e))
    })
});

describe('lvling', ()=>{ //unit testing
    
    test('xp and gold test', () => {
        return fns.addGoldandXp(10, 1).then(response => {
            console.log(response, 'response');
            expect(Array.isArray(response)).toBeTruthy;
           
        })
    })
    
    test.skip('HP increase on lvl', ()=>{
        var baseHealth = 50;
        var hExpo = 0.3;
        var lvl =2;
        var newHealth = Math.floor(baseHealth * (Math.pow(lvl, hExpo)) + lvl)
        expect(newHealth).toEqual(63)               
    })

    test.skip('User gets a certain amount of gold when they lvl up', ()=>{
        var goldExpo = 0.029;
        var lvl = 15;
        var gold = Math.floor(Math.pow(lvl, (lvl * goldExpo)))
        expect(gold).toEqual(3)
    })


    test('Mana increase on lvl', ()=>{
        var baseMana = 50;
        var mExpo = 0.2;
        var lvl = 4;
        var newMana = Math.floor(baseMana * (Math.pow(lvl, mExpo)))
        expect(newMana).toEqual(65)
    })

    test('Convert current Health to a %', ()=>{
     var currentHP = 75;
     var maxHP = 100;
     var pct = (currentHP / maxHP) * 100
     expect(pct).toEqual(75)
    })

})

describe('quests', () => {

    test('boss does damage if daily incomplete', () => {//works - Tiarra
        var nudailies = [{"name": 'Snake', "completed": false}];

        console.log(fns.bossdmg(nudailies,6,50,50));
        expect(fns.bossdmg(nudailies,6,50,50)).toBe(44);
    })

});