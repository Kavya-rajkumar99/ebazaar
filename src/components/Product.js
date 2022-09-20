import axios from "axios";
import React, { useContext } from "react";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Link } from "react-router-dom";
import { Store } from "../Store";
import {Rating} from "./Rating";


export const Product = ({product}) => {

  const {state,dispatch:cartCtxDispatch} = useContext(Store)
  const {cart:{cartItems}} = state

  const addToCartHandler = async(item) =>{
    const cartItem = cartItems.find((cItem)=>cItem._id===item._id)
    const quantity = cartItem?cartItem.quantity+1 : 1;
    const {data} = await axios.get(`/api/products/${item._id}`)
    if(data.countInStock < quantity){
      alert("This product is out of stock");
      return;
    }
    cartCtxDispatch({type:"ADD_TO_CART",payload:{...item,quantity}})
  }
  return (
    <Card>
      <Link to={`/product/${product.slug}`}>
        <img src={product.image} alt={product.name} className="card-img-top"/>
      </Link>
      <Card.Body>
        <Link to={`/product/${product.slug}`}>
          <Card.Title>{product.name}</Card.Title>
        </Link>
        <Rating rating={product.rating} numOfReviews={product.numOfReviews}/>
        <Card.Text>₹{product.price}</Card.Text>
        {
          product.countInStock===0 ? <Button disabled variant="light">Out of Stock</Button> :
          <Button onClick={()=>addToCartHandler(product)} style={{ backgroundColor: "#ffc040",color:"black"}}>Add to Cart</Button>
        }
        
      </Card.Body>
    </Card>
  );
};
