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
import UpdateBook from './Component/UpdateBook';


class MyFavoriteBooks extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      books: [],
      showModal: false,
      // server: process.env.REACT_APP_SERVER
    }
  }

  showModalForm = () => {
    this.setState({
      showModal: true
    });
    console.log("test show");

  }

  hideModal = () => {
    this.setState({
      showModal: false,
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
      console.log("test");
      // const bookName = event.target.bookName.value;
      // const bookDescription = event.target.bookDescription.value;
      // const bookStatus = event.target.bookStatus.value;
      const { user } = this.props.auth0;
     // console.log(bookName);

      const bookData = {
        email: user.email,
        title: event.target.bookName.value,
        description: event.target.bookDescription.value,
        status: event.target.bookStatus.value,
        image: event.target.bookImage.value
      };

      axios
      // ${process.env.REACT_APP_SERVER}
      //http://localhost:3010/addbook?bookData
      .post(`http://localhost:3010/addbook`, bookData)
      .then(result => {
        console.log(result)
        this.setState({
          books: result.data,
        });
      })
      .catch((err) => {
        console.log("the error is", err);
      });
  };


  deleteBook =(bookId) =>{
    axios.delete(`${process.env.REACT_APP_SERVER}/deleteBook/${bookId}`)
    .then(axiosRes =>{
      if (axiosRes.data.deletedCount){
        const tempBookArr = this.state.books.filter(itemBook => itemBook._id !== bookId );
        this.setState({books: tempBookArr});
      }
    }).catch(error => alert (error));
  }

  render() {
    return (
      <>
        <Button onClick={this.showModalForm}>Add Book</Button>
        <AddBookModal
          show={this.state.showModal}
          hideModal={this.hideModal}
          handleSubmitting={this.handleSubmitting}
        />

        <Carousel >
          {this.state.books.length &&
            this.state.books.map((item) => {
              return (
                <Carousel.Item>
                  <img
                    className="d-block w-50 imgBook"
                    style={{ width: "350px", hight: "500px" }}
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
            <Button onClick={()=>{this.deleteBook(book._id)}}>Delete Book</Button>
            <Button onClick={()=>{this.UpdateBook(books)}}>Update Book</Button>
        </Carousel>
      </>
    );
  }
}


export default withAuth0(MyFavoriteBooks);