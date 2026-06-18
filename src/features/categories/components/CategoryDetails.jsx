import { Row } from "react-bootstrap";

import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {Card, Col,Form } from "react-bootstrap";
import { LazyLoadImage } from "react-lazy-load-image-component";
import defaultImg from "../../../assets/images/defaultimage.jpg";
import "../../../styles/Custom.css"

function CategoryDetails() {
  const categoryState = useSelector((state) => state.category);

  return (
    <div className="container-fluid  g-0 p-2 ">
      <Form.Label className="oleo-script-swash-caps-regular fs-2 m-2">
        Categories
      </Form.Label>
      <div className="row g-0">
        {categoryState.categories.map((product) => (
          <div className="col-md-3  p-2 " key={product.id}>
            <Card>
              <Link to={`/productdetail/${product.id}`}>
                <LazyLoadImage
                  src={product.image}
                  alt={defaultImg}
                  className="img-thumbnail"
                />
              </Link>

              <Card.Body className="m-0 p-2">
                <Row>
                  <Col className="assistant-font ">
                    <Card.Text className="fw-bold">{product.name}</Card.Text>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CategoryDetails;
