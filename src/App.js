import {BrowserRouter, Route, Switch} from 'react-router-dom'
import LoginRoute from './Components/LoginRoute'
import HomeRoute from './Components/HomeRoute'
import JobsRoute from './Components/JobsRoute'
import ProtectedRoute from './Components/ProtectedRoute'

import './App.css'

// These are the lists used in the application. You can move them to any component needed.

// Replace your code here
const App = () => (
  <BrowserRouter>
    <Switch>
      <Route exaxt path="/login" component={LoginRoute} />
      <ProtectedRoute exact path="/" component={HomeRoute} />
      <ProtectedRoute exact path="/jobs" component={JobsRoute} />
    </Switch>
  </BrowserRouter>
)
export default App
