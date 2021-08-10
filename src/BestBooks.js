import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
// import Jumbotron from 'react-bootstrap/Jumbotron';
import axios from 'axios';
import './BestBooks.css';

import { withAuth0 } from '@auth0/auth0-react';
import Carousel from 'react-bootstrap/Carousel';


class MyFavoriteBooks extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      books: []
    }
  }

  componentDidMount = () => {

    const { user } = this.props.auth0;

    console.log(this.props.auth0);

    axios.get(`http://localhost:3010/books?email=${user.email}`).then(dataResults => {
      this.setState({

        // books:dataResults.data[0].books
        books: dataResults.data
      });
      // console.log(dataResults.data[0].books[0].title);
      // console.log(dataResults.data[0].books.title);
      console.log(dataResults.data);

    }).catch(error => (error));
  }

  render() {

    return (
      <Carousel >
        {this.state.books &&
          this.state.books.map((item) => {
            return (
              <Carousel.Item interval={1000}>
                <img
                  className="d-block w-100"
                  style={{width:"350px", hight:"500px"}}
                  src={item.image}
                  alt="First slide"    
                />
                <Carousel.Caption>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </Carousel.Caption>
              </Carousel.Item>
            );
          })}
      </Carousel>
    );
   
  }
}


export default withAuth0(MyFavoriteBooks);