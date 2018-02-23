import React, {Component} from 'react';
import {getLists, addDailies} from '../../ducks/reducer';
import { connect } from 'react-redux';


class Dailies extends Component {
    constructor(){
        super()
        this.state={
            content: ''
        }
    }

    componentWillMount(){
        this.props.getLists()
    }

    content(string){
        this.setState({
            content: string
        })
    }

    render(){

        let dailies = this.props.lists.map(item=>{
            if (item.daily_todo==="daily"){
                return (
                    <div key={item.id}>{item.content}</div>
                )
            }
        })

        return(
            <div>
                <form onSubmit={(e)=>{
                    e.preventDefault();
                    this.props.addDailies(this.state.content)}}>
                <input placeholder="Add a daily here" onChange={e=> {
                this.content(e.target.value);
                }}/>
                <button type="submit">Submit</button>
                </form>
                {dailies}
            </div>
        )
    }
}

function mapStateToProps(state){
    return{
        lists: state.lists,
        addedDaily : state.daily
    }
}

export default connect(mapStateToProps, {getLists, addDailies})(Dailies)