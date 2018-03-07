import React, { Component } from 'react';
import { connect } from 'react-redux';
import {quests, equipQuest} from '../../ducks/reducer'
import axios from 'axios';
import Nav from '../nav/nav';
import './quests.css';

class Quests extends Component {
    constructor() {
        super();

        this.state = {
            questData: []
        }

    }

    componentDidMount() {
        axios.get('/api/getQuests').then(res => {
           
            this.setState({
                questData: res.data
            })
        })
    }

    equipQuest(id, bosshp, bossdmg){
        this.props.equipQuest(id)
        this.props.equipQuest(bosshp)
        this.props.equipQuest(bossdmg)
    }
     

    render() {
        let quests = this.state.questData.map(quest =>
            <div className="questBlock" key={quest.id}>
                <h2 className="questName">{quest.name}</h2>
                <img className="questPic" src={quest.avatar}/>
                <p className="questDes">{quest.description}</p>
                <p className="questP">Boss HP: {quest.bosshp}</p>
                <p className="questP">Boss Damage: {quest.bossdmg}</p>
                <p className="questP">Required Level: {quest.lvl}</p>
                <button className="questBtn" onClick={()=>equipQuest(quest.id, quest.bosshp, quest.bossdmg)}>Start Quest!</button>
            </div>
        )


        return (
            <div className="questsDiv">
                <Nav />
                <h1 className="questHeader">Available Quests</h1>
                {quests}

            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        user: state.user,
        quest: state.id

    }
}
export default connect(mapStateToProps, {quests, equipQuest})(Quests)