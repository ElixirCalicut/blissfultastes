import React from 'react'
import { Button, Container,Image ,Row,Col,Card} from 'react-bootstrap'
import imag_thank from "../assets/images/thankyouicon.png"
//import SuccessIcon from "../assets/images/SuccessIcon.png"
import { useNavigate } from 'react-router-dom'



function ThankYouOrder() {
  const navigate=useNavigate();
  const redirect=()=>{
  //  dispatch(clearCart())

    navigate("/");
  }
  return ( 
    <>
    <Container fluid className='p-2 text-center mt-5' >
      <Card >
      <Col  className='m-5' >
        <Row >
      <Col>
        <Image src={imag_thank}  rounded width={200}  height={200}  />
        </Col>
        {/* <Image src={SuccessIcon}  rounded width={200} /> */}
        </Row>
        <Row className='justify-content-center'>

        <label className='assistant-font  fs-4 fw-bolder mt-5'>Thank You! Order Completed</label>
        <Button variant="danger" className='w-50 m-5' onClick={redirect}>OK</Button>
        </Row>
        </Col>
        </Card>
        

    </Container>
    </>
  )
}

export default ThankYouOrder