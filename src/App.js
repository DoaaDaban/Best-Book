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
import AddBookModal from './Component/AddBookModal';
import axios from 'axios';
import Login from './Login';


class App extends React.Component {

  constructor(props){
    super(props);

    this.state={
        show:false,

    }
}

  showModal=()=>{
    this.setState({
      show:true,
    })
  }

  hideModal=()=>{
    this.setState({
      show:false,
    })
  }

  handleSubmitting = (event) => {
    event.preventDefault();
    const { user } = this.props.auth0;
    const bookName = event.target.bookName.value;
    const bookDescription = event.target.bookDescription.value;
    const bookStatus = event.target.bookStatus.value;

    const bookData = {
      name: bookName,
      description: bookDescription,
      email: user.email,
      status: bookStatus,
    };

    axios
    //http:localhost:3010/books?bookData
    .post(`${process.env.REACT_APP_URL}/books`, bookData)
    .then((result) => {
      this.setState({
        booksData: result.data,
      });
    })
    .catch((err) => {
      console.log("the error is", err);
    });
};
  
  render() {
    const {isAuthenticated} = this.props.auth0;

    return (
      <>
        <Router>
          <Header />
          <Switch>
            <Route exact path="/">
              {/* TODO: if the user is logged in, render the `BestBooks` component, if they are not, render the `Login` component */}
                {isAuthenticated ? <BestBooks showModal={this.showModal} 
                booksData={this.state.booksData}
                  /> : <LoginButton />}     

                   {!isAuthenticated && <Login />}
              <AddBookModal
                show={this.state.show}
                hideModal={this.hideModal}
                handleSubmitting={this.handleSubmitting}
              />
                     
            </Route >
            <Route exact path="/Profile">
            {/* TODO: add a route with a path of '/profile' that renders a `Profile` component */}
            {/* {isAuthenticated ? <Profile /> : <LoginButton />} */}
            <Profile />

             
            </Route>
          </Switch>
          <Footer />
        </Router>
      </>
    );
  }
}

export default withAuth0(App);


