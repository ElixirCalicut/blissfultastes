import { React, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { BASE_URL } from "../data/Constants";
import axios from "axios";
import {
  Container,
  Row,
  Col,
  Card,
  Image,
  Form,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  addCartProducts,
  incrementProduct,
  decrementProduct,
  removeItem,
} from "../features/cart/reducer/CartReducer";
import { IMAGE_BASEURL } from "../data/Constants";
import CurrencyDisplay from "../features/settings/component/Currency";
import Loader from "../components/loader/Loader";
//import { handleDecrement, handleIncrement } from "../app/utils/utils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMinus,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import defaultImg from "../assets/images/defaultfood.svg";

function ProductDetailPage() {
  const { id } = useParams();
  console.log(id);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const viewCart = useSelector((state) => state.cart.viewCart);
  // const data = useSelector((state) => state.productdetail.data);
  const [status, setStatus] = useState("loading");
  const [selectedOption, setSelectedOption] = useState();
  const [loading, setLoading] = useState(true);
  const [imageLoaded, setImageLoaded] = useState(false);
  const Url = `${BASE_URL}/products/${id}/`;
  console.log(Url);

  const [productDetail, setProductDetail] = useState({
    id: 0,
    productid: 0,
    category: "",
    options: [
      {
        id: 0,
        option_name: "",
        additional_price: "",
        stock_quantity: 0,
        product: 0,
      },
    ],
    name: "",
    productname: "",
    description: "",
    price: "",
    image: "",
    has_extra_option: true,
  });
  //useeffect fetch product based on the id from useparams
  useEffect(() => {
    console.log(Url);
    //dispatch(fetchProductDetailByID(id))

    axios
      .get(Url)
      .then((response) => {
        //   console.log(response.data);
        const newdata = response.data;

        //   console.log(IMAGE_BASEURL + newdata.image);
        //  setProductata(response.data.data);
   setProductDetail((prev) => ({
  ...prev,
  id: newdata.id,
  productid: newdata.id,
  itemCode:newdata.itemCode,
  name: newdata.name,
  productname: newdata.name,
  category: JSON.stringify(newdata.category),
  description: newdata.description,
  image: newdata.image,
  price: newdata.price,
  quantity: 1,
  subtotal: parseFloat(1 * newdata.price),
  has_extra_option: newdata.has_extra_option,
  options: newdata.options,
}));
        // console.log(newdata.options[0].id);
        setSelectedOption(
          newdata.has_extra_option === true ? newdata.options[0].id : newdata.id
        );
        setStatus("success");
      })
      .catch((error) => {
        if (error.message === "Network Error") {
          setStatus("failed");
          console.error(
            "Network error: Please check your internet connection."
          );
        } else {
          setStatus("failed");
          console.error("Error:", error.message);
        }
      });
  }, [Url]);
  const addtoCart = (event) => {
    event.preventDefault();
    console.log(productDetail);
    console.log(selectedOption);
    const opt = productDetail.options.find(
  (opt) => Number(opt.id) === Number(selectedOption)
);
    // const opt = productDetail.options.find((opt) => opt.id === selectedOption);
    console.log(opt);
    var extra_option = productDetail.has_extra_option === true;
    const newProduct = {
      _id: extra_option ? selectedOption : productDetail.id,
      productid: productDetail.id,
      itemCode:productDetail.itemCode,
      name: extra_option ? opt.option_name : productDetail.name,
      productname: productDetail.name,
      category: productDetail.category,
      price: extra_option ? opt.additional_price : productDetail.price,
      description: productDetail.description,
      quantity: productDetail.quantity,
      subtotal: extra_option
        ? parseFloat(productDetail.quantity * opt.additional_price)
        : productDetail.quantity * productDetail.price,
      image: productDetail.image,
      has_extra_option: productDetail.has_extra_option,
    };
    console.log(newProduct);

    dispatch(addCartProducts([newProduct]));
  };

  const CartView = () => {
    navigate("/viewcart");
  };
  const getCartQuantity = (productId) => {
    console.log(productId);
    console.log("cart in getcartquantity", viewCart);
    const item = viewCart.find(
      (item) => parseInt(item._id) === parseInt(productId)
    );
    console.log(item);
    return item ? item.quantity : 0;
  };

  const handleIncrement = (productId, product) => {
    const item = viewCart.find(
      (item) => parseInt(item._id) === parseInt(productId)
    );
    const qty = item ? item.quantity : 0;
    dispatch(incrementProduct({ _id: productId, quantity: qty + 1 }));
  };

  const handleDecrement = (productId, product) => {
    const item = viewCart.find(
      (item) => parseInt(item._id) === parseInt(productId)
    );
    if (item && item.quantity > 1) {
      const qty = item.quantity - 1;
      dispatch(decrementProduct({ _id: productId, quantity: qty }));
    } else if (item.quantity === 1) {
      //const qty = item.quantity - 1;
      dispatch(removeItem(productId));
    }
  };
  const handleSelect = (e) => {
    setSelectedOption(e.target.value);
  };
  if (status === "loading")
    return (
      <Container className="text-center">
        <Loader loading={status} color="#36d7b7" />{" "}
      </Container>
    );
  if (status === "failed")
    return (
      <Container className="text-center">
        <Loader loading={status} color="#FF0000" /> Error: {status}
      </Container>
    );

  const handleImageLoad = () => {
    setLoading(false); // Once image is loaded, set loading state to false
    setImageLoaded(true); // Set imageLoaded to true
  };
  const handleImageError = () => {
    setLoading(false); // Once image is loaded, set loading state to false
    setImageLoaded(true); // Set imageLoaded to true
  };
  const isValidImageFormat = (filename) => {
    const validExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.bmp', '.tiff'];
    return validExtensions.some(ext => filename.toLowerCase().endsWith(ext));
  };
  

  return (
    <Container fluid className="p-1 mt-3 ">
      <Card className="border border-light ">
        <Row className="m-2">
          <Col md={4}>
            {loading === "false" ? (
              <Loader loading={imageLoaded} />
            ) : (
              productDetail.image!==null && isValidImageFormat(productDetail.image)?
              <Image
                src={IMAGE_BASEURL+productDetail.image} // Correctly accessing properties of productDetail
                className="img-fluid   rounded-border"
                alt={productDetail.image}
                onLoad={handleImageLoad}
                onError={handleImageError}
              />:            
              <Image src={defaultImg} // Correctly accessing properties of productDetail
              className="img-fluid   rounded-border"
              alt={productDetail.image}
              onLoad={handleImageLoad}
              onError={handleImageError}
            />
              
            )}
          </Col>
          <Col md={8} className="mt-3 text-left">
            <>
              <Row>
                <Col>
                  <h4 className=" fw-bolder">{productDetail.name}</h4>
                </Col>
                <Col className="text-end">
                  <div className="fw-bold text-danger me-3">
                    <CurrencyDisplay
                      amount={productDetail.price}
                      largeFont={true}
                    />
                  </div>
                </Col>
              </Row>
              <p className="card-text">{productDetail.description?productDetail.description:""}</p>
              {productDetail.has_extra_option === true ? (
                <>
                  {productDetail.options.map((option) => (
                    <Form.Group key={option.id} controlId={option.id}>
                      <Row>
                        <Col>
                          <Form.Label className="text-dark">
                            {option.option_name}
                          </Form.Label>
                        </Col>
                        <Col>
                          <Form.Check
                            className="custom-radio"
                            type="radio"
                            id={option.id.toString()}
                            name="radioGroup"
                            defaultChecked
                            checked={selectedOption === option.id.toString()}
                            value={option.id}
                            label={option.additional_price}
                            onChange={handleSelect}
                          />
                        </Col>
                      </Row>
                    </Form.Group>
                  ))}
                  {/* {selectedOption && <p>You selected: {selectedOption}</p>} */}
                </>
              ) : (
                <></>
              )}

              {getCartQuantity(
                selectedOption ? selectedOption : productDetail.productid
              ) === 0 ? (
                <div>
                  <div>
                    <button
                      className="btn btn-outline-danger fw-bold m-2"
                      onClick={addtoCart}
                    >
                      Add to cart
                    </button>
                  </div>
                </div>
              ) : (
                <Col lg="auto text-left  ">
                  <div className="m-2 btn d-flex fs-6 fw-bold text-danger border-white text-left">
                    <span className="fs-6 fw-bold text-dark me-3">
                      Quantity
                    </span>
                    <div className="assistant-font icon-wrapper">
                      <FontAwesomeIcon
                        size="sm"
                        icon={faMinus}
                        onClick={() =>
                          handleDecrement(
                            productDetail.has_extra_option === true
                              ? selectedOption
                              : productDetail.productid,
                            productDetail
                          )
                        }
                        className="custom-icon"
                      />
                    </div>

                    <span
                      bg="danger"
                      className="mx-2 assistant-font fs-5 fw-bold mb-2"
                    >
                      {getCartQuantity(
                        selectedOption
                          ? selectedOption
                          : productDetail.productid
                      )}
                    </span>
                    <div className="assistant-font icon-wrapper">
                      <FontAwesomeIcon
                        size="sm"
                        className="custom-icon"
                        icon={faPlus}
                        onClick={() =>
                          handleIncrement(
                            productDetail.has_extra_option === true
                              ? selectedOption
                              : productDetail.productid,
                            productDetail
                          )
                        }
                      />
                    </div>
                  </div>
                </Col>
              )}
              <div>
                <button
                  className="btn btn-danger border-red fw-bold m-2"
                  type="button"
                  onClick={() => CartView()}
                >
                  View Cart
                </button>
              </div>
            </>
          </Col>
        </Row>
      </Card>
      <Container className="mt-4 p-3 "></Container>
    </Container>
  );
}

export default ProductDetailPage;
