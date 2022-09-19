import React from "react";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Link } from "react-router-dom";
import {Rating} from "./Rating";


export const Product = ({product}) => {
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
        <Button style={{ backgroundColor: "#ffc040",color:"black"}}>Add to Cart</Button>
      </Card.Body>
    </Card>
  );
};
