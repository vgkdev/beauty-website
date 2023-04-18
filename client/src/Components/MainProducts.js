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
export function MainProducts(props) {
  const { setnav, setState } = props;
  // console.log("check product from main products: ", props);
  return (
    <Box
      // onMouseEnter={() => {
      //   setnav(true);
      //   setState(true);
      // }}
      // onMouseLeave={() => {
      //   // setnav(false);
      //   // setState(true);
      // }}
      border={"1px solid #757491"}
      borderRadius={"5px"}
      maxW={"270"}
    >
      <Card size="sm">
        <CardBody>
          <Image
            margin={"0 auto"}
            alignItems={"center"}
            style={{ zIndex: "1000" }}
            objectFit="contain"
            boxSize="130"
            src={`data:image/jpeg;base64,${props.image}`}
            alt="product-img"
          />
          <Stack mt="6" spacing="3">
            <Heading size="md">{props.name}</Heading>
            <Text fontSize="sm">{props.description}</Text>
            <Text color="blue.600" fontSize="md">
              {props.price}đ
            </Text>
          </Stack>
        </CardBody>
        <Divider />
        <CardFooter>
          <ButtonGroup spacing="2">
            <Button size={"sm"} variant="solid" colorScheme="blue">
              Buy now
            </Button>
            <Button size={"sm"} variant="ghost" colorScheme="blue">
              Add to cart
            </Button>
          </ButtonGroup>
        </CardFooter>
      </Card>
    </Box>
  );
}
