import React from 'react'
import {Form } from 'react-bootstrap'
function input(props) {
    return (
     
       <Form.Group controlId={`formBasic${Math.random()}`}>
          <Form.Label>{props.label}</Form.Label>
          <Form.Control 
                    type={props.type} 
                    placeholder={props.placeholder} 
                    value={props.value}
                    onChange={props.onChange}
                    />
          <Form.Text className="text-muted">
           {props.errorMessage}
          </Form.Text>
        </Form.Group>
     
    );
}

export default input
