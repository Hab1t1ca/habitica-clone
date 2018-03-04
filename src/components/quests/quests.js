import React, { Component } from 'react';
import { connect } from 'react-redux';
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
            console.log(res.data)
            this.setState({
                questData: res.data
            })
        })
    }

    render() {
        let quests = this.state.questData.map(quest =>
            <div className="questBlock" key={quest.id}>
                <h2 className="questName">{quest.name}</h2>
                <p className="questDes">{quest.description}</p>
                <p className="questP">Boss HP: {quest.bosshp}</p>
                <p className="questP">Boss Damage: {quest.bossdmg}</p>
                <p className="questP">Required Level: {quest.lvl}</p>
                <button className="questBtn">Start Quest!</button>
            </div>
        )


        return (
            <div className="questsDiv">
                <Nav />
                <h1>Available Quests</h1>
                {quests}

            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        user: state.user,

    }
}
export default connect(mapStateToProps)(Quests)