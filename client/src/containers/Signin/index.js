import {React, useEffect, useState} from "react";
import Layout from "../../components/Layout";
import Input from "../../components/UI/Input"
import {Container,Row,Col,Form, Button} from 'react-bootstrap'
import {login} from '../../actions'
import {useDispatch, useSelector} from 'react-redux'
import { Redirect } from "react-router";
import {isLoggedIn} from "../../actions/auth.action"


function Signin(props) {
  
    const dispatch  = useDispatch();
    const [email, setemail] = useState('');
    const [password, setpassword] = useState('');
    const [error, seterror] = useState('');
    const auth = useSelector(state => state.auth); 

    const userLogin=(e)=>{
        e.preventDefault();
        const user = {
            email,
            password
        }
        console.log(user);
        dispatch(login(user));
    }

    if(auth.authenticate){
       return <Redirect to="/" />
    }

  return (
      <>
    <Layout>
        <Container>
        <Row style={{marginTop:'50px'}}>
                <Col md = {{span:6 , offset:3}}>
                    <Form onSubmit={userLogin}>
                    <Input
                        controlId="Email"
                        label="Email"
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e)=>setemail(e.target.value)}
                        />

                    <Input
                        controlId="Password"
                        label="Password"
                        type="password"
                        placeholder="Password"
                        value= {password}
                        onChange={(e)=>setpassword(e.target.value)}
                        />
                    <Button variant="primary" type="submit">
                    Submit
                    </Button>
                    </Form>
                </Col>
            </Row>
            
        </Container>
      
    </Layout>
    </>
  );
}

export default Signin;
