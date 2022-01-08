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
        {
          props.children
        }
      </Container>
    </>
  );
}
