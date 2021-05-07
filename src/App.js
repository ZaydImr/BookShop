import React  from 'react'
import Login from './Components/Login';
import Home from './Components/Home'
import Admin from './Components/Admin'
import { BrowserRouter as Router , Switch,Route } from 'react-router-dom'
import PrivateRoute from './Components/PrivateRouter'
import Books from './Components/Books';

function App() {
  return (
    <>
      <Router>
        <Switch>
          <Route exact path='/' component={Home} />
          <Route path='/login' component={Login} />
          <Route path='/books' component={Books} />
          <PrivateRoute path='/dashboard' component={Admin} />
        </Switch>
      </Router>
    </>
  );
}

export default App;
