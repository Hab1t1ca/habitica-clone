import React from 'react';

export function burstOfFlames(user, lists){
    let dailies = lists.filter(list=>list.daily_todo==="daily");
    let status = false;
    let {hp,gold,currentexp,mana} = user;
    if (mana<20){
        return "You don't have enough mana!"
    }
    else{
        mana-=20;
        currentexp+=3
        //+2 damage to boss
        return {
            hp, 
            mana, 
            currentexp, 
            dailies, 
            gold,
            status
        }
    }
}

export function alchemy(user,lists){
    let dailies = lists.filter(list=>list.daily_todo==="daily");
    let status = false;
    let {hp,gold,currentexp,mana} = user;
    if (mana<40){
        return "You don't have enough mana!"
    }
    else{
        mana-=40;
        gold+=5;
        return {
            hp, 
            mana, 
            currentexp, 
            dailies, 
            gold,
            status
        }
    }
}