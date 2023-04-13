import { Box, Text, Image } from "@chakra-ui/react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import Hotdeals from "./Hotdeals";
import { NavLink } from "react-router-dom";

// import { Images } from "./Data";
import { useEffect, useState } from "react";
import BestSeller from "./BestSeller";
import axios from "axios";
import { IoIosMenu } from "react-icons/io";
import React from "react";
import { dataUrl } from "../../share";
import banner1 from "../../assets/images/banner1.jpg";
import banner2 from "../../assets/images/banner2.jpg";
import banner3 from "../../assets/images/banner3.jpg";
import banner4 from "../../assets/images/banner4.jpg";
import banner5 from "../../assets/images/banner5.jpg";
import banner6 from "../../assets/images/banner6.jpg";

const Home = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    autoplay: true,
    autoplaySpeed: 2000,
    slidesToShow: 1,
    slidesToScroll: 1,
    cssEase: "linear",
  };
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get(`${dataUrl}/products/`)
      .then((res) => setData(res.data))
      .catch((er) => console.log(er));
  }, []);

  useEffect(() => {
    console.log("data------", data);
  }, [data]);

  return (
    <>
      {/* menu */}
      <Box
        w="90%"
        m="auto"
        mt="40px"
        display={["inline", "flex", "flex"]}
        p="2px"
        justifyContent="space-between"
        border="0.3px solid grey"
        style={{ zIndex: "-100" }}
      >
        <Box
          ml={["16px", "16px", "16px"]}
          display={["none", "block", null, null, null]}
          width={["80%", "35%", "27%"]}
        >
          <Box display="flex" p={["5px 10px", "2px 2px", "2px 9px"]}>
            <Box>
              <IoIosMenu size="24px"></IoIosMenu>
            </Box>
            <Box>
              <Text
                marginLeft="3px"
                pt={["2px", "3px", "0px"]}
                fontWeight="bold"
                fontSize={["13px", "12px", "16px"]}
              >
                ALL CATEGORIES
              </Text>
            </Box>
          </Box>
          <Box display="flex" p={["1px 10px", "1px 4px", "4px 11px"]}>
            <Box>
              <Image
                width={["69%", "68%", "78%"]}
                marginRight="5px"
                src="https://www.beautybebo.com/pub/media/wysiwyg/menu-icons/makeup-small.png"
              />
            </Box>
            <NavLink to="/skin">
              <Box>
                <Text fontSize={["12px", "12px", "15px"]}>Make Up</Text>
              </Box>
            </NavLink>
          </Box>
          <Box display="flex" p={["1px 10px", "1px 4px", "4px 11px"]}>
            <Box>
              <Image
                width={["69%", "68%", "78%"]}
                marginRight="5px"
                src="https://www.beautybebo.com/pub/media/wysiwyg/menu-icons/skin-small.png"
              />
            </Box>
            <NavLink to="/skin">
              <Box>
                <Text fontSize={["12px", "12px", "15px"]}>Hair</Text>
              </Box>
            </NavLink>
          </Box>
          <Box display="flex" p={["1px 10px", "1px 4px", "4px 11px"]}>
            <Box>
              <Image
                width={["69%", "68%", "78%"]}
                marginRight="5px"
                src="https://www.beautybebo.com/pub/media/wysiwyg/menu-icons/hair-small.png"
              />
            </Box>
            <NavLink to="/skin">
              <Box>
                <Text fontSize={["12px", "12px", "15px"]}>Skin Care</Text>
              </Box>
            </NavLink>
          </Box>
          <Box display="flex" p={["1px 10px", "1px 4px", "4px 11px"]}>
            <Box>
              <Image
                width={["69%", "68%", "78%"]}
                marginRight="5px"
                src="https://www.beautybebo.com/pub/media/wysiwyg/menu-icons/personal-care-small.png"
              />
            </Box>
            <NavLink to="/skin">
              <Box>
                <Text fontSize={["12px", "12px", "15px"]}>Personal Care</Text>
              </Box>
            </NavLink>
          </Box>

          <Box display="flex" p={["1px 10px", "1px 4px", "4px 11px"]}>
            <Box>
              <Image
                width={["69%", "68%", "78%"]}
                marginRight="5px"
                src="https://www.beautybebo.com/pub/media/fragrance.png"
              />
            </Box>
            <NavLink to="/skin">
              <Box>
                <Text fontSize={["12px", "12px", "15px"]}>Fragnance</Text>
              </Box>
            </NavLink>
          </Box>
          <Box display="flex" p={["1px 10px", "1px 4px", "4px 11px"]}>
            <Box>
              <Image
                width={["69%", "68%", "78%"]}
                marginRight="5px"
                src="https://www.beautybebo.com/pub/media/ayurveda.png"
              />
            </Box>
            <NavLink to="/skin">
              <Box>
                <Text fontSize={["12px", "12px", "15px"]}>Ayurveda</Text>
              </Box>
            </NavLink>
          </Box>
        </Box>
        <Box
          p="0.5px"
          margin="auto"
          width={["89%", "73%", "73%"]}
          style={{ zIndex: "-100" }}
        >
          <Slider {...settings}>
            <Box>
              <Image w={"100%"} /*h={"500px"}*/ src={banner1} />
            </Box>
            <Box>
              <Image w={"100%"} /*h={"500px"}*/ src={banner2} />
            </Box>
          </Slider>
        </Box>
      </Box>

      <Hotdeals dt={data} />
      <br />
      <Box w="90%" m="auto">
        <Image w="100%" src={banner3} />
      </Box>

      <br />
      <BestSeller />
      <br />
      <Box w="90%" m="auto">
        <Image w="100%" src={banner4}></Image>
      </Box>

      <br />
      <Box w="90%" m="auto">
        <Image w="100%" src={banner5}></Image>
      </Box>

      <br />
      <Box w="90%" m="auto">
        <Image w="100%" src={banner6}></Image>
      </Box>
      <br />
    </>
  );
};
export default React.memo(Home);
