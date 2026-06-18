// src/components/ContactUs.js
import React from "react";
import { useSelector } from "react-redux";
import { Col,Row } from "react-bootstrap";
import "../styles/Custom.css";

const ContactUs = () => {
  const settingdetails = useSelector((state) => state.settings.settingdetails);
  console.log(settingdetails);
  // const [formData, setFormData] = useState({
  //   name: "",
  //   email: "",
  //   message: "",
  // });

  // const handleChange = (e) => {
  //   setFormData({
  //     ...formData,
  //     [e.target.name]: e.target.value,
  //   });
  // };

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   // Handle form submission (e.g., send data to an API)
  //   console.log(formData);
  // };

  return (
    <div className="container mt-5">
        <Row>
        {/* <Col className="p-4">
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="message" className="form-label">
            Message
          </label>
          <textarea
            className="form-control"
            id="message"
            name="message"
            rows="3"
            value={formData.message}
            onChange={handleChange}
            required
          ></textarea>
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
      </Col> */}
            <Col>
      <div className="oleo-script-swash-caps-regular fs-2 m-2">Our Address</div>
      {settingdetails ? (
        <>
          <div className="mb-4">
            <div className="oleo-script-swash-caps-regular">
              Building: {settingdetails.building}
            </div>
            <div className="oleo-script-swash-caps-regular">
              Street: {settingdetails.street}
            </div>
            <div className="oleo-script-swash-caps-regular">
              City: {settingdetails.city}
            </div>
            <div className="oleo-script-swash-caps-regular">
              State: {settingdetails.state}
            </div>
            <div className="oleo-script-swash-caps-regular">
              Zipcode: {settingdetails.zipcode}
            </div>
          </div>
          <div className="mb-4">
            <h5 className="oleo-script-swash-caps-regular ">For any queries, you can contact us at:</h5>
            <div className="oleo-script-swash-caps-regular ">Email: support@fooddelivery.com</div>
            <div className="oleo-script-swash-caps-regular ">Contact Number: {settingdetails.contact_number}</div>
            <div className="oleo-script-swash-caps-regular ">WhatsApp Phone Number: {settingdetails.whatsapp_phone_number}</div>
          </div>
        </>
      ) : (
        <></>
      )}
      </Col>
   
      </Row>
    </div>
    
  );
};

export default ContactUs;
