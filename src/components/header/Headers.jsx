import React from "react";
import  {Container,Col}  from "react-bootstrap";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Offcanvas from "react-bootstrap/Offcanvas";
import Badge from "react-bootstrap/Badge";
import { useSelector } from "react-redux";
import "../../styles/Custom.css";
import { ReactComponent as Logo } from "../../assets/images/svgelixir.svg";

function Headers() {
  const cartItemCount = useSelector((state) => state.cart.count);

  return (
    <div className="sticky-top">
      <Navbar expand={"lg"} className="bg-body-tertiary">
        <Container fluid>
          {/* <Navbar.Brand href="#" className=' ms-3  fs-2'>  <Nav.Link href="/"><span className='fw-bold fs-2' >Elixir</span>  <span className='fw-bold fs-2 '>OFO</span></Nav.Link></Navbar.Brand> */}
          <Navbar.Brand href="#">
            <Nav.Link href="/">
              {/* <Col>
                <img
                  src={mainlogo} // Replace with your logo path
                  width="64"
                  height="64"
                  className="d-inline-block align-top"
                  alt="Logo"
                />
              </Col> */}
              <Col className="g-0 ps-2 m-0">
                <Logo
                 // Replace with your logo path
                 width="130"
                  height="46"
                  className="d-inline-block align-top"
                  alt="Logo"
                />
                </Col>
             
            
            </Nav.Link>
          </Navbar.Brand>

          <Navbar.Toggle aria-controls="offcanvasNavbar" />
          <Navbar.Offcanvas
            id="offcanvasNavbar"
            aria-labelledby="offcanvasNavbarLabel"
            placement="start"
          >
            <Offcanvas.Header closeButton>
              <Offcanvas.Title id="offcanvasNavbarLabel">
                ElixirOFO
              </Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <Nav className="justify-content-end flex-grow-1 pe-3">
                <Nav.Link href="/">Home</Nav.Link>
                <Nav.Link href="/popular">Popular</Nav.Link>
                <Nav.Link href="/viewcart">
                  Cart <Badge bg="danger">{cartItemCount}</Badge>
                </Nav.Link>
                {/* <Nav.Link href="#action2">Categories</Nav.Link> */}
                <Nav.Link href="/about">About Us</Nav.Link>
                {/* <Nav.Link href="/contact">Contact Us</Nav.Link> */}
              </Nav>
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
      </Navbar>
    </div>
  );
}

export default Headers;
