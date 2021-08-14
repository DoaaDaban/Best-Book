import React from 'react';
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'

class BookCard extends React.Component {

    render () {

        return (
            <>
            {
            this.props.arr.length &&

                this.props.arr.map((item) =>{

return (
<Card style={{ width: '18rem' }}>
  <Card.Body>
    <Card.Title>{item.title}</Card.Title>
    <Card.Subtitle className="mb-2 text-muted">{item.status}</Card.Subtitle>
    <Card.Text>
     {item.description}
    </Card.Text>
    <Button variant="primary" onClick={this.props.deleteBook}>Delete</Button>
  </Card.Body>
</Card>
)
                })
            




}
</>
        )


    }

}


export default BookCard ;
