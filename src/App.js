import React, { Component } from 'react';
import Helmet from 'react-helmet';
import { Route, Link, Switch } from 'react-router-dom'

import './App.css';

import Home from './components/home';
import School from './components/school';
import Navigation from './components/navigation';
import NotFound from './components/not-found';
import Departments from './components/department'

class App extends Component {
  render() {

    return (
      <main className="app">
        <Helmet defaultTitle="Próftöflur"
        titleTemplate="%s - Próftöflur"/>
        <h1>Próftöflur</h1>
        <Navigation/>
        <Switch>
          <Route exact path="/" component={Home}/>
          <Route path="/:school" component={School}/>
          <Route component={NotFound}/>
        </Switch>
      </main>
    );
  }
}

export default App;
