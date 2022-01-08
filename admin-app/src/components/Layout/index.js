import React from "react";
import Header from "../Header";
import { Col, Container, Row } from "react-bootstrap";
import { NavLink } from "react-router-dom";

import "./style.css";
export default function Layout(props) {
  return (
    <>
      <Header></Header>
      <Container fluid>
        {props.sidebar ? (
          <Row>
            <Col md={2} className="sidebar">
              <ul>
                <li>
                  <NavLink to={'/'}>Home</NavLink>
                </li>
                <li>
                  <NavLink to={'/product'}>Product</NavLink>
                </li>
                <li>
                  <NavLink to={"/orders"}>Orders</NavLink>
                </li>
                <li>
                  <NavLink to={"/category"}>category</NavLink>
                </li>
              </ul>
            </Col>
            <Col md={10} style={{ marginLeft: "auto" }}>
              {" "}
              {props.children}{" "}
            </Col>
          </Row>
        ) : (
          props.children
        )}
      </Container>
    </>
  );
}
