// Footer.js

import { React, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,

  faGrip,
  faUser,
  faShoppingCart,
} from "@fortawesome/free-solid-svg-icons";
import "./Footer.css"; // Import your CSS file for styling
import {Container, Nav } from "react-bootstrap";
import { Badge } from "react-bootstrap";

const Footer = ({ itemCount }) => {
  const [footerVisible, setFooterVisible] = useState(false);

  useEffect(() => {
    // Simulate delay for demonstration purposes
    const timeout = setTimeout(() => {
      setFooterVisible(true);
    }, 500); // Adjust as needed or remove if not needed

    return () => clearTimeout(timeout);
  }, []);
    if (!footerVisible) return null;
  return (
    <footer className="fixed-bottom-navbar p-0 g-0 m-0">
      <Nav className="navbar navbar-light bg-light p-0 g-0 m-0 ">
        <Container fluid className=" d-flex justify-content-around ">
          <ul className="nav">
            <li className="nav-item  ">
              <a className="nav-link " href="/">
                <li>
                  <FontAwesomeIcon
                    icon={faHome}
                    size="lg"
                    style={{ color: "#000" }}
                    className="icon"
                  />
                </li>
                <li>
                  <span className="link-text fs-6 text-black">Home</span>
                </li>
              </a>
            </li>
            <li className="nav-item nav-item-cart ">
              <a className="nav-link" href="/viewcart">
              <li>
                <div className="icon-wrapper-top-cart ">
                  <FontAwesomeIcon
                    icon={faShoppingCart}
                    size="lg"
                    style={{ color: "#000" }}
                     className="icon"
                  />
                  {itemCount > 0 && (
                    <Badge bg="dark" className="badgestyle">
                      {itemCount}
                    </Badge>
                  )}
                </div>
                </li>
                <li>
                <span className="link-text fs-6 text-black"> Cart </span>
                </li>
              </a>
            </li>

            <li className="nav-item  ">
              <a className="nav-link " href="/popular">
                <li>
                  <FontAwesomeIcon
                    icon={faGrip}
                    size="lg"
                    style={{ color: "#000" }}
                    className="icon"
                  />
                </li>
                <li>
                  <span className="link-text fs-6 text-black">Popular</span>
                </li>
              </a>
            </li>
            <li className="nav-item ">
              <a className="nav-link" href="/about">
                <li>
                  <FontAwesomeIcon
                    icon={faUser}
                    size="lg"
                    style={{ color: "#000" }}
                    className="icon"
                  />
                </li>
                <li>
                  <span className="link-text fs-6 text-black me-0 pe-0">
                    Contact
                  </span>
                </li>
              </a>
            </li>
            {/* <li className="nav-item ">
              <a className="nav-link" href="/about">
              <li>
                <FontAwesomeIcon icon={faUser} size='lg' style={{color: "#000",}}/>
                </li>
                <li>
                <span className="link-text fs-6 text-black me-0 pe-0">About</span>
                </li>
              </a>
            </li> */}
          </ul>
        </Container>
      </Nav>
    </footer>
  );
};

export default Footer;
