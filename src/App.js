import React,{useEffect}  from 'react'
import Login from './Components/Login';
import Home from './Components/Home'
import Admin from './Components/Admin'
import Error from './Components/Error'
import { BrowserRouter as Router , Switch,Route } from 'react-router-dom'
import PrivateRoute from './Components/PrivateRouter'
import Books from './Components/Books';
import BookInfo from './Components/BookInfo';
import fire, { firestore } from './firebase/config';
import Messages from './Components/Messages'
import { useState } from 'react';



function App() {

  const [userConnected,setUserConnected] = useState(false)

  useEffect(() => {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
    today = mm + '_' + dd + '_' + yyyy;
    firestore.collection('Visitors').doc(today).get().then((doc)=> {
      firestore.collection('Visitors').doc(today).update({
        counter:++doc.data().counter
      })
    }).catch(()=>{
      firestore.collection('Visitors').doc(today).set({counter:1})
    })
  }, [])

  fire.auth().onAuthStateChanged(user=>{
    setUserConnected(user)
  })

  return (
      <Router>
        {!userConnected && <Messages />}
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
