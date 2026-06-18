import { React, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Card, Container, Row, Col, Button, Form } from "react-bootstrap";
import "../styles/Custom.css";
import { Link } from "react-router-dom";
import CurrencyDisplay from "../features/settings/component/Currency";
import { IMAGE_BASEURL } from "../data/Constants";
import { grandTotal } from "../features/cart/reducer/CartReducer";
import { fetchSettingsApi } from "../features/thunks/Thunks";
import defaultImge from "../assets/images/images.png";

function OrderSummaryPage() {
  const dispatch = useDispatch();
  const cartState = useSelector((state) => state.cart);
  const settingdetails = useSelector((state) => state.settings.settingdetails);
  const [option, setSelectedOption] = useState("delivery");
  const [cookingData, setCookingData] = useState({
    cookingInstructionEN: "", // English instructions
    cookingInstructionAR: "",
  });

  
  useEffect(() => {
    dispatch(fetchSettingsApi());
  }, [dispatch]);
  //calculate total price of products
  const calculateTotalPrice = () => {
    console.log(cartState.total);
    const tot = parseFloat(
      cartState.viewCart.reduce(
        (total, item) => total + parseFloat(item.subtotal),
        0
      )
    ).toFixed(3);
    return tot;
  };
  //calculate vat after applying to product
  const calculateVATPercent = (totalPrice) => {
    const tot = (
      (calculateTotalPrice() *
        parseFloat(
          settingdetails.tax_percentage ??  0
        )) /
      100
    ).toFixed(3);
    return tot;
  };
  //calculate grand total with total and vat and delivery cost
  const calculateGrandTotal = () => {
    var grandtotal;
    if (option === "delivery") {
      grandtotal = parseFloat(
        parseFloat(totDiffrncwithvat) +
          parseFloat(calculateVATPercent())+(
          (totDiffrncwithvat)  > 10
          ? 0.000
          : parseFloat(settingdetails.delivery_cost))
        // parseFloat(settingdetails.delivery_cost)
      ).toFixed(3);
    } else {
      grandtotal = parseFloat(
        parseFloat(totDiffrncwithvat) +
          parseFloat(calculateVATPercent())
      ).toFixed(3);
    }
    dispatch(grandTotal(grandtotal));
    return grandtotal;
  };

  const handleSelect = (e) => {
    setSelectedOption(e.target.value);
    const deliveryRow = document.getElementById("deliveryRow");
    if (e.target.value === "takeaway" || e.target.value === "dinein") {
      if (deliveryRow) {
        deliveryRow.style.display = "none";
      }
    } else {
      deliveryRow.style.display = "flex";
    }
  };
  const addCookingDetail = (e) => {
    const { name, value } = e.target;
    console.log("testimg", value);
    setCookingData({ ...cookingData, [name]: value });
    console.log("testimg", cookingData);
  };
  const isValidImageFormat = (filename) => {
    const validExtensions = [".jpg", ".jpeg", ".png", ".gif", ".bmp", ".tiff"];
    return validExtensions.some((ext) => filename.toLowerCase().endsWith(ext));
  };
  const totDiffrncwithvat=calculateTotalPrice() - calculateVATPercent();

  return (
    <Container className="my-5 assistant-font">
      <h2 className="text-center mb-4 fw-bold">Order Summary</h2>
      <Row className="justify-content-center">
        <Col md={8}>
          <Card className="mb-4 shadow-sm">
            <Card.Body>
              {cartState.viewCart.map((item) => (
                <Row key={item._id} className="align-items-center mb-3">
                  {item.image !==null && isValidImageFormat(item.image) ? (
                    <Col xs={3}>
                      <img
                        src={IMAGE_BASEURL + item.image}
                        className="img-fluid rounded fw-bold"
                        alt={item.name}
                      />
                    </Col>
                  ) : (
                    <Col xs={3}>
                      <img
                        src={defaultImge}
                        className="img-fluid rounded fw-bold"
                        alt={item.name}
                      />
                    </Col>
                  )}
                  <Col xs={9}>
                    <Row>
                      <Col xs={8} className="">
                        {item.has_extra_option === true ? (
                          <div>
                            <h6 className=" fw-bold  ">{item.productname}</h6>
                            <h6 className=" fs-6  ">{item.name}</h6>
                             {/* <h6 className=" fs-6  ">{item.itemCode}</h6> */}
                          </div>
                        ) : (
                          <h6 className=" fs-6 fw-bold  ">{item.name}</h6>
                        )}

                        <p className="mb-0 fw-bold fs-6  ">
                          {item.quantity} x {item.price}
                        </p>
                      </Col>
                      <Col
                        xs={4}
                        className="assistant-font"
                        style={{ "text-align": "right" }}
                      >
                        <div className="fw-bold mb-0 text-danger fs-6 text-right pe-2">
                          <CurrencyDisplay
                            amount={item.subtotal}
                            currencySymbol="INR"
                          />
                        </div>
                      </Col>
                    </Row>
                  </Col>
                </Row>
              ))}
            </Card.Body>
          </Card>
          <Card className="shadow-sm pe-2 mb-2">
            <Card.Body>
              <Row className=" ">
                <Col className="fw-bold fs-6" xs={8}>
                  Add Cooking Instructions
                </Col>

                {/* English Cooking Instructions */}
                <Col xs={12} className="text-end">
                  <Form.Group className="mb-3 mt-3 w-200" controlId="cookingEN">
                    <Form.Control
                      type="text"
                      name="cookingInstructionEN" // This will be handled in addCookingDetail
                      style={{ border: "1px solid #000" }}
                      onChange={addCookingDetail}
                      placeholder="Cooking Instructions (English)"
                    />
                    <Form.Control.Feedback type="invalid"></Form.Control.Feedback>
                  </Form.Group>
                </Col>

                {/* Arabic Cooking Instructions */}
                <Col xs={12} className="text-end">
                  <Form.Group className="mb-3 mt-3 w-200" controlId="cookingAR">
                    <Form.Control
                      type="text"
                      name="cookingInstructionAR" // This will also be handled in addCookingDetail
                      style={{ border: "1px solid #000", direction: "rtl" }} // Setting text direction to right-to-left for Arabic
                      onChange={addCookingDetail}
                      placeholder="تعليمات الطبخ (Arabic)"
                    />
                    <Form.Control.Feedback type="invalid"></Form.Control.Feedback>
                  </Form.Group>
                </Col>
              </Row>
            </Card.Body>
          </Card>
          <Card className="shadow-sm pe-2">
            <Card.Body>
              <Row className="mb-2 ">
                <Col className="fw-bold  fs-6" xs={8}>
                  Total Before VAT
                </Col>
                <Col xs={4} className="text-end">
                  <div className="text-danger fs-6" >
                    {" "}
                    <CurrencyDisplay
                      amount={calculateTotalPrice() - calculateVATPercent()}
                    />
                  </div>
                </Col>
              </Row>
              <Row className="fw-bold ">
                <Col className="fw-bold  fs-6" xs={8}>
                VAT Incl.(
  {settingdetails.tax_percentage ?? 5}
)%
                  {/* VAT Incl.(
                  {settingdetails.tax_percentage
                    ? settingdetails.tax_percentage
                    : 5}
                  )% */}
                </Col>
                <Col xs={4} className="text-end text-danger fs-6">
                  <div>
                    {" "}
                    <CurrencyDisplay amount={calculateVATPercent()} />
                  </div>
                </Col>
              </Row>

              <hr />
              <Row>
                <div class="delivery-options">
                  <Col className="fw-bold  fs-6" xs={8}>
                    Delivery Option
                  </Col>
                  <Row>
                    <Col className="fw-bold">
                      <Form.Check
                        className="custom-radio2"
                        type="radio"
                        label="Delivery"
                        name="fulfillment-option"
                        value="delivery"
                        data-fee="5.00"
                        checked={option === "delivery"}
                        onChange={handleSelect}
                      />
                    </Col>
                    <Col className="fw-bold">
                      <Form.Check
                        className="custom-radio2"
                        type="radio"
                        label="Takeaway"
                        name="fulfillment-option"
                        value="takeaway"
                        data-fee="0.00"
                        checked={option === "takeaway"}
                        onChange={handleSelect}
                      />
                    </Col>
                    <Col className="fw-bold">
                      <Form.Check
                        className="custom-radio2"
                        type="radio"
                        label="Dine In"
                        name="fulfillment-option"
                        value="dinein"
                        data-fee="0.00"
                        checked={option === "dinein"}
                        onChange={handleSelect}
                      />
                    </Col>
                  </Row>
                </div>
              </Row>
              <hr />
              <Row id="deliveryRow" className="g-0">
              <Row className="mb-2  g-0" >
              <div className="text-danger fw-bold">
                    {" "}
                    {(totDiffrncwithvat) > 10 ? (
                     <></>
                    ) : (
                      <div  style={{
                        backgroundColor: "#ffeb3b",
                        padding: "8px 16px",
                        borderRadius: "4px",
                        fontWeight: "bold",
                        color: "#000",
                        fontSize: "0.9rem",
                        display: "inline-block",
                        boxShadow: "0px 2px 10px rgba(0, 0, 0, 0.1)"
                      }}>
                        Add{" "}
                        <CurrencyDisplay
                          amount={
                          10-(totDiffrncwithvat)
                          }
                        />{" "}
                        to get free delivery!
                      </div>
                    )
                  }
                  </div>

              </Row>

              <Row className="mb-2 g-0" >
                <Col className="fw-bold  fs-6" xs={8}>
                  Delivery Charge
                </Col>
                <Col xs={4} className="text-end text-danger fs-6">
                  <div>
                    {" "}
                    <CurrencyDisplay
                      amount={
                        totDiffrncwithvat > 10
                          ? 0.0
                          : settingdetails.delivery_cost
                      }
                    />
                  </div>
                </Col>
                <Row className="g-0">
                  <p style={{ fontSize: "12px" }}>
                    Delivery is free for orders over 10 OMR. For orders below 10
                    OMR, a delivery charge of {settingdetails.delivery_cost} OMR
                    applies.
                  </p>
                </Row>
              </Row>
              </Row>
              <Row className="mb-2">
                <Col className="fw-bold  fs-6" xs={8}>
                  Grand Total
                </Col>
                <Col xs={4} className="text-end text-danger fs-6">
                  <div>
                    {" "}
                    <CurrencyDisplay amount={calculateGrandTotal()} />
                  </div>
                </Col>
              </Row>
              <Link
                to={`/adddetail/${option}/${totDiffrncwithvat > 10
                  ? 0.0
                  : settingdetails.delivery_cost}/${
                  cookingData
                    ? encodeURIComponent(JSON.stringify(cookingData))
                    : "No instructions"
                }`}
              >
                <Button variant="danger" className="mt-3 w-100">
                  Proceed to Checkout
                </Button>
              </Link>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Container className="mt-4 p-3 "></Container>
    </Container>
  );
}

export default OrderSummaryPage;
