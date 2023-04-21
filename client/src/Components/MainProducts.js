import { FaShoppingCart, FaRegBookmark, FaStar } from "react-icons/fa";
import {
  Card,
  CardBody,
  Stack,
  Heading,
  Text,
  Divider,
  CardFooter,
  ButtonGroup,
  Button,
  Box,
  Container,
} from "@chakra-ui/react";
import "./Products/Products.css";
import { Image } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { BsSuitHeartFill, BsFillCartPlusFill } from "react-icons/bs";
import { useSelector } from "react-redux";
import { createNewCartService } from "../api/cartApi";
import { toast } from "react-toastify";

export function MainProducts(props) {
  const { setnav, setState } = props;

  const navigate = useNavigate();
  const user = useSelector((state) => state.user.user);

  // console.log("check props: ", props);

  const handleMouseEnter = (e) => {
    e.currentTarget.style.boxShadow = "0px 4px 30px rgba(0, 0, 0, 0.25)";
  };

  const handleMouseLeave = (e) => {
    e.currentTarget.style.boxShadow = "";
  };

  const handleAddToCart = async () => {
    const payload = {
      userId: user.id,
      productId: props.id,
      quantity: 1,
    };

    // console.log("check payload: ", payload);
    const response = await createNewCartService(payload);
    if (response.data.errCode === 0) {
      toast.success("Đã thêm vào giỏ hàng");
      console.log("add success");
    } else {
      toast.error("Lỗi không thêm được vào giỏ hàng");
    }
    console.log("check add to cart: ", response);
  };

  return (
    <Box
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      border={"1px solid #e7e7e7"}
      borderRadius={"5px"}
      // maxW={"270"}
      width={"270"}
      display={"flex"}
      flexDirection={"row"}
      justifyContent={"space-between"}
    >
      <Card size="sm" width={"100%"}>
        <CardBody
          cursor={"pointer"}
          onClick={() => {
            navigate(`/product/${props.id}`);
            if (setnav) setnav(false);
          }}
        >
          <Image
            margin={"0 auto"}
            alignItems={"center"}
            style={{ zIndex: "1000" }}
            objectFit="contain"
            boxSize="170"
            src={`data:image/jpeg;base64,${props.image}`}
            alt="product-img"
          />
          <Stack mt="6" spacing="2">
            <Heading size="md">{props.name}</Heading>
            <Text fontSize="sm">{props.description}</Text>
            <Text color="blue.600" fontSize="sm">
              {props.price}đ
            </Text>
          </Stack>
        </CardBody>

        <Divider borderColor={"silver"} />

        <CardFooter>
          <ButtonGroup spacing="2">
            <Button
              bgColor={"#6bc6d9"}
              color={"#ffffff"}
              onClick={handleAddToCart}
              mb={4}
              mr={3}
            >
              <BsFillCartPlusFill style={{ marginRight: "5px" }} />
            </Button>
            <Button bgColor={"#6bc6d9"} color={"#ffffff"} mb={4}>
              <BsSuitHeartFill />
            </Button>
          </ButtonGroup>
        </CardFooter>
      </Card>
    </Box>
  );
}
