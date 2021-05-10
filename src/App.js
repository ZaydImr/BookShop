import React  from 'react'
import Login from './Components/Login';
import Home from './Components/Home'
import Admin from './Components/Admin'
import { BrowserRouter as Router , Switch,Route } from 'react-router-dom'
import PrivateRoute from './Components/PrivateRouter'
import Books from './Components/Books';

function App() {
  return (
    <Router>
        <Switch>
          <Route exact path='/BookShop' component={Home} />
          <Route path='/BookShop/login' component={Login} />
          <Route path='/BookShop/books' component={Books} />
          <PrivateRoute path='/BookShop/dashboard' component={Admin} />
        </Switch>
      </Router>
  );
}

export default App;
