import React from "react";
import { Navbar, Nav, NavDropdown, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signout } from "../../actions/auth.action";
const Header = (props) => {
  const auth = useSelector((state) => state.auth);


  const dispatch = useDispatch();
  const userSignout = (e) =>{
    e.preventDefault();
    console.log("signout")
    dispatch(signout())
  }


  const renderIfNotLoggedIn = () => {
    return (
      <Nav>
        <li className="nav-item" >
          <Link to="/signin" className="nav-link">
            Singin
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/signup" className="nav-link">
            Singup
          </Link>
        </li>
      </Nav>
    );
  };

  const renderIfLoggedIn = () => {
    return (
      <Nav>
        <li className="nav-item">
          <span onClick={userSignout} className="nav-link">
            Singout
          </span>
        </li>
      </Nav>
    );
  };
  console.log(auth.authenticate);

  return (
    <>
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" style={ {zIndex:'1'}}>
        <Container>
          <Link to="/" className="navbar-brand">
            Admin Dashboard
          </Link>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="mr-auto">
              {/* <Nav.Link href="#features">Features</Nav.Link>
            <Nav.Link href="#pricing">Pricing</Nav.Link>
            <NavDropdown title="Dropdown" id="collasible-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Separated link
              </NavDropdown.Item>
            </NavDropdown> */}
            </Nav>
            {auth.authenticate ? renderIfLoggedIn() : renderIfNotLoggedIn()}
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default Header;
