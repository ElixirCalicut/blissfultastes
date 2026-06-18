import React, { useEffect, useState } from "react";
import Products from "../../products/components/Products";
import { IMAGE_BASEURL } from "../../../data/Constants";
import { setSearchQuery } from "../../products/reducer/ProductReducer";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductData } from "../../thunks/Thunks";
import { fetchCategories } from "../../thunks/Thunks";
import { fetchProductsByCategory } from "../../thunks/Thunks";
import { selectCategory } from "../reducer/CategoryReducer";
import { Col, Container, Image, Row, Form } from "react-bootstrap";
import Loader from "../../../components/loader/Loader";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import "../../../styles/Custom.css";
import { ScrollMenu} from "react-horizontal-scrolling-menu";
import "react-horizontal-scrolling-menu/dist/styles.css";
import defaultImg from "../../../assets/images/images.png";
import Divider from "../../../components/Divider/Divider";
import mainlogo from "../../../assets/images/snooker.jpeg";
import "../../../styles/Custom.css";

function Categories({ searchTerm }) {
  const dispatch = useDispatch();
  const productState = useSelector((state) => state.product);
  const categoryState = useSelector((state) => state.category);
  // eslint-disable-next-line no-unused-vars
  const [loading, setLoading] = useState(true);
  // eslint-disable-next-line no-unused-vars
  const [imageLoaded, setImageLoaded] = useState(false);
  const scrollInterval = 3000; // Set the interval for automatic scrolling in milliseconds

  //dispatch view all categories and products
  useEffect(() => {
    dispatch(fetchCategories());
    dispatch(fetchProductData());
  }, [dispatch]);

  // Filter products when the search term changes
useEffect(() => {
  if (searchTerm) {
    dispatch(setSearchQuery(searchTerm));
  }
}, [searchTerm, dispatch]);

  const handleCategoryClick = (category) => {
    dispatch(selectCategory(category.strCategory));
    dispatch(fetchProductsByCategory(category.id));
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      const container = document.getElementById("categoryContainer");
      if (container) {
        if (
          container.scrollLeft + container.offsetWidth >=
          container.scrollWidth
        ) {
          container.scrollLeft = 0; // Reset scroll to the start
        } else {
          container.scrollLeft += container.offsetWidth;
        }
      }
    }, scrollInterval);

    return () => clearInterval(intervalId);
  }, []);

  if (productState.status === "loading" || categoryState.status === "loading")
    return (
      <Container className="text-center">
        <Loader loading={productState.status} color="#36d7b7" />{" "}
      </Container>
    );
  if (productState.status === "failed" || categoryState.status === "failed")
    return (
      <Container className="text-center">
        <Loader loading={productState.status} color="#FF0000" /> Error:{" "}
        {productState.error}
        {categoryState.error}
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
  

  const renderCategories = () => {
    return categoryState.categories.map((item) => (
      <div
        className="col mb-1 text-center item-container p-0"
        key={item.id}
        onClick={() => handleCategoryClick(item)}
        role="button"
        tabIndex={0}
      >
        <Container className="circle">
          {item.image ? (
            <LazyLoadImage
              src={isValidImageFormat(item.image)? IMAGE_BASEURL + item.image:defaultImg}
              roundedCircle
              width={70}
              height={60}
              onLoad={handleImageLoad}
              onError={handleImageError}
            />
          ) : (
            <LazyLoadImage
              src={defaultImg}
              roundedCircle
              width={70}
              height={50}
              onLoad={handleImageLoad}
              onError={handleImageError}
            />
          )}

          <Form.Label className="mt-1 bold">
            <span className=" fs5 assistant-font">{item.name}</span>
          </Form.Label>
        </Container>
      </div>
    ));
  };

  return (
    <Container fluid className="mt-1 mb-5">
      <Row className="text-center">
        <Col className="text-center">
        <Image
    src={mainlogo} // Replace with your logo path
    style={{ width: "300px", height: "200px",   }} // Use 'contain' to fit the image
    className="d-inline-block align-top rounded-circle carousel-inner" // Add rounded-circle if needed
    alt="Logo"
  />
        </Col>
        <Divider text="CATEGORIES" />

        {/* <Link to="/all">
      <Container fluid className="text-end pe-3">All<FontAwesomeIcon icon={faArrowRight} /></Container>
      </Link>  */}
        <Col
          className="col-12"
          style={{
            overflowX: "auto",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Col
            id="categoryContainer"
            className="col-12"
            style={{
              display: "flex",
              justifyContent: "center",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                overflowX: "scroll",
                scrollbarWidth: "none",
                msOverflowStyle: "none",
              }}
            >
              <ScrollMenu>{renderCategories()}</ScrollMenu>
            </div>
          </Col>
        </Col>
      </Row>
      <Products products={productState.filteredData} />
      <Container className="mt-4 p-3 "></Container>
    </Container>
  );
}
export default Categories;
