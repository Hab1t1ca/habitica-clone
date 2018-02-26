import React, {Component} from 'react';

export default class Dailies extends Component {
    constructor(){
        super()
    }

    componentWillMount(){
        //pull all dailies
    }

    render(){
        return(
            <div>
                <form>
                <input placeholder="Add a daily here"/>
                </form>
            </div>
        )
    }
}