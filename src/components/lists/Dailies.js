import React, {Component} from 'react';
import {getLists, addDailies} from '../../ducks/reducer';
import { connect } from 'react-redux';
import { Checkbox } from 'material-ui';


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

        
        //function from reducer. Put in gold and xp
        //invoke delete function
    }

    render(){

        let dailies = this.props.lists.map(item=>{
            if (item.daily_todo==="daily"){
                return (
                    <div>
                    <input id={item.id} type='checkbox' value={item.content} onClick={e=>this.completeTask(item.id)}/>
                    <label for={item.content}>{item.content}</label>
                    </div>
                )
            }
        })

        return(
            <div>
                <form onSubmit={(e)=>{
                    e.preventDefault();
                    this.props.addDailies(this.state.content)
                    this.setState({content:''})
                    }}>
                <input placeholder="Add a daily here" value={this.state.content} onChange={e=> {
                this.content(e.target.value);
                }}/>
                <button type="submit">Submit</button>
                </form>
                <div>
                {dailies}
                </div>
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