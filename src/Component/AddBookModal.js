import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Form } from "react-bootstrap";
import {Row,Col} from 'react-bootstrap';
import {Modal} from 'react-bootstrap';


class AddBookModal extends Component {

    

    render() {
        return (
<>
            <Modal show={this.props.show} onHide={this.props.hideModal}>
        <Modal.Header closeButton>
          <Modal.Title>Adding New Book</Modal.Title>
        </Modal.Header>
        
        <Form onSubmit={this.props.handleSubmitting}>
            <Row className="mb-3">
              <Form.Group as={Col} controlId="formGridEmail">
                <Form.Label>Book Name</Form.Label>
                <Form.Control type="text" placeholder="Enter Book Name" 
                 name='bookName'/>
              </Form.Group>
          
              <Form.Group as={Col} controlId="formGridPassword">
                <Form.Label>Book Description</Form.Label>
                <Form.Control type="text" placeholder="Enter Book Description" 
                 name='bookDescription'/>
              </Form.Group>
            </Row>
          
          
            <Row className="mb-3">
                 
              <Form.Group as={Col} controlId="formGridState">
                <Form.Label>Status</Form.Label>
                <Form.Select  name='bookStatus' defaultValue="Choose...">
                  <option>Life Changing</option>
                  <option>Recomended</option>
                  <option>Top ten</option>
                </Form.Select>
              </Form.Group>
          
            </Row>
          
          </Form>

        <Modal.Footer>
          <Button variant="secondary" onClick={this.props.hideModal}>
            Close
          </Button>
          <Button variant="primary" onClick={this.props.hideModal}>
            ADD Book!
          </Button>
        </Modal.Footer>
      </Modal>

           
</>
        )
    }
}

export default AddBookModal;
