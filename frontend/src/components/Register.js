import React, { useState, useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { login } from '../actions/userActions';


import { Link } from 'react-router-dom';


import { Form, Button, Row, Col, Container } from 'react-bootstrap';


const RegisterScreen = () => {

      const [username, setUsername] = useState('');
      const [email, setEmail] = useState('');
      const [password, setPassword] = useState('');

      const submitHandler = () => {

      };


        return (

                <Container>
                   <Row className='justify-content-md-center'>
                      <Col xs={12} md={6} >
                       <Form onSubmit={submitHandler}>
                       <Form.Group size="lg" controlId="username">
                         <Form.Label>Name</Form.Label>
                         <Form.Control
                           autoFocus
                           type="text"
                           value={username}
                           onChange={(e) => setUsername(e.target.value)}
                         />
                       </Form.Group>
                         <Form.Group size="lg" controlId="email">
                           <Form.Label>Email</Form.Label>
                           <Form.Control

                             type="email"
                             value={email}
                             onChange={(e) => setEmail(e.target.value)}
                           />
                         </Form.Group>
                         <Form.Group size="lg" controlId="password">
                           <Form.Label>Password</Form.Label>
                           <Form.Control
                             type="password"
                             value={password}
                             onChange={(e) => setPassword(e.target.value)}
                           />
                         </Form.Group>
                         <Button block size="lg" type="submit" >
                           Login
                         </Button>
                       </Form>

                       <Row className='py-3'>
                              <Col>
                                  have Acount? <Link to='/login'>login</Link>
                              </Col>
                       </Row>

                 </Col>
                 </Row>
                 </Container>
          // </>
        );


};

export default RegisterScreen;
