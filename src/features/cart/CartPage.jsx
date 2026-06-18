import React from "react";
import { Link} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  removeItem,
  clearCart,
  incrementProduct,
  decrementProduct,
} from "./reducer/CartReducer";

import {
  faTrash,
  faMinus,
  faPlus,
 
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import CurrencyDisplay from "../settings/component/Currency";
import { Container, Row, Col, Card, Image } from "react-bootstrap";
import "../../styles/Custom.css";
import { IMAGE_BASEURL } from "../../data/Constants";
import defaultImge from "../../assets/images/images.png"

function CartPage() {
  const dispatch = useDispatch();
  // const navigate = useNavigate();
  const cartItems = useSelector((state) => state.cart.viewCart);

  // useEffect(() => {
  //   const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
  //   dispatch(loadCartFromLocalStorage(savedCart));
  // }, [dispatch]);

  const RemoveCart = (itemId) => {
    dispatch(removeItem(itemId));
  };

  const RemoveAllCart = () => {
    dispatch(clearCart());
  };

  // const calculateSubtotal = (item) => {
  //   return item.quantity * item.price;
  // };

  const handleIncrement = (itemId, item) => {
    const qty = item.quantity + 1;
    dispatch(incrementProduct({ _id: itemId, quantity: qty }));
  };

  const handleDecrement = (itemId, item) => {
    if (item.quantity > 1) {
      const qty = item.quantity - 1;
      dispatch(decrementProduct({ _id: itemId, quantity: qty }));
    } else if (item.quantity === 1) {
      //const qty = item.quantity - 1;
      dispatch(removeItem(itemId));
    }
  };

  const calculateTotalPrice = () => {
    console.log(cartItems);
    const total = cartItems.reduce((total, item) => total + parseFloat(item.subtotal), 0);
    console.log(total);
    const tot = parseFloat(total).toFixed(2);
    // dispatch(totalProducts(tot));
    return tot;
  };
  const isValidImageFormat = (filename) => {
    const validExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.bmp', '.tiff'];
    return validExtensions.some(ext => filename.toLowerCase().endsWith(ext));
  };

  return (
    <Container className=" bg-white border border-light assistant-font ">
      <Row className="mt-3 ">
        <Col>
          <h2 className="fw-bold m-2" >Shopping Cart</h2>
        </Col>
        <Col>
          <button
            className="cols btn btn-secondary m-2 float-end"
            onClick={() => RemoveAllCart()}
          >
            <span className="text-right ">
              Delete All <i className="fas fa-trash"></i>
            </span>
          </button>
        </Col>
      </Row>

      {cartItems.length > 0 ? (
        cartItems.map((item) => (
          <Card className="card p-1 border border-white g-0   " key={item._id}>
            <Card className="card g-0">
              <Row className="row pt-2 pb-2 ps-2 g-0 w-100" >
                <Col xs={8} sm={8} md={8} lg={6} xl={6}className="d-grid gap-2 d-md-flex justify-content-md-start">
                  <Row className="w-100">
                    <Col className=" text-left col-6 ">
                    {item.image !==null && isValidImageFormat(item.image)?
                      <Image
                        src={IMAGE_BASEURL+item.image}
                      
                        width={100}
                        height={80}
                        className=" p-1 border-light rounded-border "
                      />: <Image
                      src={defaultImge}
                    
                      width={100}
                      height={80}
                      className=" p-1 border-light rounded-border "
                    />
                    }
                    </Col>

                    <Col className="col-6  p-1 text-lg-left text-start">
                      {item.has_extra_option === true ? (
                        <Container>
                          <h4 className=" fs-6 fw-bold  ">
                            {item.productname}
                          </h4>
                          <h4 className=" fs-6 text-secondary  ">
                            {item.name}
                          </h4>
                        </Container>
                      ) : (
                        <h4 className=" fs-6 p-2 fw-bold  ">{item.name}</h4>
                      )}
                      <Container>
                        <div
                          className=" btn fs-6 fw-bold text-danger p-0 m-0 graybg "
                          style={{ display: "inline-flex", alignItems: "left" }}
                        >
                          <div className="assistant-font  icon-wrapper-cart ">
                            <FontAwesomeIcon
                              size="sm"
                              icon={faMinus}
                              className="custom-icon-cart "
                              onClick={() => handleDecrement(item._id, item)}
                            />
                          </div>

                          <div className=" text-dark  assistant-font quanitybg">
                            {item.quantity}
                          </div>
                          <div className="assistant-font  icon-wrapper-cart text-danger ">
                            <FontAwesomeIcon
                              size="sm"
                              icon={faPlus}
                              className="custom-icon-cart"
                              onClick={() => handleIncrement(item._id, item)}
                            />
                          </div>
                        </div>
                      </Container>
                    </Col>
                  </Row>
                </Col>
                <Col  xs={4} sm={4} md={4} lg={6} xl={6} >
                  <Container className="pt-1">
                    <Row className="row">
                      <Col className="col-12 text-end">
                        <Row className="row row-cols-1 row-cols-md-3">
                          <Container>
                            <h5 className="card-title fs-6 text-danger fw-bold">
                              <CurrencyDisplay
                                amount={item.subtotal}
                                largeFont={true}
                              />
                            </h5>
                          </Container>
                          <Container className="text-right">
                            <div
                              className=" m-2 float-end"
                              onClick={() => RemoveCart(item._id)}
                            >
                              <span className="text-right text-danger">
                                <FontAwesomeIcon icon={faTrash} />
                              </span>
                            </div>
                          </Container>
                        </Row>
                      </Col>
                    </Row>
                  </Container>
                </Col>
              </Row>
            </Card>
          </Card>
        ))
      ) : (
        <div>Cart is Empty</div>
      )}

      <Container className=" pt-4 mt-4">
        <Row>
          <Col className="text-left">
            <h4 className=" fs-6 fw-bold  ">Estimated Total</h4>
          </Col>
          <Col>
            <Container className="text-end">
              <h5 className="card-title fs-6 text-danger fw-bold ">
                <CurrencyDisplay
                  amount={calculateTotalPrice()}
                  largeFont={true}
                />
              </h5>
              {cartItems.length > 0 ?
              <Link to="/ordersummary">
                <button className="btn btn-danger">Checkout</button>
              </Link>
              :
              <Link to="/">
              <button className="btn btn-danger">Checkout</button>
            </Link>
              }
            </Container>
          </Col>
        </Row>
      </Container>
      <Container className="mt-4 p-5  "></Container>
    </Container>
  );
}

export default CartPage;
