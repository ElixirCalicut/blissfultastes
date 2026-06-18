import { React} from "react";
import { Image } from "react-bootstrap";
import "../../styles/Custom.css";
import { IMAGE_BASEURL } from "../../data/Constants";

function BannerImage({ image }) {

  return (
    <>
      {image ? (
        <div>
          <Image
            src={IMAGE_BASEURL+ image}
            width={100}
            height={50}
            className=" banner-img rounded-border "
          />
        </div>
      ) : (
        <div>
          <Image src={IMAGE_BASEURL+image}   className=" banner-img rounded-border " />
        </div>
      )}
    </>
  );
}

export default BannerImage;
