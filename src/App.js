import React, { Component } from 'react';
import Router from './router';
import './reset.css';
import './App.css';
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

