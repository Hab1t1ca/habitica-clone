import React, { Component } from 'react';
import Router from './router';
import './reset.css';
import './App.css';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

export default class App extends Component {
  render() {
    return (
      <div className="MobileView">
      <img className="MobileViewPic" src="http://res.cloudinary.com/rigrater/image/upload/v1520273646/MobileView_mmshhd.png"/>
      <MuiThemeProvider>
      <Router/>
      </MuiThemeProvider>
      </div>
    );
  }
}

