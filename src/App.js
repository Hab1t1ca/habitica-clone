import React, { Component } from 'react';
import Router from './router';
import './reset.css';
import './App.css';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

export default class App extends Component {
  render() {
    return (
      <div className="MobileView">
      <div className="MobileViewPic">
      <h1>Mobile View Only</h1>
      <p>Right click and select inspect</p><br/>
      <p>On the window that pops up, find the 2 small square shape to the left of the elements tab</p><br/>
      <p>If you still see this, you may need to click on one of the phone screen sizes at the top middle of your screen</p>
      </div>
      {/* <img className="MobileViewPic" src="http://res.cloudinary.com/rigrater/image/upload/v1520273646/MobileView_mmshhd.png"/> */}
      <MuiThemeProvider>
      <Router/>
      </MuiThemeProvider>
      </div>
    );
  }
}

