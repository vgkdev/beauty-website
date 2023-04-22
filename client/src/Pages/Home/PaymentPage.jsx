import {
  Badge,
  Box,
  Button,
  Divider,
  HStack,
  Input,
  Select,
  Spacer,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";
import { AddIcon, ArrowRightIcon, CloseIcon } from "@chakra-ui/icons";
import { useEffect, useState } from "react";
import axios from "axios";
import { dataUrl } from "../../share";
import { Navigate, useNavigate } from "react-router-dom";
import CartSingleCard from "./CartSingleCard";
import "../../Components/SignUp/SignUp.css";
import { ToastContainer, toast } from "react-toastify";
import { useSelector } from "react-redux";
import { getAllCartsByUserIdService } from "../../api/cartApi";
import { Buffer } from "buffer";
import { convertPrice } from "../../Utils/convertData";
import { animateScroll as scroll } from "react-scroll";
import { createPaymentService } from "../../api/paymentApi";
// import { vnpay } from "../../index.mjs";

const PaymentPage = () => {
  const [cartData, setCartData] = useState([]);
  const [total, setTotal] = useState(0);
  const [dis, setDis] = useState(10);
  const [sub, setSub] = useState(20);
  const [changeone, setchangeone] = useState(0);

  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [confirmpass, setConfirmPass] = useState("");

  const navigate = useNavigate();
  const user = useSelector((state) => state.user.user);
  if (!user) {
    navigate("/login");
  }

  console.log(cartData);
  // const getPro = () => {
  //   axios
  //     .get(`${dataUrl}/order`)
  //     .then((res) => setPro(res.data))
  //     .catch((er) => console.log(er));
  // };
  // const delPro = (id) => {
  //   axios
  //     .delete(`${dataUrl}/order/delete/${id}`)
  //     .then((res) => {
  //       toast.success("Remove successfully");
  //       setchangeone((pre) => pre + 1);
  //     })
  //     .catch((er) => console.log(er));
  // };
  const cheakout = () => {
    if (
      firstname === "" ||
      lastname === "" ||
      email === "" ||
      password === "" ||
      phone === "" ||
      confirmpass === ""
    ) {
      toast.error("Fill all details");
    } else {
      // axios
      //   .delete(`${dataUrl}/order/delete`)
      //   .then((res) => {
      //     toast.success("Order Suceccesfull");
      //     navigate("/");
      //     setchangeone((pre) => pre + 1);
      //   })
      //   .catch((er) => console.log(er));
    }
  };

  useEffect(() => {
    scroll.scrollToTop();
  }, []);

  useEffect(() => {
    setTimeout(() => {
      getCartData();
    }, [1000]);
    const getCartData = async () => {
      if (user && user.id) {
        const response = await getAllCartsByUserIdService(user.id);
        if (response.data.errCode === 0) {
          const carts = response.data.cart;
          for (let i = 0; i < carts.length; i++) {
            const products = carts[i].Product;
            const buffer = products.imageUrl;
            const base64String = new Buffer(buffer, "base64").toString(
              "base64"
            );
            carts[i].Product.imageUrl = base64String;
          }
          setCartData(carts);
        }
      }
    };
  }, [user]);

  useEffect(() => {
    setTotal(0);
    cartData &&
      cartData.map((el, i) => {
        setTotal((prev) => prev + el.quantity * el.Product.price);
      });
  }, [cartData]);

  const handleOrder = async () => {
    const payload = {
      amount: total,
      orderId: 2,
      orderInfo: "Test order",
      clientIp: "127.0.0.1",
    };

    const response = await createPaymentService(payload);
    console.log("check res: ", response);
    window.location.href = response.data;
  };

  console.log("check cart data: ", cartData);

  return (
    <div>
      <VStack marginTop={{ base: "220px", md: "180px" }} justify="center">
        <Text fontSize="2xl" fontWeight="extrabold">
          My Bag {cartData.length} item(S)
        </Text>

        <Stack
          direction={{ base: "column", sm: "row" }}
          padding={10}
          spacing={50}
        >
          {/* information */}
          <VStack spacing={5}>
            <div className="input_div_main">
              <div>
                <div className="input_heading">THÔNG TIN CÁ NHÂN</div>
                <form>
                  <div className="name_div">
                    <div className="name">
                      <label>
                        First Name<span> *</span>
                      </label>
                      <br />
                      <Input
                        type="text"
                        style={{ paddingLeft: "10px" }}
                        value={user.firstName}
                        name="name"
                        onChange={(e) => setFirstname(e.target.value)}
                        required
                      />
                    </div>
                    <div className="name">
                      <label>
                        Last Name<span> *</span>
                      </label>
                      <br />
                      <Input
                        type="text"
                        value={user.lastName}
                        style={{ paddingLeft: "10px" }}
                        onChange={(e) => setLastname(e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div className="input_details">
                    <label>
                      Email<span> *</span>
                    </label>
                    <br />
                    <Input
                      type="email"
                      value={user.email}
                      style={{ paddingLeft: "10px" }}
                      name="name"
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  <div className="input_details">
                    <label>
                      Address<span> *</span>
                    </label>
                    <br />
                    <Input
                      type="text"
                      value={user.address}
                      style={{ paddingLeft: "10px" }}
                      name="number"
                      onChange={(e) => setPhone(e.target.value)}
                      required
                    />
                  </div>
                  <div className="input_details">
                    <label>
                      Phone<span> *</span>
                    </label>
                    <br />
                    <Input
                      type="number"
                      value={user.phoneNumber}
                      style={{ paddingLeft: "10px" }}
                      name="password"
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>

                  <div className="input_details">
                    <label>
                      Phương thức thanh toán<span> *</span>
                    </label>
                    <br />
                    <Select placeholder="---Chọn phương thức thanh toán---">
                      <option value="option2">Thanh toán khi nhận hàng</option>
                      <option value="option3">VNPay</option>
                    </Select>
                  </div>
                </form>
              </div>
            </div>
          </VStack>
          {/* end information */}

          <VStack spacing={5}>
            <Stack
              bg="gray.200"
              w={{ base: 300, sm: 600 }}
              spacing={3}
              borderWidth="1px"
              overflow="hidden"
              padding="5"
              textAlign="center"
            >
              <Text fontWeight="bold" fontSize="20px">
                TỔNG GIÁ
              </Text>{" "}
            </Stack>

            <VStack
              fontSize="16px"
              padding="5"
              w={{ base: 300, sm: 600 }}
              spacing={5}
              borderWidth="1px"
              overflow="hidden"
            >
              <HStack w="full">
                <Text fontSize={{ base: "15px", md: "18px" }}>
                  Tổng giá sản phẩm (đã bao gồm thuế)
                </Text>
                <Spacer />
                <Text fontWeight="bold" fontSize={{ base: "15px", md: "18px" }}>
                  {convertPrice(total)}
                </Text>
              </HStack>

              <HStack w="full">
                <Text fontSize={{ base: "15px", md: "18px" }}>
                  Phí vận chuyển
                </Text>
                <Spacer />
                <Text
                  fontWeight="bold"
                  color="green.500"
                  fontSize={{ base: "15px", md: "18px" }}
                >
                  + 0đ
                </Text>
              </HStack>

              <HStack w="full">
                <Text fontSize={{ base: "15px", md: "18px" }}>Giảm giá</Text>
                <Spacer />
                <Text fontWeight="bold" fontSize={{ base: "15px", md: "18px" }}>
                  - {convertPrice(Math.floor((total / 100) * 10))}
                </Text>
              </HStack>

              <HStack w="full">
                <Text fontSize={{ base: "15px", md: "18px" }}>Tổng </Text>
                <Spacer />
                <Text fontWeight="bold" fontSize={{ base: "15px", md: "18px" }}>
                  {convertPrice(Math.floor(total - (total / 100) * 10))}
                </Text>
              </HStack>

              <Badge
                overflow="hidden"
                borderRadius="2xl"
                fontSize={{ base: "15px", md: "lg" }}
                padding="5px 20px"
                w="full"
                variant="subtle"
                color="gray.800"
                colorScheme="green"
                textAlign={"center"}
              >
                Bạn đang tiết kiệm{" "}
                {convertPrice(Math.floor((total / 100) * 10))} trên đơn hàng này
              </Badge>
            </VStack>

            <Stack
              direction={{ base: "column", md: "row" }}
              w="full"
              padding="5"
            >
              <Text
                w={{ base: "full", md: "50%" }}
                fontSize="2xl"
                fontWeight="bold"
              >
                {convertPrice(Math.floor(total - (total / 100) * 10))}
              </Text>

              <Divider w="10%" orientation="vertical" />

              <Button
                w="full"
                colorScheme="whatsapp"
                color="white"
                size="lg"
                onClick={handleOrder}
              >
                Đặt hàng
              </Button>
            </Stack>

            <Divider />
            <Divider />
            <Divider />
          </VStack>
        </Stack>
      </VStack>
      <ToastContainer position="top-center" autoClose={3000} />
    </div>
  );
};
export default PaymentPage;
