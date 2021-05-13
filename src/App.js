import React  from 'react'
import Login from './Components/Login';
import Home from './Components/Home'
import Admin from './Components/Admin'
import Error from './Components/Error'
import { BrowserRouter as Router , Switch,Route } from 'react-router-dom'
import PrivateRoute from './Components/PrivateRouter'
import Books from './Components/Books';
import BookInfo from './Components/BookInfo';

function App() {
  return (
    <Router>
        <Switch>
          <Route exact path='/' component={Home} />
          <Route path='/login' component={Login} />
          <Route path='/books' component={Books} />
          <Route path='/book/:ISBN' children={<BookInfo/>}/>
          <PrivateRoute path='/dashboard' component={Admin} />
          <Route path='*' component={Error} />
        </Switch>
      </Router>
  );
}

export default App;
