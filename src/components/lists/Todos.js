import React, {Component} from 'react';
import { connect } from 'react-redux';
import {addTodos, goldExpTask, deleteTask} from '../../ducks/reducer';

class Todo extends Component {
    constructor(){
        super()

        this.state = {
            content: ''
        }
    }

    //don't need to get lists since Dailies will do this and put them on the store

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
    }

    render(){

        let todos = this.props.lists.map(item=>{
            if (item.daily_todo==="todo"){
                return(
                    <div key={item.id} className='todo'>
                    <div className='checkbox'>
                    <input id={item.id} type='checkbox' value={item.content} onClick={e=>this.completeTask(item.id)}/>
                    </div>
                    <div className='taskLabel'>
                    <label htmlFor={item.content}>{item.content}</label>
                    </div>
                    </div>
                )
            }
        })

        return(
            <div className='todos'>
                <form onSubmit={(e)=>{
                    e.preventDefault();
                    this.props.addTodos(this.state.content)
                    this.setState({content:''});
                    setTimeout(()=>{
                        window.location.reload()
                    }, 1500)
                    }}>
                <input className="addTask" placeholder="Add a to-do here" value={this.state.content} onChange={e=> {
                this.content(e.target.value);
                }}/>
                <button className='submitButton'  type="submit">Submit</button>
                </form>
                {todos}
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

export default connect(mapStateToProps, {addTodos, goldExpTask, deleteTask })(Todo)
