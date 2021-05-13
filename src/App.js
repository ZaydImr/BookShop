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
          <Route exact path='/BookShop' component={Home} />
          <Route path='/BookShop/login' component={Login} />
          <Route path='/BookShop/books' component={Books} />
          <Route path='/BookShop/book/:ISBN' children={<BookInfo/>}/>
          <PrivateRoute path='/BookShop/dashboard' component={Admin} />
          <Route path='*' component={Error} />
        </Switch>
      </Router>
  );
}

export default App;
