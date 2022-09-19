import axios from "axios";
import React, { useEffect, useReducer } from "react";
// import {useState} from 'react';
// import { data } from "../data"
import logger from "use-reducer-logger";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Product } from "../components/Product";

const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true };
    case "FETCH_SUCCESS":
      return { ...state, loading: false, products: action.payload };
    case "FETCH_FAILURE":
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};
export const HomeScreen = () => {
  // const [products,setProducts] = useState([])
  const [{ loading, error, products }, dispatch] = useReducer(logger(reducer), {
    loading: true,
    error: "",
    products: [],
  });
  useEffect(() => {
    const fetchProducts = async () => {
      console.log("Hiii");
      dispatch({ type: "FETCH_REQUEST" });
      try {
        const result = await axios.get("/api/products");
        dispatch({ type: "FETCH_SUCCESS", payload: result.data });
      } catch (err) {
        dispatch({ type: "FETCH_FAILURE", payload: err.message });
      }
      // setProducts(result.data);
    };
    fetchProducts();
  }, []);
  return (
    <>
      <h2 className="text-center mt-2 mb-3">Featured Products</h2>
      <div className="products">
        {loading ? (
          <div>Loading...</div>
        ) : error ? (
          <div>{error}</div>
        ) : (
            <Row>
                {
                 products.map((product) => (
                    <Col key={product.slug} sm={6} md={4} lg={3} className="mb-3">
                     <Product product={product}/>
                    </Col>
                  ))
                }
          
          </Row>
        )}
      </div>
    </>
  );
};
