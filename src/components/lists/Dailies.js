import React, {Component} from 'react';
import {getLists, addDailies, goldExpTask, deleteTask, complete, editTask} from '../../ducks/reducer';
import { connect } from 'react-redux';
import './lists.css';
import Dialog from 'material-ui/Dialog';

class Dailies extends Component {
    constructor(){
        super()
        this.state={
            content: '',
            openEdit: false,
            currentTask: '',
            currentListId: 0,
            editedContent: ''
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

    openEdit(content, id){
        this.setState({
            openEdit: !this.state.openEdit,
            currentTask: content, 
            currentListId: id
        })
        //don't need to overwite content and id on state when modal closes because every time a new modal is opened on a task, it will overwrite the current values. 
    }

    editTitle(string){
        this.setState({
            editedContent: string
        })
    }

    completeTask(listid, completed){

        if (completed===true){
            window.location.reload()
            return "You have already completed this today."
        }
        else{
            let {gold, currentexp} = this.props.user
    
            gold+=1;
            currentexp+=10;
    
            this.props.goldExpTask(currentexp, gold);
            this.props.complete(listid);
    
            setTimeout(()=>{
                window.location.reload()
            }, 900)
        }
    }

    render(){

        let dailies = this.props.lists.map(item=>{
            if (item.daily_todo==="daily"){
                return (
                    <div key={item.id} className="daily">
                        <div className='checkbox'>
                            <input id={item.id} type='checkbox' value={item.content} onClick={e=>this.completeTask(item.id, item.completed)}/>
                        </div>
                        <div className='taskLabel'>
                            <label htmlFor={item.content}>{item.content}</label>
                        </div>
                        <div>
                            <button onClick={e=>this.openEdit(item.content, item.id)}>Edit</button><br/>
                            <span>Streak: {item.streak}</span>
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
{/* edit modal */}
                <Dialog
                    title="Edit Your Task"
                    open={this.state.openEdit}
                    modal={true}
                    paperProps={{
                        style: { borderRadius: '0px',
                                width: '100%',
                                border: '1px solid white',
                                 }
                    }}
                    style={{ opacity: '0.9', textAlign: "center", borderRadius: '25px', background: '#3D315B', }}
                >
                    <input value={this.state.editedContent} placeholder={this.state.currentTask} onChange={(e)=>this.editTitle(e.target.value)}/>
                    <button onClick={()=>this.props.editTask(this.state.editedContent, this.state.currentListId)}>Submit</button>
                    <button onClick={()=>this.props.deleteTask(this.state.currentListId)}>Delete Task</button>
                    <button onClick={() => this.openEdit()} className="buttonModal">Cancel</button>
                </Dialog>
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

export default connect(mapStateToProps, {getLists, addDailies, goldExpTask, deleteTask, complete, editTask})(Dailies)