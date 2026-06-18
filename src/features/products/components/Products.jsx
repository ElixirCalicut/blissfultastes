import { React, useState } from "react";
import { Card, Row, Col, Button } from "react-bootstrap";
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
  removeItem,
} from "../../cart/reducer/CartReducer";
import { useDispatch, useSelector } from "react-redux";
import Badge from "react-bootstrap/Badge";
import { IMAGE_BASEURL } from "../../../data/Constants";
import CurrencyDisplay from "../../settings/component/Currency";
import "../../../styles/Custom.css";
import { Image } from "react-bootstrap";
import defaultImg from "../../../assets/images/defaultfood.svg";

function Products({ products }) {
  const dispatch = useDispatch();
  const viewCart = useSelector((state) => state.cart.viewCart);
  const [hovered, setHovered] = useState({});

  //_id of listed product,
  //productid another key is kept so that when options are there we need to send options_name and
  const addtoCart = (product) => {
    const newProduct = {
      _id: product.id,
      productid: product.id,
       itemCode:product.itemCode,
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
    console.log(newProduct);
    dispatch(addCartProducts([newProduct]));
  };

  const getCartQuantity = (productId) => {
    console.log(productId);
    console.log(products);
    console.log(viewCart);
    const item = viewCart.find((item) => item.productid === productId);
    console.log(item);
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
    } else if (item.quantity === 1) {
      //const qty = item.quantity - 1;
      dispatch(removeItem(productId));
    }
  };

  const handleMouseEnter = (id) => {
    setHovered((prevHovered) => ({ ...prevHovered, [id]: true }));
  };

  const handleMouseLeave = (id) => {
    setHovered((prevHovered) => ({ ...prevHovered, [id]: false }));
  };
  //   function splitProductName( ) {
  //     if (product.productName.length > 15) {
  //         let splitIndex = productName.lastIndexOf(' ', maxLength);
  //         if (splitIndex === -1) {
  //             splitIndex = maxLength;
  //         }
  //         let firstPart = product.productName.slice(0, splitIndex);
  //         let secondPart =product.productName.slice(splitIndex).trim();

  //         return { firstPart, secondPart };
  //     } else {
  //         return { firstPart: product.productName, secondPart: '' };
  //     }
  // }
  const isValidImageFormat = (filename) => {
    const validExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.bmp', '.tiff'];
    return validExtensions.some(ext => filename.toLowerCase().endsWith(ext));
  };
  


  return (
    <div className="container-fluid  g-0 ">
      <div className="row g-0">
        {products.map((product) => (
          <div className="col-md-3 col-6 p-2   " key={product.id}>
            <Card className="shadow-sm text-left rounded-border-product    ">
           { product.image!==null && isValidImageFormat(product.image)?
              <Link to={`/productdetail/${product.id}`}>
                <Image
                  src={IMAGE_BASEURL+product.image}
                
                  className="img-fluid-product  border-white rounded-border-product   "
                />
              </Link>
              : <Link to={`/productdetail/${product.id}`}>
               <Image
                  src={defaultImg}
                  style={{ width: '150px', height: 'auto', padding: '10px' }}
                className="img-fluid-product-default mx-auto border-white rounded-border-product-updated img-fluid-product-default  "
              />
            </Link>
             }

              <Card.Body className="m-0 p-0 pb-2 ">
                <Row className="ps-2 ">
                  <Col>
                    <span className="assistant-font fw-bold fs-6  m-0 truncate ">
                      {product.name}
                    </span>
                    <CurrencyDisplay amount={product.price} />
                  </Col>
                </Row>
                {/*               
                {
                product.name.length < 25 ? (
                  <Row className="ps-2 ">
                    <Col>
                      <p
                        className="assistant-font fw-bold fs-6 m-0 "
                   
                      >
                        {product.name}
                      </p>

                      <CurrencyDisplay amount={product.price} />
                      <p className="pt-1"></p>
                    </Col>
                  </Row>
                ) : (
                  <Row className="ps-2 ">
                  <Col>
                    <span
                      className="assistant-font fw-bold fs-6  m-0 truncate "
                
                    >
                      {product.name}
                    </span>
                    <CurrencyDisplay amount={product.price} />
                  </Col>
                </Row> 
                )}  */}

                <Row className="justify-content-end">
               {product.is_available === true?
                  <Col xs="auto  " className="">

                    {getCartQuantity(product.id) === 0 ? (
                      product.has_extra_option === true ? (
                        <Col xs="col-8 ps-3  ">
                          <div>
                            <Link
                              to={`/productdetail/${product.id}`}
                              className="text-decoration-none"
                            >
                              <Button variant="btn btn-outline-danger fs-6 fw-bold m-1 ">
                                Add
                              </Button>
                            </Link>
                          </div>
                        </Col>
                      ) : (
                        <Col xs="col-8 ps-3">
                          <div className="" onClick={() => addtoCart(product)}>
                            {/* <FontAwesomeIcon icon={faCartPlus} /> */}
                            <Button variant="btn btn-outline-danger fs-6  fw-bold m-1">
                              Add
                            </Button>
                          </div>
                        </Col>
                      )
                    ) : (
                      <>
                        {product.has_extra_option === true ? (
                          <>
                            <Col xs="col-8 ps-3  ">
                              <div>
                                <Link
                                  to={`/productdetail/${product.id}`}
                                  className="text-decoration-none"
                                >
                                  <Button variant="btn btn-outline-danger fs-6 fw-bold m-1 ">
                                    Add
                                  </Button>
                                </Link>
                              </div>
                            </Col>{" "}
                          </>
                        ) : (
                          <Col xs="auto  ">
                            <div
                              className={`m-1  d-flex btn btn-outline-danger fs-6 fw-bold text-danger custom-link ${
                                hovered[product.id] ? "hovered" : ""
                              }`}
                              onMouseEnter={() => handleMouseEnter(product.id)}
                              onMouseLeave={() => handleMouseLeave(product.id)}
                            >
                              <div className="assistant-font">
                                <FontAwesomeIcon
                                  icon={faMinus}
                                  onMouseEnter={() =>
                                    handleMouseEnter(product.id)
                                  }
                                  onMouseLeave={() =>
                                    handleMouseLeave(product.id)
                                  }
                                  className="fa-icon "
                                  onClick={() =>
                                    handleDecrement(product.id, product)
                                  }
                                />
                              </div>
                              <Badge
                                bg="danger"
                                className="mx-2 assistant-font"
                                onMouseEnter={() =>
                                  handleMouseEnter(product.id)
                                }
                                onMouseLeave={() =>
                                  handleMouseLeave(product.id)
                                }
                              >
                                {getCartQuantity(product.id)}
                              </Badge>
                              <div className="assistant-font">
                                <FontAwesomeIcon
                                  icon={faPlus}
                                  onMouseEnter={() =>
                                    handleMouseEnter(product.id)
                                  }
                                  onMouseLeave={() =>
                                    handleMouseLeave(product.id)
                                  }
                                  className="fa-icon"
                                  onClick={() =>
                                    handleIncrement(product.id, product)
                                  }
                                />
                              </div>
                            </div>
                          </Col>
                        )}
                      </>
                    )}
                  </Col>:<Col className="text-end"> <Button variant="btn btn-outline-danger fs-6 fw-bold m-1 ">
                                Not Available
                              </Button></Col>
                }
                </Row>
              </Card.Body>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Products;