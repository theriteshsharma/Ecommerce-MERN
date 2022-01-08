import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Card,
  Button,
  Row,
  Col,
  Table,
  Container,
  Badge,
} from "react-bootstrap";
import { imageUrl } from "../../urlconfig";
import { addtoorder, getOrderItems } from "../../actions/";
import Layout from "../../components/Layout";
import Modal from "../../components/UI/Modal";
import Input from "../../components/UI/Input";


function Cart() {
  const dispatch = useDispatch();
  const orderItems = useSelector((state) => state.orders);
  useEffect(() => {
    dispatch(getOrderItems());
  }, []);
  

  const renderProduct = () => {
    var list = [];
    for (var key of orderItems.orderItems) {
      list.push(
        <Card key={key.product._id} style={{ width: "100%", textAlign: "left" }}>
          <Row>
            <Col md={2}>
              <img
                src={imageUrl(key.product.productPictures[0].img)}
                className="mx-auto my-auto"
                style={{ maxWidth: "100%", padding: "1rem" }}
              />
            </Col>
            <Col md={10}>
              <Card.Body>
                <Card.Title style={{fontWeight:"100"}}>{key.product.name}</Card.Title>
                <div className="d-flex justify-content-between align-items-center">
                  <h5>{key.product.price}</h5>
                  <Badge pill variant="danger">{key.status}</Badge>
                  
                </div>
              </Card.Body>
            </Col>
          </Row>
        </Card>
      );
    }
    return list;
  };

  return (
    <Layout>
      <Container>
        <Row className="p-5">
          <h1>YOUR ORDERS</h1>
        </Row>
        <Row>
          <Col md={8}>{renderProduct()}</Col>
         </Row>
      </Container>
    </Layout>
  );
}

export default Cart;
