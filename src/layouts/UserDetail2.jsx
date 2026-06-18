import React, { useState, useRef } from "react";
import {
  Container,
  Form,
  Button,
  Row,
  Col,
  InputGroup,
  Tab,
  Nav,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { postData } from "../features/thunks/Thunks";
import "../styles/Custom.css";
import { clearCart } from "../features/cart/reducer/CartReducer";
import Loader from "../components/loader/Loader";
import PlacesAutoComplete from "../features/map/component/PlacesAutoComplete";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import getDeviceId from "../app/utils/utils";
import { useParams } from "react-router-dom";
function UserDetail2() {
  const navigate = useNavigate();
  const { option, cookingData,delivery_cost } = useParams(); // const [formData, setFormData] = useState({

  // const location = useLocation();
  // const cookingData = location.state?.cookingData; // Accessing the cooking data
  const cookingInstruction =JSON.parse(decodeURIComponent(cookingData)) ;

  console.log("data..",cookingInstruction);

  const [activeKey, setActiveKey] = useState(option);
// eslint-disable-next-line no-unused-vars
  const [validated, setValidated] = useState(false);
  const [paymentOption, setPaymentOption] = useState("card");
  // const [errors, setErrors] = useState({});
  const cartItems = useSelector((state) => state.cart.viewCart);

  const status = useSelector((state) => state.settings.status);
  const total = useSelector((state) => state.cart.totalPrice);

  const [address, setAddress] = useState(null);
  const nameRef = useRef(null);
  const phoneRef = useRef(null);
  const addressRef = useRef(null);
  const nameTakRef = useRef(null);
  const carTakref = useRef(null);
  const phoneTakRef = useRef(null);
  const tabDinRef = useRef(null);
  const nameDinRef = useRef(null);
  const phoneDinRef = useRef(null);
  // const [deliveryLat, setDeliveryLat] = useState(null);
  // const [deliveryLon, setDeliveryLon] = useState(null);
  // const [distance, setDistance] = useState(0);
  // eslint-disable-next-line no-unused-vars
   const [deliveryCharge, setDeliveryCharge] = useState(0);
  //static array with table locations
  const tableLocations = [
    { number: 1, location: "Floating Boat" },
    { number: 2, location: "Adventure Reception" },

  ];
  


  const [dineinData, setdineinData] = useState({
    name: "",
    phone: "",
    tablenumber: "",
  });
  const [dineinErrors, setdineinErrors] = useState({});

  const [takeawayData, setTakeawayData] = useState({
    carNumber: "",
    name: "",
    phone: "",
  });
  const [takeawayErrors, setTakeAwayErrors] = useState({});

  const [deliveryData, setDeliveryData] = useState({
    name: "",
    phone: "",
    address: "",
  });
  const [deliveryErrors, setDeliveryErrors] = useState({});

  // Handle changes for dinein form
  const handledineinChange = (e) => {
    setdineinData({
      ...dineinData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle changes for Takeaway form
  const handleTakeawayChange = (e) => {
    setTakeawayData({
      ...takeawayData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle changes for Delivery form
  const handleDeliveryChange = (e) => {
    setDeliveryData({
      ...deliveryData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle submit for dinein form
  const handledineinSubmit = (e) => {
    e.preventDefault();
    console.log("dinein Data:", dineinData);
    onSubmitDetails(e, dineinData, "dinein", dineinErrors);
  };

  // Handle submit for Takeaway form
  const handleTakeawaySubmit = (e) => {
    e.preventDefault();
    console.log("Takeaway Data:", takeawayData);
    onSubmitDetails(e, takeawayData, "takeaway", takeawayErrors);
  };

  // Handle submit for Delivery form
  const handleDeliverySubmit = (e) => {
    e.preventDefault();
    console.log("Delivery Data:", deliveryData);
    onSubmitDetails(e, deliveryData, "delivery", deliveryErrors);
  };

  if (total === "0") {
    navigate("/viewcart");
  }

  const handleAddressSelect = (selectedAddress, deliveryCharge,distance) => {
    console.log(selectedAddress);
    // console.log(deliveryCharge);
     setAddress(selectedAddress);
    // setDistance(distance.toFixed(2));

    // setDeliveryCharge(deliveryCharge);
  };

  const dispatch = useDispatch();

  // const addDetail = (e) => {
  //   const { name, value } = e.target;
  //   setFormData({ ...formData, [name]: value });
  //   setErrors({
  //     ...errors,
  //     [name]: "",
  //   });
  // };

  const validateForm = (formData, type, error) => {
    let err = false;
    // const phoneRegex = /^\d{10}$/;
    const phoneRegex = /^\d{9}$/;
    //const phoneRegex = /^(7|9)\d{7}$/;
    // const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    let dineinErrors = {};
    let takeawayErrors = {};
    let deliveryErrors = {};
    switch (type) {
      case "dinein":
        
          if (!formData.name.trim()) {
            err = true;
            dineinErrors.name = "Name is required.";
            nameDinRef.current.focus();
          }
          if (!formData.tablenumber) {
            err = true;
            dineinErrors.tablenumber = "Table Location is required.";
            tabDinRef.current.focus();
          }

          if (!phoneRegex.test(formData.phone)) {
            err = true;
            dineinErrors.phone =
              "Number should with 9 digits";
            phoneDinRef.current.focus();
          }
        
        break;
      case "takeaway":
        
          if (!formData.carNumber) {
            err = true;
            takeawayErrors.carNumber = "Car Number is required.";
            carTakref.current.focus();
          }
          if (!formData.name.trim()) {
            err = true;
            takeawayErrors.name = "Name is required.";
            nameTakRef.current.focus();
          }

          if (!phoneRegex.test(formData.phone)) {
            err = true;
            takeawayErrors.phone =
              "Number should with 9 digits";
            phoneTakRef.current.focus();
          }
        
        break;
      case "delivery": 
        if (!formData.name.trim()) {
          err = true;
          deliveryErrors.name = "Name is required.";
          nameRef.current.focus();
        }

        if (!phoneRegex.test(formData.phone)) {
          err = true;
          deliveryErrors.phone =
            "Number should with 9 digits";
          phoneRef.current.focus();
        
       
    
      }
       break;
      default:
    break;
    }
    setTakeAwayErrors(takeawayErrors);
    setdineinErrors(dineinErrors);
    setDeliveryErrors(deliveryErrors);
    return err;
  };
  //on submit details check validation
  const onSubmitDetails = (e, data, type, error) => {
    const deviceId = getDeviceId();
    // const totalAfterDelivery= calculateGrandTotal();
    // console.log(totalAfterDelivery)
    e.preventDefault();
    try {
      const hasErrors = validateForm(data, type, error);
      if (!hasErrors) {
        if (type === "delivery") {
          if (address) {
            setValidated(true);
            sendCartData(cartItems, data, total, type, deviceId);
          } else {
            toast.error("Please select location", {
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
        } else {
          setValidated(true);
          sendCartData(cartItems, data, total, type, deviceId);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
  //clear the cart
  const clear = () => {
    dispatch(clearCart());
    //localStorage.setItem('device_id', "");
  };
  //selcting payment option
  const handleSelect = (e) => {
    console.log(e.target.value);
    setPaymentOption(e.target.value);
  };
  // const calculateGrandTotal = () => {
  //   var grandtotal;
  //   if (option === "delivery") {
  //     grandtotal = parseFloat(
  //       parseFloat(total) +
  //       parseFloat (deliveryCharge)
  //         // parseFloat(settingdetails.delivery_cost)
  //     ).toFixed(3);
  //   } else {
  //     // grandtotal = parseFloat(
  //     //   parseFloat(calculateTotalPrice() - calculateVATPercent()) +
  //     //     parseFloat(calculateVATPercent())
  //     // ).toFixed(3);
  //   }

  //   // setTotalAfterDelivery(grandtotal)
  //   // dispatch(grandTotal(grandtotal));
  //   return grandtotal;
  // };

  //send data to backend format
  const sendCartData = (cartItems, data, total, ordertype, deviceId) => {
    console.log(cookingInstruction.cookingInstructionEN);
   console.log("cartItems: " + JSON.stringify(cartItems));
    const dataToSend = cartItems.map((item) => ({
      product: item.productid,
      name:item.has_extra_option?item.productname:item.name,
      itemCode:item.itemCode,
      option_name: item.has_extra_option?item.name:'',
      quantity: item.quantity,
      unit_price: item.price,
      total_price: parseFloat(item.subtotal).toFixed(3),
      is_hot_or_cold:item.selectedIsHotCold
    }));
    // const tot = parseFloat(totalAfterDelivery);
    const payload = {
      order: {
        ordertype: option,
        total_amount: total,
        order_items: dataToSend,
        payment_method: paymentOption,
        cookingInstructionEN: cookingInstruction.cookingInstructionEN,
        cookingInstructionAR: cookingInstruction.cookingInstructionAR,
      },
      customer: data,
      deviceId: deviceId,
      location: address ? address : "",
      deliveryCharge: delivery_cost ? delivery_cost : "",
    };
    console.log("payload" + JSON.stringify(payload));
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
      if (status === "failed")
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
      <Col xs={12} md={9}>
        <h2 className="fs-2  fw-bold m-2">Add Detail</h2>
      </Col>
      <Tab.Container
        activeKey={activeKey}
        onSelect={(k) => setActiveKey(option)}
      >
        <Nav fill variant="pills" className="d-none">
          <Nav.Item>
            <Nav.Link eventKey="dinein">Dine in</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="takeaway">TakeAway</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="delivery">Delivery</Nav.Link>
          </Nav.Item>
        </Nav>
        <Tab.Content>
          <Tab.Pane eventKey="dinein">
            <Container>
              <Row className="align-items-center p-3">
                <Col xs={12} md={9}>
                  <Form noValidate onSubmit={handledineinSubmit}>
                  <Form.Group className="mb-3 w-90" controlId="tablenumber">
                      <Form.Label>Table Location</Form.Label>
                      <Form.Control
                        as="select"
                        name="tablenumber"
                        style={{ border: "1px solid #000" }}
                        onChange={handledineinChange}
                        isInvalid={!!dineinErrors.tablenumber}
                        ref={tabDinRef}
                      >
                        {/* Example static options for table numbers */}
                        <option value="">Select Table Location</option>
                        {tableLocations.map((table) => (
                          <option key={table.number} value={table.location}>
                            {` ${table.location}`}
                          </option>
                        ))}
                      
                        {/* You can also map over an array of tables if you need dynamic options */}
                      </Form.Control>
                      <Form.Control.Feedback type="invalid">
                        {dineinErrors.tablenumber}
                      </Form.Control.Feedback>
                    </Form.Group>
{/* 
                    <Form.Group className="mb-3 w-90" controlId="tablenumber">
                      <Form.Label>Table Number</Form.Label>
                      <Form.Control
                        type="text"
                        name="tablenumber"
                        style={{ border: "1px solid #000" }}
                        onChange={handledineinChange}
                        placeholder="Table Number"
                        isInvalid={!!dineinErrors.tablenumber}
                        ref={tabDinRef}
                      />
                      <Form.Control.Feedback type="invalid">
                        {dineinErrors.tablenumber}
                      </Form.Control.Feedback>
                    </Form.Group> */}
                    <Form.Group className="mb-3 w-90" controlId="fullName">
                      <Form.Label>Name</Form.Label>
                      <Form.Control
                        type="text"
                        name="name"
                        style={{ border: "1px solid #000" }}
                        onChange={handledineinChange}
                        placeholder="Name"
                        isInvalid={!!dineinErrors.name}
                        ref={nameDinRef}
                      />
                      <Form.Control.Feedback type="invalid">
                        {dineinErrors.name}
                      </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="phoneNumber">
                      <Form.Label>Mobile Number</Form.Label>
                      <InputGroup>
                        <InputGroup.Text className="bg-danger  text-white">
                          +971
                        </InputGroup.Text>
                        <Form.Control
                          type="text"
                          style={{ border: "1px solid #000" }}
                          placeholder="Enter mobile"
                          name="phone"
                          onChange={handledineinChange}
                          isInvalid={!!dineinErrors.phone}
                          ref={phoneDinRef}
                        />
                      </InputGroup>
                      <Form.Control.Feedback type="invalid">
                        {dineinErrors.phone}
                      </Form.Control.Feedback>
                      <Form.Text className="text-muted">
                        Number should with 9 digits
                      </Form.Text>
                    </Form.Group>

                    <Form.Group>
                      <Form.Label className="text-red">PAYMENT</Form.Label>

                      <Row className="p-3 mb-4">
                        <Col>
                          <Form.Check
                            className="custom-radio"
                            type="radio"
                            id="card"
                            name="radioGroup"
                            checked={paymentOption === "card"}
                            value="card"
                            label="Card"
                            onChange={handleSelect}
                          />
                        </Col>
                        <Col>
                          <Form.Check
                            className="custom-radio"
                            type="radio"
                            id="cash"
                            name="radioGroup"
                            value="cash"
                            checked={paymentOption === "cash"}
                            label="Cash"
                            onChange={handleSelect}
                          />
                        </Col>
                      </Row>
                    </Form.Group>

                    <Button
                      variant="danger"
                      type="submit"
                      className="btn-custom-red"
                    >
                      Place Order
                    </Button>
                  </Form>
                </Col>
              </Row>
              <Container className="mt-4 p-3 "></Container>
            </Container>
          </Tab.Pane>
          <Tab.Pane eventKey="takeaway">
            <Container>
              <Row className="align-items-center p-3">
                <Col xs={12} md={9}>
                  <Form noValidate onSubmit={handleTakeawaySubmit}>
                    <Form.Group className="mb-3 w-90" controlId="tablenumber">
                      <Form.Label>Car Number</Form.Label>
                      <Form.Control
                        type="text"
                        name="carNumber"
                        style={{ border: "1px solid #000" }}
                        onChange={handleTakeawayChange}
                        placeholder="Car Number"
                        isInvalid={!!takeawayErrors.carNumber}
                        ref={carTakref}
                      />
                      <Form.Control.Feedback type="invalid">
                        {takeawayErrors.carNumber}
                      </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className="mb-3 w-90" controlId="fullName">
                      <Form.Label>Name</Form.Label>
                      <Form.Control
                        type="text"
                        name="name"
                        style={{ border: "1px solid #000" }}
                        onChange={handleTakeawayChange}
                        placeholder="Name"
                        isInvalid={!!takeawayErrors.name}
                        ref={nameTakRef}
                      />
                      <Form.Control.Feedback type="invalid">
                        {takeawayErrors.name}
                      </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="phoneNumber">
                      <Form.Label>Mobile Number</Form.Label>
                      <InputGroup>
                        <InputGroup.Text className="bg-danger text-white">
                          +971
                        </InputGroup.Text>
                        <Form.Control
                          type="text"
                          style={{ border: "1px solid #000" }}
                          placeholder="Enter mobile"
                          name="phone"
                          onChange={handleTakeawayChange}
                          isInvalid={!!takeawayErrors.phone}
                          ref={phoneTakRef}
                        />
                      </InputGroup>
                      <Form.Control.Feedback type="invalid">
                        {takeawayErrors.phone}
                      </Form.Control.Feedback>
                      <Form.Text className="text-muted">
              Number should with 9 digits
                      </Form.Text>
                    </Form.Group>

                    <Form.Group>
                      <Form.Label className="text-red">PAYMENT</Form.Label>

                      <Row className="p-3 mb-4">
                        <Col>
                          <Form.Check
                            className="custom-radio"
                            type="radio"
                            id="card"
                            name="radioGroup"
                            checked={paymentOption === "card"}
                            value="card"
                            label="Card"
                            onChange={handleSelect}
                          />
                        </Col>
                        <Col>
                          <Form.Check
                            className="custom-radio"
                            type="radio"
                            id="cash"
                            name="radioGroup"
                            value="cash"
                            checked={paymentOption === "cash"}
                            label="Cash"
                            onChange={handleSelect}
                          />
                        </Col>
                      </Row>
                    </Form.Group>

                    <Button
                      variant="danger"
                      type="submit"
                      className="btn-custom-red"
                    >
                      Place Order
                    </Button>
                  </Form>
                </Col>
              </Row>
              <Container className="mt-4 p-3 "></Container>
            </Container>
          </Tab.Pane>
          <Tab.Pane eventKey="delivery">
            <Container>
              <Row className="align-items-center p-3">
                <Col xs={12} md={9}>
                  <Form noValidate onSubmit={handleDeliverySubmit}>
                    <Form.Group className="mb-3 w-90" controlId="fullName">
                      <Form.Label>Name</Form.Label>
                      <Form.Control
                        type="text"
                        name="name"
                        style={{ border: "1px solid #000" }}
                        onChange={handleDeliveryChange}
                        placeholder="Name"
                        isInvalid={!!deliveryErrors.name}
                        ref={nameRef}
                      />
                      <Form.Control.Feedback type="invalid">
                        {deliveryErrors.name}
                      </Form.Control.Feedback>
                    </Form.Group>

                    {/* <Form.Group className="mb-3" controlId="emailAddress">
                      <Form.Label>Email address</Form.Label>
                      <Form.Control
                        type="email"
                        style={{ border: "1px solid #000" }}
                        placeholder="Enter email"
                        name="email"
                        onChange={handleDeliveryChange}
                        isInvalid={!!errors.email}
                        ref={emailRef}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.email}
                      </Form.Control.Feedback>
                      <Form.Text className="text-muted">
                        We'll never share your email with anyone else.
                      </Form.Text>
                    </Form.Group> */}

                    <Form.Group className="mb-3" controlId="phoneNumber">
                      <Form.Label>Mobile Number</Form.Label>
                      <InputGroup>
                        <InputGroup.Text className="bg-danger text-white">
                          +971
                        </InputGroup.Text>
                        <Form.Control
                          type="text"
                          style={{ border: "1px solid #000" }}
                          placeholder="Enter mobile"
                          name="phone"
                          onChange={handleDeliveryChange}
                          isInvalid={!!deliveryErrors.phone}
                          ref={phoneRef}
                        />
                      </InputGroup>
                      <Form.Control.Feedback type="invalid">
                        {deliveryErrors.phone}
                      </Form.Control.Feedback>
                      <Form.Text className="text-muted">
                      Number should with 9 digits
                      </Form.Text>
                    </Form.Group>

                    <Form.Group className="mb-3 w-90" controlId="address">
                      <Form.Label>Address</Form.Label>

                      <Form.Control
                        type="text"
                        name="address"
                        style={{ border: "1px solid #000" }}
                        onChange={handleDeliveryChange}
                        placeholder="Address"
                        isInvalid={!!deliveryErrors.address}
                        ref={addressRef}
                      />

                      <Form.Control.Feedback type="invalid">
                        {deliveryErrors.address}
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
                      <PlacesAutoComplete
                        onAddressSelect={handleAddressSelect}
                      />
                    </Form.Group>
                    {/* <Form.Group>
                      <Row>
                        <p style={{ fontSize: "12px" }}>
                         Delivery is free for orders above 10. Beyond that, a charge of {delivery_cost} OMR applies. Select your location to calculate the charge.
                              </p>
                        <Col className="fw-normal fs-6" xs={6}>
                          <Form.Label className="text-red">
                            Delivery Fee | {distance}km
                          </Form.Label>
                        </Col>
                        <Col xs={6} className="text-start text-danger fs-6">
                          <div>
                            {": "}
                            <CurrencyDisplay amount={deliveryCharge} />
                          </div>
                        </Col>
                      </Row>
                    </Form.Group>
                    <Form.Group>
                      <Row className="mb-2">
                        <Col className="  fs-6" xs={6}>
                          Grand Total
                        </Col>
                        <Col xs={6} className="text-start text-danger fs-6">
                          <div>
                            {": "}
                            <CurrencyDisplay amount={calculateGrandTotal()} />
                          </div>
                        </Col>
                      </Row>
                    </Form.Group> */}

                    <Form.Group>
                      <Form.Label className="text-red">Payment</Form.Label>

                      <Row className="p-3 mb-4">
                        <Col>
                          <Form.Check
                            className="custom-radio"
                            type="radio"
                            id="card"
                            name="radioGroup"
                            checked={paymentOption === "card"}
                            value="card"
                            label="Card"
                            onChange={handleSelect}
                          />
                        </Col>
                        <Col>
                          <Form.Check
                            className="custom-radio"
                            type="radio"
                            id="cash"
                            name="radioGroup"
                            value="cash"
                            checked={paymentOption === "cash"}
                            label="Cash"
                            onChange={handleSelect}
                          />
                        </Col>
                      </Row>
                    </Form.Group>

                    <Button type="submit" className="btn-custom-red">
                      Place Order
                    </Button>
                  </Form>
                </Col>
              </Row>
              <Container className="mt-4 p-3 "></Container>
            </Container>
          </Tab.Pane>
        </Tab.Content>
      </Tab.Container>
    </Container>
  );
}

export default UserDetail2;
