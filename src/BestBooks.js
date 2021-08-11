import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './BestBooks.css'
// import Jumbotron from 'react-bootstrap/Jumbotron';
import axios from 'axios';
import './BestBooks.css';

import { withAuth0 } from '@auth0/auth0-react';
import Carousel from 'react-bootstrap/Carousel';
import AddBookModal from './Component/AddBookModal';
import Button from 'react-bootstrap/Button';


class MyFavoriteBooks extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      books: [],
      displayModal:false,
      server: process.env.REACT_APP_SERVER

    }
  }

  showModal=()=>{
    this.setState({
      displayModal:!this.state.displayModal,
    })
    console.log("test show");

  }

  hideModal=()=>{
    this.setState({
      displayModal:false,
    })
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


  handleSubmitting = (event) => {
    event.preventDefault();
    this.showModal();
    console.log("test");
    // const bookName = event.target.bookName.value;
    // const bookDescription = event.target.bookDescription.value;
    // const bookStatus = event.target.bookStatus.value;
    const { user } = this.props.auth0;
    //  console.log(bookName);

    const bookData = {
      name: event.target.bookName.value,
      description: event.target.bookDescription.value,
      email: user.email,
      status: event.target.bookStatus.value,
    };

    axios
    // ${process.env.REACT_APP_SERVER}
    //http://localhost:3010/addBook?bookData
    .post(`${process.env.REACT_APP_SERVER}/addBook`, bookData)
    .then(result => {
      this.setState({
        books: result.data,
      });
    })
    .catch((err) => {
      console.log("the error is", err);
    });
};
  

  render() {
    return (
<>
      <Button onClick={()=>this.showModal()}>Add Book</Button>
      <AddBookModal
                show={this.state.displayModal}
                hideModal={this.showModal}
                handleSubmitting={this.handleSubmitting}
              />

      <Carousel >
        {this.state.books.length &&
          this.state.books.map((item) => {
            return (
              <Carousel.Item>
                <img
                  className="d-block w-50 imgBook"
                  style={{width:"350px", hight:"500px"}}
                  src={item.image}
                  alt="First slide"    
                />
                <Carousel.Caption >
                  <div style={{ fontSize: '18px', backgroundColor: "#333", width: "50%", textAlign: 'center', marginLeft: "34%" }}>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p></div>
                </Carousel.Caption>
              </Carousel.Item>
            );
          })}
      </Carousel>
   </>
    );
  }
}


export default withAuth0(MyFavoriteBooks);