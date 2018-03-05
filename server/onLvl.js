var baseHealth = 50;
var hExpo = 0.3;
var goldExpo = 0.029;
var baseMana = 50;
var mExpo = 0.2;
var warHealthExpo = 0.41;
var baseExpforLvl = 100;


module.exports = {

    //Health on lvl up
    generalHealthCalc: (lvl) => {
        var newHealth = Math.floor(baseHealth * (Math.pow(lvl, hExpo)) + lvl)
        return newHealth
    },


    //Mana on lvl up
    generalMana: (lvl) => {
        var newMana = Math.round(baseMana * (Math.pow(lvl, mExpo)))
        return newMana
    },


    //Gold on lvl up
    goldCalc: (lvl) => {
        var gold = Math.floor(Math.pow(lvl, (lvl * goldExpo)))
        return gold
    },


    //warrior health on lvl up
    warriorHealth: (lvl) => {
        var newHealth = Math.floor(baseHealth * (Math.pow(lvl, warHealthExpo)) + lvl)
        return newHealth
    },


    //Rougue Gold on lvl up
    rogueGold: (lvl) => {
        var rogueExpo = 0.03;
        var gold = Math.floor(Math.pow(lvl, (lvl * rogueExpo)))
        return gold
    },


    //Mage health on lvl up
    mageHealth: (lvl) => {
        var mageHealthExpo = 0.27;
        var health = Math.floor(baseHealth * (Math.pow(lvl, mageHealthExpo)) + lvl)
        return health
    },


    //Mage mana on lvl up
    mageMana: (lvl) => {
        var mageManaExpo = 0.36;
        var mana = Math.round(baseMana * (Math.pow(lvl, mageManaExpo)))
        return mana
    }

}