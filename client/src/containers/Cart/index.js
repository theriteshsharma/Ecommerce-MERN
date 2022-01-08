import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Card,
  Button,
  Row,
  Col,
  Container,
  Table,
  Badge,
} from "react-bootstrap";

import {} from "react-icons";
import { imageUrl } from "../../urlconfig";
import { addtocart, getCartItems } from "../../actions/";
import { addtoorder, getOrderItems } from "../../actions/";

import Layout from "../../components/Layout";
import Modal from "../../components/UI/Modal";
import Input from "../../components/UI/Input";

function Cart() {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart);
  const items = cartItems.cartItems;
  const [pincode, setpincode] = useState("");
  const [address, setaddress] = useState("");
  useEffect(() => {
    dispatch(getCartItems());
  }, []);
  const [show, setshow] = useState(false);
  const handleClose = () => {
    setshow(false);
  };
  const handleBuyNow = () =>{
    var list = [];
    for (var key of cartItems.cartItems) {
      list.push({
        product: key.product._id,
        price: key.product.price * key.quantity,
        quantity: key.quantity,
        pincode: pincode,
        address: address,
      });
    }
    dispatch(addtoorder(list));
    handleClose();
  }
  const displaySubTotal = () => {
    var subtotal = 0;
    for (let key of cartItems.cartItems) {
      subtotal += parseInt(key.price) * parseInt(key.quantity);
    }
    return subtotal;
  };

  const renderBuyProducModal = () => {
    var list = [];
    for (var key of cartItems.cartItems) {
      list.push(
        <tr key={key.product._id}>
          <td>{key.product.name}</td>
          <td>{key.product.price}</td>
          <td>{key.quantity}</td>
        </tr>
      );
    }
    return (
      <Modal show={show} handleClose={handleClose} modalTitle={`Buy Product`} handleSubmit={handleBuyNow}>
        <Row className="p-3">
          <Table striped bordered hover size="sm">
            <thead>
              <tr>
                <th>Name</th>
                <th>Price</th>
                <th>Qunatity</th>
              </tr>
            </thead>
            <tbody>{list}</tbody>
          </Table>
        </Row>
        <Row className="p-4">
          <h5>Address</h5>
          <Col md={12}>
            <Input
              type="text"
              value={pincode}
              placeholder="Pin Code"
              onChange={(e) => {
                setpincode(e.target.value);
              }}
            />
          </Col>
          <Col md={12}>
            <Input
              type="text"
              value={address}
              placeholder="Address"
              onChange={(e) => {
                setaddress(e.target.value);
              }}
            />
          </Col>
        </Row>
        <input type="radio" checked></input>
        <lable>Cash On Delivery</lable>
      </Modal>
    );
  };

  const renderProduct = () => {
    var list = [];
    for (var key of cartItems.cartItems) {
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
                <div className="d-flex justify-content-between algin-items-center">
                  <h5>{key.product.price}</h5>
                  <div>
                    <p>
                      <Badge variant="primary" className="d-inline ">
                        +
                      </Badge>
                      {key.quantity}
                      <Badge variant="primary" className="d-inline ">
                        -
                      </Badge>
                    </p>
                  </div>
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
          <h1>CART ITEMS</h1>
        </Row>
        <Row>
          <Col md={8}>{renderProduct()}</Col>
          <Col md={4}>
            <Card>
              <Card.Header>Subtotal</Card.Header>
              <Card.Body>
                <Card.Title> Rs. {displaySubTotal()}</Card.Title>
              </Card.Body>
              <Card.Footer><Button variant="primary" size="lg" block
              onClick={() => {
                setshow(true);
              }}
            >
              Buy Now
            </Button></Card.Footer>
            </Card>

            
          </Col>
        </Row>

        {renderBuyProducModal()}
      </Container>
    </Layout>
  );
}

export default Cart;
