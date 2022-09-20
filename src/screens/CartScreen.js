import React, { useContext } from "react";
import { Store } from "../Store";
import { Helmet } from "react-helmet-async";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { MessageBox } from "../components/MessageBox";
import { Link, useNavigate } from "react-router-dom";
import { Card, ListGroup, ListGroupItem } from "react-bootstrap";
import Button from 'react-bootstrap/Button';
import axios from "axios";

export const CartScreen = () => {
    const navigate = useNavigate();
  const { state, dispatch: cartCtxDispatch } = useContext(Store);
  const {
    cart: { cartItems },
  } = state;
  
  const updateCartHandler = async(item,quantity) => {
     const {data} = await axios.get(`/api/products/${item._id}`)
     if(data.countInStock<quantity){
        alert("This product is out of stock");
        return;
     }
     cartCtxDispatch({type:"ADD_TO_CART",payload:{...item,quantity}})
  }

  const removeItemHandler = (item) =>{
    cartCtxDispatch({type:"REMOVE_FROM_CART",payload:item})
  }
  const checkOutHandler = () =>{
    navigate(`/signin?redirect=/shipping`)
  }
  return (
    <div>
      <Helmet>
        <title>Shopping Cart</title>
      </Helmet>
      <h2>Shopping Cart</h2>
      <Row>
        <Col md={8}>
          {cartItems.length === 0 ? (
            <MessageBox>
              Your cart is empty.
              <Link to="/" className="removeDec">
                {" "}
                Go Shopping
              </Link>
            </MessageBox>
          ) : (
            <ListGroup>
              {cartItems.map((item) => (
                <ListGroupItem key={item._id}>
                  <Row className="align-items-center">
                    <Col md={4}>
                      <img
                        src={item.image}
                        alt={item.name}
                        className="img-fluid img-thumbnail"
                      />{" "}
                      <Link to={`/product/${item.slug}`} className="removeDec">
                        {item.name}
                      </Link>
                    </Col>
                    <Col md={3}>
                        <Button variant="light" disabled={item.quantity===1} onClick ={()=>updateCartHandler(item,item.quantity-1)}>
                        <i className="fas fa-minus-circle"></i>
                        </Button>{' '}
                        <span>{item.quantity}</span>{' '}
                        <Button variant="light" onClick ={()=>updateCartHandler(item,item.quantity+1)} disabled={item.quantity===item.countInStock}>
                        <i className="fas fa-plus-circle"></i>
                        </Button>{' '}
                    </Col>
                    <Col md={3}>
                    ₹{item.price}
                    </Col>
                    <Col md={2}>
                        <Button variant="light" onClick={()=>removeItemHandler(item)}>
                            <i className ="fas fa-trash"></i>
                        </Button>
                    </Col>
                  </Row>
                </ListGroupItem>
              ))}
            </ListGroup>
          )}
        </Col>
        <Col md={4}>
            <Card>
                <Card.Body>
                    <ListGroup variant="flush">
                        <ListGroup.Item>
                            <h4>
                            Subtotal ({cartItems.reduce((acc,curr)=>acc+curr.quantity,0)}
                            {' '} items) :  ₹ {cartItems.reduce((acc,curr)=>acc+curr.price*curr.quantity,0)}
                            </h4>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <div className="d-grid">
                                <Button style={{backgroundColor: "#ffc040",color:"black"}} onClick={checkOutHandler} disabled={cartItems.length===0}>Proceed to Checkout</Button>
                            </div>
                        </ListGroup.Item>
                    </ListGroup>
                </Card.Body>
            </Card>
        </Col>
      </Row>
    </div>
  );
};
