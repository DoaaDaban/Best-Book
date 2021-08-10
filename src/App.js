import React from 'react';
import Header from './Header';
// import IsLoadingAndError from './IsLoadingAndError';
import LoginButton from './LoginButton';
import BestBooks from './BestBooks'
import Profile from './Profile';
import Footer from './Footer';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import { withAuth0 } from '@auth0/auth0-react';


class App extends React.Component {
  
  render() {
    const {isAuthenticated} = this.props.auth0;

    // console.log('app', this.props);
  
    return (
      <>
        <Router>
          {/* <IsLoadingAndError> */}
          <Header />
          <Switch>
            <Route exact path="/">
              {/* TODO: if the user is logged in, render the `BestBooks` component, if they are not, render the `Login` component */}
                {isAuthenticated ? <BestBooks /> : <LoginButton />}
               
            </Route >

            <Route exact path="/Profile">
            {/* TODO: add a route with a path of '/profile' that renders a `Profile` component */}
            {/* {isAuthenticated ? <Profile /> : <LoginButton />} */}
            <Profile />
            
            </Route>
          </Switch>
          <Footer />
          {/* </IsLoadingAndError> */}
        </Router>
      </>
    );
  }
}

export default withAuth0(App);


