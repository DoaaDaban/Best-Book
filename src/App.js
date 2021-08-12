import React from 'react';
import Header from './Header';
// import IsLoadingAndError from './IsLoadingAndError';
// import LoginButton from './Login';
import BestBooks from './BestBooks'
import Profile from './Profile';
import Footer from './Footer';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import { withAuth0 } from '@auth0/auth0-react';
// import axios from 'axios';
import Login from './Login';


class App extends React.Component {

  constructor(props){
    super(props);
    this.state={
      show: false,
    }

  }

 
  render() {
    // const {isAuthenticated} = this.props.auth0;

    //  booksData={this.state.booksData} // showModal={this.showModal} 
    return (
      <>
        <Router>
          <Header />
          <Switch>
            <Route exact path="/">
              {/* TODO: if the user is logged in, render the `BestBooks` component, if they are not, render the `Login` component */}
                {(this.props.auth0.isAuthenticated && <BestBooks />)}
                {!this.props.auth0.isAuthenticated && (<Login />)}
            
           </Route >
            <Route exact path="/Profile">
            {/* TODO: add a route with a path of '/profile' that renders a `Profile` component */}
            {/* {isAuthenticated ? <Profile /> : <LoginButton />} */}
            {this.props.auth0.isAuthenticated && ( <Profile />)}
           

             
            </Route>
          </Switch>
          <Footer />
        </Router>
      </>
    );
  }
}

export default withAuth0(App);


