import React, {Component} from 'react';
import { connect } from 'react-redux';
import {addTodos, goldExpTask, deleteTask, editTask} from '../../ducks/reducer';
import Dialog from 'material-ui/Dialog';
import DatePicker from 'material-ui/DatePicker';

class Todo extends Component {
    constructor(){
        super()

        this.state = {
            content: '',
            openEdit: false,
            currentTask: '',
            currentListId: 0,
            controlledDate: null,
            taskIndex: null
        }
    }

    //don't need to get lists since Dailies will do this and put them on the store

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

    completeTask(listid){
        let {gold, currentexp} = this.props.user

        gold+=1;
        currentexp+=10;

        this.props.goldExpTask(currentexp, gold);
        this.props.deleteTask(listid);
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
        let todos = this.props.lists.map((item, index)=>{
            if (item.daily_todo==="todo"){
                return(
                    <div key={item.id} className='todo' id = {(item.age <=1)? 'young': (item.age < 3)? 'middleAge': 'geriatric'}>
                        <div className='checkbox'>
                        <input id={item.id} type='checkbox' value={item.content} onClick={e=>this.completeTask(item.id, item.completed)}/>
                        </div>
                        <div className='taskLabel'>
                        <label htmlFor={item.content}>{item.content}<br/><br/><br/>
                        {(item.duedate!==null) && item.duedate.substr(0,10)}
                        </label>
                        </div>
                        <div>
                            <button onClick={e=>this.openEdit(item.content, item.id, index)}>Edit</button><br/>
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
                    }, 1000)
                    }}>
                <input className="addTask" placeholder="Add a to-do here" value={this.state.content} onChange={e=> {
                this.content(e.target.value);
                }}/>
                <button className='submitButton'  type="submit">Submit</button>
                </form>
                {todos}
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
                    <p>Task: </p><input placeholder={this.state.currentTask} onChange={(e)=>this.editTitle(e.target.value)}/>
                    <DatePicker
                        hintText="Add Due Date"
                        value={this.state.controlledDate}
                        onChange={this.handleChange}
                    />
                    {JSON.stringify(this.state.dueDate)}

                    <button onClick={()=>this.submitEdit()}>Submit</button>
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

export default connect(mapStateToProps, {addTodos, goldExpTask, deleteTask, editTask })(Todo)
