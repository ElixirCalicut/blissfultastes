import { React,useEffect } from "react";
import Carousel from "react-bootstrap/Carousel";

import BannerImage from "./BannerImage";
import { Container } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { fetchSettingsApi } from "../../features/thunks/Thunks";
import img from "../../assets/images/banner.png";
import "../../styles/Custom.css"

//banner image layout with component banner image
function Banner() {
  const settingdetails = useSelector((state) => state.settings.settingdetails);
  console.log(settingdetails);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchSettingsApi());
  }, [dispatch]);
  return (
    // <>{settingdetails.banner_images}</>
   
        // settingdetails.banner_images.map((detail) => (
        <Container fluid className="container-xxl ">
          <Carousel>
         { settingdetails && settingdetails.banner_images? 
            settingdetails.banner_images.map((banner) => (
            <Carousel.Item interval={1000} className=" banner-img rounded-border">
              <BannerImage
                image={
                  settingdetails ? banner.image : img
                }
              />
            </Carousel.Item>
                ))
               : (
                <></>
              )}
          </Carousel>
        </Container>
        //  ))
  
  );
}

export default Banner;
