import React, {Component} from 'react';
import {getLists, addDailies, goldExpTask, deleteTask, complete} from '../../ducks/reducer';
import { connect } from 'react-redux';
import './lists.css';

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
        this.props.complete(listid);

        setTimeout(()=>{
            window.location.reload()
        }, 1000)
    }

    render(){

        let dailies = this.props.lists.map(item=>{
            if (item.daily_todo==="daily"){
                return (
                    <div key={item.id} className="daily">
                    <div className='checkbox'>
                    <input className="checkBox" id={item.id} type='checkbox' value={item.content} onClick={e=>this.completeTask(item.id)}/>
                    </div>
                    <div className='taskLabel'>
                    <label htmlFor={item.content}>{item.content}</label>
                    </div>
                    </div>
                )
            }
        })

        return(
            <div className='Dailies'>
                <form className="forms" onSubmit={(e)=>{
                    e.preventDefault();
                    this.props.addDailies(this.state.content)
                    this.setState({content:''});
                    setTimeout(()=>{
                        window.location.reload()
                    }, 1500)
                    }}>
                <input className="addTask" placeholder="Add a daily here" value={this.state.content} onChange={e=> {
                this.content(e.target.value);
                }}/>
                <br/>
                <button className='buttonModal' type="submit">Submit</button>
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

export default connect(mapStateToProps, {getLists, addDailies, goldExpTask, deleteTask, complete})(Dailies)