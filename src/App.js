import React, { Component } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Navbar from 'react-bootstrap/Navbar'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import login from './components/Login'
import profile from './components/Profile'
import monster from './components/Monster'
import './App.css'

class App extends Component {
  render () {
    return (
      <Router basename='/'>
        <Navbar className='dark-nav' />

        <Route exact path='/relm' component={login} />
        <Route path='/relm/login' component={login} />
        <Route path='/relm/profile' component={profile} />
        <Route path='/relm/monsters' component={monster} />
      </Router>
    )
  }
}

export default App
