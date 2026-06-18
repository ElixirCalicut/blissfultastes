import React, { useState, useRef } from "react";
import { Container, Form, Button, Row, Col, Image } from "react-bootstrap";
import img from "../assets/images/Illustration.png";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { postData } from "../features/thunks/Thunks";
import "../styles/Custom.css";
import { clearCart } from "../features/cart/reducer/CartReducer";
import Loader from "../components/loader/Loader";
import PlacesAutoComplete from "../features/map/component/PlacesAutoComplete";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function UserDetail() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });
  const [errors, setErrors] = useState({});
  const [validated, setValidated] = useState(false);
  const [paymentOption, setPaymentOption] = useState("card");

  const cartItems = useSelector((state) => state.cart.viewCart);
  const status = useSelector((state) => state.settings.status);
  const total = useSelector((state) => state.cart.totalPrice);
  const [address, setAddress] = useState(null);
  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const phoneRef = useRef(null);
  const addressRef = useRef(null);

  if (total == "0") {
    navigate("/viewcart");
  }

  const handleAddressSelect = (selectedAddress) => {
    setAddress(selectedAddress);
    console.log(selectedAddress);
  };

  const dispatch = useDispatch();

  const addDetail = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({
      ...errors,
      [name]: "",
    });
  };

  const validateForm = () => {
    let err = false;
    const phoneRegex = /^\d{10}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    let newErrors = {};

    if (!formData.name.trim()) {
      err = true;
      newErrors.name = "Name is required.";
      nameRef.current.focus();
    }

    if (!formData.address.trim()) {
      err = true;
      newErrors.address = "Address is required.";
      addressRef.current.focus();
    }

    if (!phoneRegex.test(formData.phone)) {
      err = true;
      newErrors.phone = "Invalid phone number";
      phoneRef.current.focus();
    }

    if (!emailRegex.test(formData.email)) {
      err = true;
      newErrors.email = "Invalid email";
      emailRef.current.focus();
    }

    setErrors(newErrors);
    return err;
  };

  const onSubmitDetails = (e) => {
    e.preventDefault();
    try {
      const hasErrors = validateForm();
      if (!hasErrors) {
        if (address) {
          setValidated(true);
          sendCartData(cartItems, formData, total);
        } else {
          toast.error('Please select location', {
            position: "bottom-center",
            autoClose: 5000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",

            });
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const clear = () => {
    dispatch(clearCart());
  };

  const handleSelect = (e) => {
    console.log(e.target.value);
    setPaymentOption(e.target.value);
  };

  const sendCartData = (cartItems, formData, total) => {
    console.log(paymentOption);
    const dataToSend = cartItems.map((item) => ({
      product:item.productid,
      option_name: item.name,
      quantity: item.quantity,
      itemCode:item.itemCode,
      unit_price: item.price,
      total_price: parseFloat(item.subtotal),
    }));
    const tot = parseFloat(total);
    const payload = {
      order: {
        total_amount: tot,
        order_items: dataToSend,
        payment_method: paymentOption,
      },
      customer: formData,
      location: address ? address : "",
    };
    console.log(payload);
    const response = dispatch(postData(payload));

    if (response) {
      console.log(response);
      clear();
      if (status === "loading")
        return (
          <Container className="text-center">
            <Loader loading={status} color="#36d7b7" />{" "}
          </Container>
        );
      if (status == "failed")
        return (
          <Container className="text-center">
            <Loader loading={status} color="#FF0000" /> Error: {status.error}
          </Container>
        );
      navigate("/ordercompleted");
    }
  };

  return (
    <Container>
      <Row className="align-items-center p-3">
        <Col xs={12} md={9}>
          <Form.Label className="oleo-script-swash-caps-regular fs-2 m-2">
            Add Detail
          </Form.Label>

          <Form noValidate onSubmit={onSubmitDetails}>
            <Form.Group className="mb-3 w-90" controlId="fullName">
              <Form.Label>Full Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                style={{ border: "1px solid #000" }}
                onChange={addDetail}
                placeholder="Full Name"
                isInvalid={!!errors.name}
                ref={nameRef}
              />
              <Form.Control.Feedback type="invalid">
                {errors.name}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" controlId="emailAddress">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                style={{ border: "1px solid #000" }}
                placeholder="Enter email"
                name="email"
                onChange={addDetail}
                isInvalid={!!errors.email}
                ref={emailRef}
              />
              <Form.Control.Feedback type="invalid">
                {errors.email}
              </Form.Control.Feedback>
              <Form.Text className="text-muted">
                We'll never share your email with anyone else.
              </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="phoneNumber">
              <Form.Label>Mobile Number</Form.Label>
              <Form.Control
                type="text"
                style={{ border: "1px solid #000" }}
                placeholder="Enter mobile"
                name="phone"
                onChange={addDetail}
                isInvalid={!!errors.phone}
                ref={phoneRef}
              />
              <Form.Control.Feedback type="invalid">
                {errors.phone}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3 w-90" controlId="address">
              <Form.Label>Address</Form.Label>
              <Form.Control
                type="text"
                name="address"
                style={{ border: "1px solid #000" }}
                onChange={addDetail}
                placeholder="Address"
                isInvalid={!!errors.address}
                ref={addressRef}
              />
              <Form.Control.Feedback type="invalid">
                {errors.address}
              </Form.Control.Feedback>
            </Form.Group>
            <ToastContainer
              position="bottom-center"
              autoClose={5000}
              hideProgressBar
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="dark"
            />
            <Form.Group>
              
                <PlacesAutoComplete onAddressSelect={handleAddressSelect} />
          
            </Form.Group>

            <Form.Group>
            <Form.Label className="text-red">PAYMENT</Form.Label>
             
              <Row className="p-3 mb-4">
                <Col>
                  <Form.Check
                    type="radio"
                    id="card"
                    name="radioGroup"
                    defaultChecked={paymentOption === "card"}
                    value="card"
                    label="Card on Delivery"
                    onChange={handleSelect}
                  />
                </Col>
                <Col>
                  <Form.Check
                    type="radio"
                    id="cash"
                    name="radioGroup"
                    value="cash"
                    defaultChecked={paymentOption === "cash"}
                    label="Cash on Delivery"
                    onChange={handleSelect}
                  />
                </Col>
              </Row>
            </Form.Group>

            <Button variant="danger" type="submit" className="btn-custom-red">
              Place Order
            </Button>
          </Form>
        </Col>
      </Row>
      <Container className="mt-4 p-3 ">
      </Container>
    </Container>
  );
}

export default UserDetail;