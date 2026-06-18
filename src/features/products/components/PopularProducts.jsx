import { React, useState,useEffect } from "react";
import { Card, Row, Col, Button, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMinus,
  faPlus,
 
} from "@fortawesome/free-solid-svg-icons";
import {
  addCartProducts,
  decrementProduct,
  incrementProduct,
  removeItem
} from "../../cart/reducer/CartReducer";
import { useDispatch, useSelector } from "react-redux";
import Badge from "react-bootstrap/Badge";
import CurrencyDisplay from "../../settings/component/Currency";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "../../../styles/Custom.css";
import defaultImg from "../../../assets/images/defaultimage.jpg"
import { fetchPopularProducts } from "../../thunks/Thunks";

function PopularProducts() {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.product.popular);
  const viewCart = useSelector((state) => state.cart.viewCart);
  const [hovered, setHovered] = useState({});
  useEffect(() => {
    dispatch(fetchPopularProducts());

  }, [dispatch]);
  //_id of listed product,
  //productid another key is kept so that when options are there we need to send options_name and
  const addtoCart = (product) => {
    const newProduct = {
      _id: product.id,
      productid: product.id,
      name: product.name,
      category: product.category,
      price: product.price,
      description: product.description,
      quantity: 1,
      subtotal: 1 * product.price,
      image: product.image,
      has_extra_option: product.has_extra_option,
      options: product.options,
    };
    dispatch(addCartProducts([newProduct]));
  };

  const getCartQuantity = (productId) => {
    const item = viewCart.find((item) => item._id === productId);
    return item ? item.quantity : 0;
  };

  const handleIncrement = (productId, product) => {
    const item = viewCart.find((item) => item._id === productId);
    const qty = item ? item.quantity : 0;
    dispatch(incrementProduct({ _id: productId, quantity: qty + 1 }));
  };

  const handleDecrement = (productId, product) => {
    const item = viewCart.find((item) => item._id === productId);
    if (item && item.quantity > 1) {
      const qty = item.quantity - 1;
      dispatch(decrementProduct({ _id: productId, quantity: qty }));
    }
    else if(item.quantity===1)
      {  
        // const qty = item.quantity - 1;
        dispatch(removeItem(productId));

      }
  
  };
  const handleMouseEnter = (id) => {
    setHovered((prevHovered) => ({ ...prevHovered, [id]: true }));
  };

  const handleMouseLeave = (id) => {
    setHovered((prevHovered) => ({ ...prevHovered, [id]: false }));
  };

  return (
    <div className="container-fluid  g-0 ">
       <h2 className="fw-bold m-2 ps-2" >Popular Items</h2>
      <div className="row g-0">
        {products.map((product) => (
          <div className="col-md-3 col-6 p-2    " key={product.id}>
            <Card className="shadow-sm text-left rounded-border-product   ">
              <Link to={`/productdetail/${product.id}`}>
                <LazyLoadImage
                  src={product.image}
                  alt={defaultImg}
                  className="img-fluid mx-auto p-2 border-white  "
                />
              </Link>

              <Card.Body className="m-0 p-0">
                <Row className="ps-3">
                  <Col>
                    <p className="assistant-font fw-bold fs-6  m-0 ">
                      {product.name}
                    </p>
                    <CurrencyDisplay amount={product.price} />
                  </Col>
                </Row>

                <Row className="justify-content-end">
                  <Col xs="auto  " className="">
                    {getCartQuantity(product.id) === 0 ? (
                      product.has_extra_option === true ? (
                        <Col xs="col-8 ps-3  ">
                          <div>
                            <Link
                              to={`/productdetail/${product.id}`}
                              className="text-decoration-none"
                            >
                              <Button variant="btn btn-outline-danger fs-6 fw-bold m-2 ">
                                View
                              </Button>
                            </Link>
                          </div>
                        </Col>
                      ) : (
                        <Col xs="col-8 ps-3">
                          <div className="" onClick={() => addtoCart(product)}>
                            {/* <FontAwesomeIcon icon={faCartPlus} /> */}
                            <Button variant="btn btn-outline-danger fs-6  fw-bold m-2">
                              Add
                            </Button>
                          </div>
                        </Col>
                      )
                    ) : (
                      <Col xs="auto  ">
                        <div
                          className="m-2 btn btn-outline-danger fs-6 fw-bold text-danger"
                          style={{ display: "flex", alignItems: "center" ,
                          }}
                        >
                          <div className="assistant-font">
                            <FontAwesomeIcon
                              icon={faMinus}
                              onMouseEnter={() => handleMouseEnter(product.id)}
                              onMouseLeave={() => handleMouseLeave(product.id)}
                              style={{
                                color: hovered[product.id] ? "white" : "red",
                                transition: "color 0.3s",
                                cursor: "pointer",
                              }}
                              onClick={() =>
                                handleDecrement(product.id, product)
                              }
                            />
                          </div>
                          <Badge bg="danger" className="mx-2 assistant-font"
                          >
                            {getCartQuantity(product.id)}
                          </Badge>
                          <div className="assistant-font">
                            <FontAwesomeIcon
                              icon={faPlus}
                              onMouseEnter={() => handleMouseEnter(product.id)}
                              onMouseLeave={() => handleMouseLeave(product.id)}
                              style={{
                                color: hovered[product.id] ? "white" : "red",
                                transition: "color 0.3s",
                                cursor: "pointer",
                              }}
                              onClick={() =>
                                handleIncrement(product.id, product)
                              }
                            />
                          </div>
                        </div>
                      </Col>
                    )}
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </div>
        ))}
      </div>
      <Container className="mt-4 p-3 "></Container>
    </div>
  );
}

export default PopularProducts;
