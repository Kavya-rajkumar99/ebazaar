import React from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useReducer,useContext } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ListGroup from "react-bootstrap/ListGroup";
import { Rating } from "../components/Rating";
import Card from "react-bootstrap/Card";
import Badge from 'react-bootstrap/Badge';
import Button from 'react-bootstrap/Button';
import {Helmet} from 'react-helmet-async';
import { LoadingBox } from "../components/LoadingBox";
import { MessageBox } from "../components/MessageBox";
import { getError } from "../utils";
import { Store } from "../Store";


const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true };
    case "FETCH_SUCCESS":
      return { ...state, loading: false, product: action.payload };
    case "FETCH_FAILURE":
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};
export const ProductScreen = () => {
  const { slug } = useParams();
  const [{ loading, error, product }, dispatch] = useReducer(reducer, {
    loading: true,
    error: "",
    product: {},
  });
  useEffect(() => {
    const fetchProducts = async () => {
      console.log("Hiii");
      dispatch({ type: "FETCH_REQUEST" });
      try {
        const result = await axios.get(`/api/products/slug/${slug}`);
        dispatch({ type: "FETCH_SUCCESS", payload: result.data });
      } catch (err) {
        dispatch({ type: "FETCH_FAILURE", payload: getError(err) });
      }
      // setProducts(result.data);
    };
    fetchProducts();
  }, [slug]);

  const {state,dispatch:cartCtxDispatch} = useContext(Store)
  const {cart} = state;
  const addToCartHandler = async () =>{
    const cartItem = cart.cartItems.find((item)=>item._id===product._id)
    const quantity = cartItem?cartItem.quantity+1 : 1;
    const {data} = await axios.get(`/api/products/${product._id}`)
    if(data.countInStock < quantity){
      alert("This product is out of stock");
      return;
    }
     cartCtxDispatch({type:"ADD_TO_CART",payload:{...product,quantity}})
     console.log(cart)
  }
  return loading ? (
    <LoadingBox />
  ) : error ? (
    <MessageBox variant="danger">{error}</MessageBox>
  ) : (
    <div>
      <Row>
        <Col md={4}>
          <img className="imageSize" src={product.image} alt={product.name} />
        </Col>
        <Col md={5}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <Helmet>
                <title>{product.name}</title>
              </Helmet>
              <h2>{product.name}</h2>
            </ListGroup.Item>
            <ListGroup.Item>
              <Rating
                rating={product.rating}
                numOfReviews={product.numOfReviews}
              />
            </ListGroup.Item>
            <ListGroup.Item>Price : ₹{product.price}</ListGroup.Item>
            <ListGroup.Item>
              Description : <p>{product.description}</p>
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={3}>
          <Card>
            <Card.Body>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <Row>
                    <Col>Price:</Col>
                    <Col>₹{product.price}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Status:</Col>
                    <Col>{product.countInStock>0?<Badge bg="success">In Stock</Badge>:<Badge bg="danger">Out of Stock</Badge> }</Col>
                  </Row>
                </ListGroup.Item>
                {product.countInStock>0 &&
                <ListGroup.Item>
                  <div className="d-grid">
                    <Button onClick={addToCartHandler} style={{backgroundColor: "#ffc040",color:"black"}}>Add to Cart</Button>
                  </div>
                  </ListGroup.Item>}
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
};
