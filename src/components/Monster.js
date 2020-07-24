import React, { Component } from 'react'
import { BrowserRouter as Route, Link, Redirect} from 'react-router-dom'
import * as moment from 'moment'

class Profile extends Component {
  constructor (props) {
    super(props)

    this.state = {
      monsters: [],
      username: '',
      email: '',
      firstname: '',
      lastname: '',
      age: '',
      birthdate: '',
      city: '',
      state: '',
      photo: '',
      wallpaper: ''
    }
  }

  componentDidMount () {
  }

  isLoggedIn () {
    if (sessionStorage.token && sessionStorage.token !== 'undefined') {
      return true
    } else {
      this.handleLogout()
      return false
    }
  }

  getMonsters () {
    let that = this
    fetch('https://www.moogleapi.com/api/v1/monsters', {
        method: 'get'
      }).then(response => response.json())
        .then(function(response) {
            that.setState({
                monsters: response
              })
        })
  }

  handleLogout (e) {
    sessionStorage.clear()
    this.props.history.push('/relm')
  }

  handleMonsterUpdate (e) {
    // TODO:
    e.preventDefault()
    const token = sessionStorage.token
    const user = JSON.parse(sessionStorage.user)
    if (this.validateForm()) {
      let payload = new FormData()
      payload.append('id', user.id)
      payload.append('photo', (this.state.photo === '') ? user.photo : document.forms['profile-form']['upload-photo'].files[0])
      payload.append('wallpaper', (this.state.wallpaper === '') ? user.wallpaper : document.forms['profile-form']['upload-wallpaper'].files[0])
      payload.append('username', (this.state.username === '') ? user.userName : this.state.username)
      payload.append('email', (this.state.email === '') ? user.email : this.state.email)
      payload.append('firstname', (this.state.firstname === '') ? user.firstName : this.state.firstname)
      payload.append('lastname', (this.state.lastname === '') ? user.lastName : this.state.lastname)
      payload.append('age', (this.state.age === '') ? user.age : this.state.age)
      payload.append('birthdate', (this.state.birthdate === '') ? user.birthDate : this.state.birthdate)
      payload.append('city', (this.state.city === '') ? user.city : this.state.city)
      payload.append('state', (this.state.state === '') ? user.state : this.state.state)
      fetch('https://chocoboapi.azurewebsites.net/v1/manage/update', {
        method: 'put',
        headers: {
          'Authorization': 'Bearer ' + token
        },
        body: payload
      }).then(response => response.json())
        .then(function(response) {
          if (response.user) {
            sessionStorage.setItem('user', JSON.stringify(response.user));
          } else {
            console.log('update failed')
            console.log(response.errors)
          }
        })
    } else {
      console.log('validation failed')
    }
  }

  validateForm() {
    let error = 0

    if (error === 1) {
      document.getElementById('validation-error').style.display = 'block'
      return false
    } else {
      document.getElementById('validation-error').style.display = 'none'
      return true
    }
  }

  render () {
    if (this.isLoggedIn()) {
      const user = JSON.parse(sessionStorage.user)
      this.getMonsters()
      return (
        <header className='form-container'>
            <h1>Monsters will go here.</h1>
        </header>
      )
    } else {
      return <Redirect to="/relm" />
    }
  }
}

export default Profile
