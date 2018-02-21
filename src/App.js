import React, { Component } from 'react';
import './App.css';
import Router from './router';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';


export default class App extends Component {
  render() {
    return (
      <div>
      <MuiThemeProvider>
      <Router/>
      </MuiThemeProvider>
      </div>
    );
  }
}

