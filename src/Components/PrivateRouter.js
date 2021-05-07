import { Redirect, Route } from 'react-router';
import fire from '../firebase/config';

export default function PrivateRoute ({component:Component , ...rest}){
      const cuurentUser = fire.auth().currentUser;
      return (
            <Route
            {...rest} render={props => {
                  return cuurentUser ? <Component {...props}/> : <Redirect to='/login' />
            }}></Route>
      )
}