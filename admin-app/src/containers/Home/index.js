import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Card,
  Button,
  Row,
  Col,
  Table,
} from "react-bootstrap";
import { imageUrl } from "../../urlconfig";
import { addtoorder, getOrderItems } from "../../actions/";
import Layout from "../../components/Layout";



function Home() {
  const dispatch = useDispatch();
  const orderItems = useSelector((state) => state.orders);
  useEffect(() => {
    dispatch(getOrderItems());
  }, []);
  


  const renderProduct = () => {
    var list = [];
    for (var key of orderItems.orderItems) {
      console.log(key);
      list.push(
        // <Card style={{ width: "50%", textAlign: "left" }}>
        //   <Row>
        //     <Col md={2}>
        //       <img
        //         src={imageUrl(key.product.productPictures[0].img)}
        //         className="mx-auto"
        //         style={{ height: "200px", padding: "1rem" }}
        //       />
        //     </Col>
        //     <Col md={10}>
        //       <Card.Body>
        //         <Card.Title>{key.product.name}</Card.Title>
        //         <h5>{key.product.price}</h5>
        //         <p>{key.quantity}</p>
        //         <p>{key.status}</p>
        //       </Card.Body>
        //     </Col>
        //   </Row>
        // </Card>
        <tr>
          <td>
          <img
                src={imageUrl(key.product.productPictures[0].img)}
                className="mx-auto"
                style={{ height: "100px", padding: "1rem" }}
              />
          </td>
          <td>{key.product.name}</td>
          <td>{key.product.price}</td>
          <td>{key.quantity}</td>
          <td>{key.price}</td>
          <td>{key.pincode}{key.address}</td>
          <td>{key.status}</td>

        </tr>


      );
    }
    return list;
  };

  return (
    <Layout sidebar>
     <Table striped bordered hover size="sm">
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Price</th>
            <th>Qunatity</th>
            <th>Total Price</th>
            <th>Address</th>
            <th>Status</th>


          </tr>
        </thead>
        <tbody> 
            {renderProduct()}
        </tbody>
      </Table>
     

    </Layout>
  );
}

export default Home;
