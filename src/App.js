import React from 'react';
import Header from './Header';
import BestBooks from './BestBooks'
import Profile from './Profile';
import Footer from './Footer';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";


class App extends React.Component {
  
  render() {
  
    console.log('app', this.props);
  
    return (
      <>
        <Router>
          {/* <IsLoadingAndError> */}
          <Header />
          <Switch>
            <Route exact path="/">
              {/* TODO: if the user is logged in, render the `BestBooks` component, if they are not, render the `Login` component */}
                {/* {isAuthenticated ? <BestBooks /> : <LoginButton />} */}
                {/* <LogoutButton /> */}
               <BestBooks />
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

export default App;