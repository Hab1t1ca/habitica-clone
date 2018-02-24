import React, {Component} from 'react';
import {getLists, addDailies, goldExpTask, deleteTask} from '../../ducks/reducer';
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

    completeTask(listid){
        let {gold, currentexp} = this.props.user

        gold+=1;
        currentexp+=10;

        this.props.goldExpTask(currentexp, gold);
        this.props.deleteTask(listid);

        setTimeout(()=>{
            window.location.reload()
        }, 1500)
    }

    render(){

        let dailies = this.props.lists.map(item=>{
            if (item.daily_todo==="daily"){
                return (
                    <div key={item.id}>
                    <input id={item.id} type='checkbox' value={item.content} onClick={e=>this.completeTask(item.id)}/>
                    <label htmlFor={item.content}>{item.content}</label>
                    </div>
                )
            }
        })

        return(
            <div>
                <form onSubmit={(e)=>{
                    e.preventDefault();
                    this.props.addDailies(this.state.content)
                    this.setState({content:''});
                    setTimeout(()=>{
                        window.location.reload()
                    }, 1500)
                    }}>
                <input placeholder="Add a daily here" value={this.state.content} onChange={e=> {
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
        user: state.user
    }
}

export default connect(mapStateToProps, {getLists, addDailies, goldExpTask, deleteTask})(Dailies)