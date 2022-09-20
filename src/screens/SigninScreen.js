import React from "react";
import { Container, Form, FormGroup, Button } from "react-bootstrap";
import { Helmet } from "react-helmet-async";
import { Link,useLocation } from "react-router-dom";


const SigninScreen = () => {
    const {search} = useLocation()
    const redirectURL = new URLSearchParams(search).get("redirect")
    const redirect = redirectURL? redirectURL : "/"
  return (
    <Container className="formContainer">
      <Helmet>
        <title>Sign In</title>
      </Helmet>
      <h1 className="my-3">Sign In</h1>
      <Form>
        <FormGroup className="mb-3" controlId="email">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter email" required />
        </FormGroup>
        <FormGroup className="mb-3" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Enter password" required />
        </FormGroup>
        <div className="mb-3">
          <Button style={{backgroundColor: "#ffc040",color:"black"}} type="submit">Sign In</Button>
        </div>
        <div className="mb-3">
            New Customer ? <Link className="removeDec" to={`/signup?redirect=${redirect}`}>Create an account</Link>
        </div>
      </Form>
    </Container>
  );
};

export default SigninScreen;
