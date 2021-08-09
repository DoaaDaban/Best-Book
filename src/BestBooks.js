  
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Jumbotron from 'react-bootstrap/Jumbotron';
import './BestBooks.css';
import { withAuth0 } from '@auth0/auth0-react'; // classes
import axios from 'axios';
// import {Carousel} from 'react-bootstrap';
import {Card} from 'react-bootstrap';



class MyFavoriteBooks extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      books: []
    };
  }

  // component did mount is a react lifecycle component that is invoked/ executed once the component mounted / loaded
  componentDidMount(){
    //  const {user} = this.props.auth0;
    // const userEmail = user.email;
    console.log(this.props.auth0)
    console.log(this.state.books);


    // we are sending an axios promise to our backend endpoint
    axios
    .get(`${process.env.REACT_APP_SERVER}/books?email=doaadaban993@gmail.com`)
    .then((resultData) => { // .then access the data when the promise is resolved
      // console.log(resultData.data); // to access the axios response data you need to target the .data property
      this.setState({
        books: resultData.data
      });
    }).catch(error => alert(error)); // will execute if the promise was rejected, basically something going wrong
  };

//   getData = async () => {
//     const { user, isAuthenticated } = this.props.auth0;
//     if (isAuthenticated) {
//       const url = `${process.env.REACT_APP_SERVER}/books`;
//       const paramObj = {
//         params: {
//           name: user.email,
//         },
//       };
//       axios
//         .get(url, paramObj)
//         .then((result) => {
//           this.setState({
//             booksData: result.data,
//           });
//           console.log(result.data);
//         })
//         .catch((err) => {
//           console.log(err);
//         });
//     }
//   };

//   componentDidMount() {
//     this.getData();
//   }

//   render() {
//     return (
//       <Carousel>
//         {this.state.booksData &&
//           this.state.booksData.map((item) => {
//             return (
//               <Carousel.Item interval={1000}>
//                 <img
//                   className="d-block w-100"
//                   src="https://via.placeholder.com/1000x300.png/363533?text=Books+Poster+Place+Holder"
//                   alt="First slide"
//                 />
//                 <Carousel.Caption>
//                   <h3>{item.title}</h3>
//                   <p>{item.description}</p>
//                 </Carousel.Caption>
//               </Carousel.Item>
//             );
//           })}
//       </Carousel>
//     );
//   }
// }

  render() {

    const  {isAuthenticated} = this.props.auth0;

    return(
      <Jumbotron>
        {isAuthenticated && 
        <>
        <h1>My Favorite Books</h1>
        <p>
          This is a collection of my favorite books
        </p>
        {
            this.state.books.length && 
            <div>
            {
              this.state.books.map(book => {
                return (
                  <Card style={{ width: '18rem' }}>
                    <Card.Img variant="top" src={book.img} />
                    <Card.Body>
                      <Card.Title>{book.title}</Card.Title>
                      <Card.Text>
                        {book.description}
                      </Card.Text>
                      <Card.Text>
                        {book.status}
                      </Card.Text>
                    </Card.Body>
                  </Card>
                )
              })
            }
          </div>
        }
        </>
        }
      </Jumbotron>
    )
  }
}


export default withAuth0(MyFavoriteBooks);