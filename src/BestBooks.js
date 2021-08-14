import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './BestBooks.css'
// import Jumbotron from 'react-bootstrap/Jumbotron';
import axios from 'axios';
import './BestBooks.css';

import { withAuth0 } from '@auth0/auth0-react';
// import Carousel from 'react-bootstrap/Carousel';
import AddBookModal from './Component/AddBookModal';
import Button from 'react-bootstrap/Button';
import BookCard from './Component/BookCard';


class MyFavoriteBooks extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      booksArr: [],
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
        booksArr: dataResults.data
      });
      // console.log(dataResults.data[0].books[0].title);
      // console.log(dataResults.data[0].books.title);
      console.log(dataResults.data);

    }).catch(error => (error));
  }


  addBook=(e) =>{
    e.preventDefault();
    const URL = `http://localhost:3010/addbooks`
    const title=e.target.bookName.value;
    const description=e.target.bookDescription.value;
    // const image=e.target.image.value;
    const status=e.target.status.value;
    const  {user} = this.props.auth0;
    const bookData = {
  
  
      email:user.email,
      title:title,
      description:description,
      // image:image,
      status:status,
    }
  
  console.log(bookData);
  axios
  .post(URL,bookData)
  .then(data=>{
    try{
      this.setState({
        booksArr:data.data
      })
    }catch (e) {
      <>
      <h1>ERROR IS HERE </h1>
      </>
    }
  
    console.log('from best book fun ' ,this.state.booksArr);
   
  }).catch((err)=>{
    console.log(err);
    alert(err);
    <h1>error happened</h1>
  
  })
  }

// delete function ----------------------------
deleteBook=(idx) =>{
  const  {user} = this.props.auth0;
  const URL = `http://localhost:3010/deleteBook/${idx}`
  
  
  const deleteData = {
    

    email:user.email,
    
  }

console.log(deleteData);
axios
.delete(URL,deleteData)
.then(data=>{
  
    this.setState({
      booksArr:data.data
    })
  

  console.log('from delete function' ,this.state.booksArr);
 
}).catch((err)=>{
  console.log(err);
  alert(err);
  <h1>error happened</h1>

})
}


  
  showModal = () =>{
    this.setState({
      showModal:true
    });
  }
  hideModal = ()=>{
    this.setState({
   showModal:false,
   updateShow : false
    });
  }
  


  render() {
    return (
      <>
        <Button onClick={this.showModal}>Add Book</Button>
        <AddBookModal
          show={this.state.showModal}
          hideModal={this.hideModal}
        handleSubmitting={this.addBook}
        />


   <BookCard 
        
        arr={this.state.booksArr}

        deleteBook = {this.deleteBook}
        
        />

        {/* <Carousel >
          {this.state.booksArr.length &&
            this.state.booksArr.map((item) => {
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
        </Carousel> */}
      </>

    );
  }
}


export default withAuth0(MyFavoriteBooks);