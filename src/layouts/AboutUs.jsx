import React from "react";
import { useSelector } from "react-redux";
import { Card, Container } from "react-bootstrap";
import "../styles/Custom.css";


function AboutUs() {
  const settingdetails = useSelector((state) => state.settings.settingdetails);
  console.log(settingdetails);
  return settingdetails ? (
    <Container className="assistant-font ">
      <Container>
        <Card>
          <Container className="container mt-5">
            <h2 className='poppins-bold'>
              About {settingdetails.company_name}
            </h2>
          
           
            {/* <p >
              Welcome to our food delivery service. We are committed to
              delivering delicious food from the best restaurants in town right
              to your doorstep.
            </p>
            <p >
              Our mission is to provide a fast, reliable, and convenient way to
              enjoy your favorite meals without leaving the comfort of your
              home.
            </p>
            <h2 className='poppins-bold'>Our Team</h2>
            <p>
              We have a dedicated team of professionals working around the clock
              to ensure that your food is delivered hot and fresh. Our drivers
              are trained to handle your food with care and deliver it in a
              timely manner.
            </p> */}
              <p >
              {settingdetails.about_company}
            </p>
            <p >
              {settingdetails.about_company1}
            </p>
            <p >
              {settingdetails.about_company2}
            </p>
          </Container>
        

          <Container >
          <h2 className='poppins-bold'>
              Address
            </h2>
            <div className="mb-4">
              <div >
                Building: {settingdetails.building}
              </div>
              <div >
                Street: {settingdetails.street}
              </div>
              <div >
                City: {settingdetails.city}
              </div>
              <div >
                Country: {settingdetails.Country}
              </div>
              <div >
                Zipcode: {settingdetails.zipcode}
              </div>
            </div>
            <div className="mb-4">
              <h5 className='poppins-bold' >
                For any queries, you can contact us at:
              </h5>
              <div >
                Email: support@fooddelivery.com
              </div>
              <div >
                Contact Number: {settingdetails.contact_number}
              </div>
              <div>
                WhatsApp Phone Number: {settingdetails.whatsapp_phone_number}
              </div>
            </div>
          </Container>
        </Card>
     
      </Container>
      <Container className="mt-5 p-5 "></Container>
    </Container>
  ) : (
    <></>
  );
}

export default AboutUs;
