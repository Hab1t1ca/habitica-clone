import React from 'react';

export function burstOfFlames(user, lists){
    let dailies = lists.filter(list=>list.daily_todo==="daily");
    let status = false;
    let {hp,gold,currentexp,mana,damage} = user;
    if (mana<20){
        return "You don't have enough mana!"
    }
    else{
        mana-=20;
        currentexp+=3
        damage+=2;
        return {
            hp, 
            mana, 
            currentexp, 
            dailies, 
            gold,
            status,
            damage
        }
    }
}

export function alchemy(user,lists){
    let dailies = lists.filter(list=>list.daily_todo==="daily");
    let status = false;
    let {hp,gold,currentexp,mana,damage} = user;
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
            status,
            damage
        }
    }
}

export function pickpocket(user,lists){
    let dailies = lists.filter(list=>list.daily_todo==="daily");
    let status = false;
    let {hp,gold,currentexp,mana,damage} = user;
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
            status,
            damage
        }
    }
}

export function stealth(user,lists){
    let dailies = lists.filter(list=>list.daily_todo==="daily");
    let status = true;
    let {hp,gold,currentexp,mana,damage} = user;
    if (mana<45){
        return "You don't have enough mana!"
    }
    else{
        mana-=45;
        return {
            hp, 
            mana, 
            currentexp, 
            dailies, 
            gold,
            status,
            damage
        }
    }
}

export function peoplesElbow(user,lists){
    let dailies = lists.filter(list=>list.daily_todo==="daily");
    let status = false;
    let {hp,gold,currentexp,mana,damage} = user;
    if (mana<20){
        return "You don't have enough mana!"
    }
    else{
        mana-=20;
        currentexp+=3;
        damage+=2;
        return {
            hp, 
            mana, 
            currentexp, 
            dailies, 
            gold,
            status,
            damage
        }
    }
}

export function intimidatingGaze(user,lists){
    let dailies = lists.filter(list=>list.daily_todo==="daily");
    let status = true;
    let {hp,gold,currentexp,mana,damage} = user;
    if (mana<45){
        return "You don't have enough mana!"
    }
    else{
        mana-=45;
        return {
            hp, 
            mana, 
            currentexp, 
            dailies, 
            gold,
            status,
            damage
        }
    }
}