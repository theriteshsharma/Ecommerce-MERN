import React, {useState} from 'react'
import Layout from '../../components/Layout'
import Input from "../../components/UI/Input"
import {Container,Row,Col,Form, Button} from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Redirect } from 'react-router'
import {signup} from "../../actions"

function Signup(props) {
    const auth = useSelector(state => state.auth);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();
   
    const userSignup = (e)=>{
        e.preventDefault();
        const user = {
            lastName,
            firstName,
            email,
            password
        }

        dispatch(signup(user));
    }

    if(auth.authenticate){
        return <Redirect to="/" />
     }
    return (
        <Layout>
        <Container>
        <Row style={{marginTop:'50px'}}>
                <Col md = {{span:6 , offset:3}}>
                 <Form onSubmit={userSignup}>
                <Row>
                    <Col md={{span:6}}>
                        <Input
                            controlId="Name"
                            label="First Name"
                            type="text"
                            placeholder="First Name"
                            value={firstName}
                            onChange={(e)=>setFirstName(e.target.value)}
                            />
                    </Col>
                    <Col md={{span:6}}>
                        <Input
                            controlId="LName"
                            label="Last Name"
                            type="text"
                            placeholder="Last Name"
                            value={lastName}
                            onChange={(e)=>{setLastName(e.target.value)}}

                            />
                    </Col>
                </Row>
                <Input
                    controlId="Email"
                    label="Email"
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e)=>{setEmail(e.target.value)}}
                    />

                <Input
                    controlId="Password"
                    label="Password"
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e)=>{setPassword(e.target.value)}}
                    />
        <Button variant="primary" type="submit" >
          Submit
        </Button>
      </Form>

                </Col>
            </Row>
        </Container>
    
        </Layout>
        
    )
}


export default Signup;

