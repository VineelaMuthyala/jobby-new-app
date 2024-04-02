import {withRouter, Link} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

const HeaderRoute = props => {
  const onLogout = () => {
    const {history} = props
    console.log(history)
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  return (
    <div className="header-container">
      <img
        className="header-logo-image"
        src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
        alt="website logo"
      />
      <div className="options-container">
        <Link to="/">
          <p className="header-text">Home</p>
        </Link>
        <Link to="/jobs">
          <p className="header-text">Jobs</p>
        </Link>
      </div>
      <button className="logout-btn" type="button" onClick={onLogout}>
        Logout
      </button>
    </div>
  )
}

export default withRouter(HeaderRoute)
