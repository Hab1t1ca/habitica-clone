import React, {Component} from 'react';
import { connect } from 'react-redux';
import {addTodos} from '../../ducks/reducer';

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

    render(){
        return(
            <div>
                <form onSubmit={(e)=>{
                    e.preventDefault();
                    this.props.addTodos(this.state.content)}}>
                <input placeholder="Add a to-do here" onChange={e=> {
                this.content(e.target.value);
                }}/>
                <button type="submit">Submit</button>
                </form>

            </div>
        )
    }
}

function mapStateToProps(state){
    return{
        lists: state.lists,
    }
}

export default connect(mapStateToProps, {addTodos})(Todo)
