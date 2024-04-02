import {Component} from 'react'
import Cookies from 'js-cookie'

import './index.css'

class LoginRoute extends Component {
  state = {username: '', password: '', errorMsg: false}

  onChangeUsername = event => {
    console.log(event.target.value)
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    console.log(event.target.value)
    this.setState({password: event.target.value})
  }

  onSubmissonSuccessful = jwtToken => {
    const {history} = this.props
    console.log(history)
    Cookies.set('jwt_token', jwtToken, {
      expires: 30,
      path: '/',
    })
    history.replace('/')
  }

  onSubmissionFailure = error => {
    this.setState({errorMsg: true})
    console.log(error)
  }

  fromSubmitted = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}
    const loginUrl = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(loginUrl, options)
    const data = await response.json()
    if (response.ok === true) {
      this.onSubmissonSuccessful(data.jwt_token)
    } else {
      console.log(data.error_msg)
      this.onSubmissionFailure(data.error_msg)
    }
  }

  render() {
    const {username, password, errorMsg} = this.state

    return (
      <div className="bg-login-container">
        <form
          className="login-form"
          type="submit"
          onSubmit={this.fromSubmitted}
        >
          <img
            className="logo-image"
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
          />
          <div className="input-container">
            <p className="input-lable" htmlFor="username">
              USERNAME
            </p>
            <input
              type="text"
              className="input-text"
              id="username"
              onChange={this.onChangeUsername}
              value={username}
            />
          </div>
          <div className="input-container">
            <p className="input-lable" htmlFor="password">
              PASSWORD
            </p>
            <input
              type="text"
              className="input-text"
              id="password"
              onChange={this.onChangePassword}
              value={password}
            />
          </div>
          <div className="button-container">
            <button className="login-btn" type="submit">
              Login
            </button>
            {errorMsg && (
              <p className="error-msg">username and password didn't match</p>
            )}
          </div>
        </form>
      </div>
    )
  }
}

export default LoginRoute
