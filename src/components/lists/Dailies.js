import React, {Component} from 'react';
import {getLists, addDailies, goldExpTask, deleteTask, complete, editTask} from '../../ducks/reducer';
import { connect } from 'react-redux';
import './lists.css';
import Dialog from 'material-ui/Dialog';
import DatePicker from 'material-ui/DatePicker';

class Dailies extends Component {
    constructor(){
        super()
        this.state={
            content: '',
            openEdit: false,
            currentTask: '',
            currentListId: 0,
            controlledDate: null,
            taskIndex: null
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

    openEdit(content, id, index){
        this.setState({
            openEdit: !this.state.openEdit,
            currentTask: content, 
            currentListId: id,
            taskIndex: index
        })
        //don't need to overwite content and id on state when modal closes because every time a new modal is opened on a task, it will overwrite the current values. 
    }

    editTitle(string){
        this.setState({
            content: string
        })
    }

    completeTask(listid, completed){

        if (completed===true){
            window.location.reload()
            return "You have already completed this today."
        }
        else{
            let {gold, currentexp, damage} = this.props.user
    
            gold+=1;
            currentexp+=10;
    
            this.props.goldExpTask(currentexp, gold);
            this.props.complete(listid, damage);
    
            setTimeout(()=>{
                window.location.reload()
            }, 900)
        }
    }

    handleChange = (event, date) => {
        this.setState({
          controlledDate: date,
        });
      }

    submitEdit(){
        let task = (this.state.content) ? this.state.content : this.props.lists[this.state.taskIndex].content;

        let date = (this.state.controlledDate) ? this.state.controlledDate : this.props.lists[this.state.taskIndex].duedate;

        this.props.editTask(task, this.state.currentListId, this.state.controlledDate)
    }

    render(){
        let dailies = this.props.lists.map((item,index)=>{
            if (item.daily_todo==="daily"){
                return (
                    <div key={item.id} className="daily" id={(item.completed) ? "completed" : "notCompleted"}>
                        <div className='checkbox'>
                            <input id={item.id} type='checkbox' value={item.content} onClick={e=>this.completeTask(item.id, item.completed)}/>
                        </div>
                        <div className='taskLabel'>
                            <label htmlFor={item.content}>{item.content}<br/><br/><br/>
                            {(item.duedate!==null) && item.duedate.substr(0,10)}
                            </label>
                        </div>
                        <div>
                            <button onClick={e=>this.openEdit(item.content, item.id, index)} className="editButton">Edit</button><br/>
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
                <button className='submitButton' type="submit">Submit</button>
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
                    <p style={{color: 'black', textAlign: 'left'}}>Task: </p><input style={{border: 'solid #3D315B', width: '100%'}} placeholder={this.state.currentTask} onChange={(e)=>this.editTitle(e.target.value)}/>

                    <br/><br/>

                    <p style={{color: 'black', textAlign: 'left'}}>Add Due Date:</p>
                    <DatePicker
                        hintText="Calendar"
                        value={this.state.controlledDate}
                        onChange={this.handleChange}
                        style={{background: '#E4DAEA', borderRadius: '10px', width: '65%', margin: 'auto', paddingLeft: '37%'}}
                    />
                    {JSON.stringify(this.state.dueDate)}

                    <br/>

                    <button onClick={()=>this.props.deleteTask(this.state.currentListId)}>Delete Task</button>
                    <button onClick={() => this.openEdit()} >Cancel</button>
                    <button className='buttonModal' onClick={()=>this.submitEdit()}>Submit</button>

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