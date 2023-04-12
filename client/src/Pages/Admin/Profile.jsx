import {
  Box,
  Divider,
  Flex,
  Image,
  Spacer,
  Text,
  useToast,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@chakra-ui/react";
import { useMedia } from "../../MediaQuery/UseMedia";
import { useEffect, useState } from "react";
import MyRoutine from "./MyRoutine";
import Loading from "../../Components/Loading";
import LogsPage from "./LogsPage";
import Reports from "./Reports";
import Photos from "./Photos";
import Exercises from "./Exercises";
import Messages from "./Messages";
import { Link } from "react-router-dom";
import axios from "axios";
import Dashboard from "./Dashboard";
import "./profile.css";
import { dataUrl } from "../../share";
import {
  createNewUserService,
  deleteUserService,
  editUserService,
  getAllUsersService,
} from "../../api/userApi";
import FormUser from "./Comp/FormUser";

const init1 = {
  routines: false,
  logs: false,
  reports: false,
  photos: false,
  exercises: false,
  messages: false,
};

export const Profile = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [change, setChange] = useState(0);
  const { smallScreen, mediumScreen } = useMedia();
  const [section, setSection] = useState({ ...init1, routines: true });
  const { routines, logs, reports, photos, exercises, messages } = section;
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  /* dashboard */
  const [users, setUsers] = useState([]);
  const [admins, setAdmins] = useState([]);
  const [products, setProducts] = useState([]);
  const [carts, setCarts] = useState([]);
  const [userDetailInModal, setUserDetailInModal] = useState(null);
  const [modalType, setModalType] = useState("");

  useEffect(() => {
    let newId = setTimeout(() => {
      getUser();
      getProducts();
      getCart();
    }, 1000);
  }, [change]);

  useEffect(() => {
    let admin = users.filter((el) => {
      return el.role !== "user";
    });
    setAdmins(admin);
  }, [users]);

  const handleShowModalUser = (id, type) => {
    if (type !== "Create") {
      const user = users.filter((users) => users.id === id);
      console.log("check id is showed: ", user[0]);
      console.log("check type: ", type);
      setUserDetailInModal(user[0]);
    } else {
      setUserDetailInModal(null);
    }

    setModalType(type);
    onOpen();
  };

  const printS = (mess) => {
    toast({
      title: typeof mess == "string" ? mess : "Successful",
      description: "Request successful",
      status: "success",
      duration: 4000,
      isClosable: true,
    });
  };

  const printF = (mess) => {
    toast({
      title: mess || "Failed",
      description: "Request Failed",
      status: "error",
      duration: 4000,
      isClosable: true,
    });
  };

  const changePages = (value) => {
    setSection({ ...init1 });
    setLoading(true);

    setTimeout(() => {
      setSection({ ...init1, [value]: true });
      setLoading(false);
    }, 3500);
  };

  function changeIt() {
    setChange((prev) => prev + 1);
  }

  const getUser = async () => {
    // axios
    //   .get(`${dataUrl}/users/`)
    //   .then((res) => {
    //     setUsers(res.data);
    //   })
    //   .catch((e) => printF(e?.response?.data || e.message));

    const response = await getAllUsersService();
    if (response.data.errCode === 0) {
      setUsers(response.data.user);
      printS(response.data.message);
    } else {
      printF(response.data.message);
    }
    console.log("check data from server: ", response);
  };

  const editUser = async (data) => {
    // console.log("check data edit: ", data);
    const response = await editUserService(data);
    if (response.data.errCode === 0) {
      // console.log("check user edit: ", response.data.user);
      setUsers(response.data.user);
      printS(response.data.message);
    } else {
      printF(response.data.message);
    }
    onClose();
  };

  const createNewUser = async (data) => {
    console.log("check data: ", data);
    const response = await createNewUserService(data);
    // console.log("check res create new user: ", response);
    if (response.data.errCode === 0) {
      // console.log("check user edit: ", response.data.user);
      setUsers(response.data.user);
      printS(response.data.message);
    } else {
      printF(response.data.message);
    }
    onClose();
  };

  const deleteUser = async (id) => {
    const response = await deleteUserService(id);
    if (response.data.errCode === 0) {
      // console.log("check user edit: ", response.data.user);
      setUsers(response.data.user);
      printS(response.data.message);
    } else {
      printF(response.data.message);
    }
  };

  const getProducts = async () => {
    // axios
    //   .get(`${dataUrl}/products`)
    //   .then((res) => {
    //     setProducts(res.data);
    //   })
    //   .catch((e) => printF(e?.response?.data || e.message));
  };
  const getCart = async () => {
    // axios
    //   .get(`${dataUrl}/carts/allcarts/sujeet`, { withCredentials: true })
    //   .then((res) => {
    //     console.log(res.data);
    //     setCarts(res.data);
    //   })
    //   .catch((e) => printF(e?.response?.data || e.message));
  };

  /* user modal start */
  const deleteFun = async (email) => {
    // axios
    //   .delete(`${dataUrl}/users/`)
    //   .then((res) => {
    //     console.log(res.data);
    //     printS(res.data);
    //     changeIt();
    //   })
    //   .catch((e) => printF(e?.response?.data || e.message));
  };

  const changeRole = async (email, role) => {
    // axios
    //   .post(`${dataUrl}/users/`)
    //   .then((res) => {
    //     console.log(res.data);
    //     printS(res.data);
    //     changeIt();
    //   })
    //   .catch((e) => printF(e?.response?.data || e.message));
  };

  const userBan = async (email, status) => {
    // axios
    //   .post(`${dataUrl}/users/ban/${email}/${status}`, {
    //     withCredentials: true,
    //   })
    //   .then((res) => {
    //     console.log(res.data);
    //     printS(res.data);
    //     changeIt();
    //   })
    //   .catch((e) => printF(e?.response?.data || e.message));
  };
  /* user modal end */

  /* ================== */

  /* product modal start */
  const deletePro = async (id) => {
    // axios
    //   .delete(`${dataUrl}/products/delete/${id}`)
    //   .then((res) => {
    //     console.log(res.data);
    //     printS(res.data);
    //     changeIt();
    //   })
    //   .catch((e) => printF(e?.response?.data || e.message));
  };

  /* product modal end */

  /* ================ */

  /* cart modal start */
  const cartChange = async (id) => {
    // axios
    //   .patch(`${dataUrl}/carts/${id}`, { withCredentials: true })
    //   .then((res) => {
    //     console.log(res.data);
    //     printS(res.data);
    //     changeIt();
    //   })
    //   .catch((e) => printF(e?.response?.data || e.message));
  };

  return (
    <>
      <Box
        className="main_room"
        fontWeight="500"
        m="auto"
        w={mediumScreen ? "95%" : "90%"}
      >
        {/* Modal detail */}
        <Modal onClose={onClose} size={"lg"} isOpen={isOpen}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>{modalType} user</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <FormUser
                user={userDetailInModal}
                type={modalType}
                handleEditUser={editUser}
                handleCreateUser={createNewUser}
              />
            </ModalBody>
            <ModalFooter>
              <Button onClick={onClose}>Close</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>

        <Text mt="100px" fontSize={"5xl"} color="#00ff2a">
          Admin Management Page
        </Text>

        <Flex mt="10px" direction={!mediumScreen ? "column" : "row"}>
          {/* menu */}
          <Box m="auto" w={["96%", "96%", "20%", "17%"]} mt="50px">
            <Flex
              mb="7px"
              onClick={() => changePages("routines")}
              style={{ cursor: "pointer" }}
            >
              <Image
                w="20px"
                mr="5px"
                src="https://www.jefit.com/images/routine_icon_64_64.png"
              />
              <Text fontSize="sm"> All Users </Text>
            </Flex>
            <Divider
              mt="3px"
              mb="3px"
              orientation="horizontal"
              style={{ color: "red", size: "20" }}
            />

            <Flex
              mb="7px"
              onClick={() => changePages("logs")}
              style={{ cursor: "pointer" }}
            >
              <Image
                w="20px"
                mr="5px"
                src="https://www.jefit.com/images/main_menu_logs_70_70.png"
              />
              <Text fontSize="sm"> All Products </Text>
            </Flex>
            <Divider mt="3px" mb="3px" orientation="horizontal" />
            <Flex
              mb="7px"
              onClick={() => changePages("reports")}
              style={{ cursor: "pointer" }}
            >
              <Image
                w="20px"
                mr="5px"
                src="https://www.jefit.com/images/training_reports_icon_70_70.png"
              />
              <Text fontSize="sm"> All Orders </Text>
            </Flex>
            <Divider
              mt="3px"
              mb="3px"
              orientation="horizontal"
              style={{ cursor: "pointer" }}
            />
            <Flex
              mb="7px"
              onClick={() => changePages("photos")}
              style={{ cursor: "pointer" }}
            >
              <Image
                w="20px"
                mr="5px"
                src="https://www.jefit.com/images/pictureicon.png"
              />
              <Text fontSize="sm"> Add Product </Text>
            </Flex>
            <Divider mt="3px" mb="3px" orientation="horizontal" />
            <Flex
              mb="7px"
              onClick={() => changePages("exercises")}
              style={{ cursor: "pointer" }}
            >
              <Image
                w="20px"
                mr="5px"
                src="https://www.jefit.com/images/exercise_icon3_64_64.png"
              />
              <Text fontSize="sm"> Add User </Text>
            </Flex>
            <Divider mt="3px" mb="3px" orientation="horizontal" />
            <Flex
              mb="7px"
              onClick={() => changePages("messages")}
              style={{ cursor: "pointer" }}
            >
              <Image
                w="20px"
                mr="5px"
                src="https://www.jefit.com/images/message_icon.png"
              />
              <Text fontSize="sm"> My Details </Text>
            </Flex>
          </Box>

          <Spacer />
          {/* show data */}
          <Box
            m="auto"
            w={["96%", "95%", "55%", "55%"]}
            style={{ lineHeight: "40px" }}
            textAlign="center"
            mt="50px"
            fontSize="xl"
          >
            {loading && <Loading />}
            {routines && (
              <MyRoutine
                deleteFun={deleteFun}
                users={users}
                changeRole={changeRole}
                userBan={userBan}
                handleShowModalUser={handleShowModalUser}
                handleDeleteUser={deleteUser}
              />
            )}
            {logs && <LogsPage products={products} deletePro={deletePro} />}
            {reports && <Reports carts={carts} cartChange={cartChange} />}
            {photos && <Photos />}
            {exercises && <Exercises />}
            {messages && <Messages />}
            {/* <Button style={{ margin: "0 auto" }} colorScheme="whatsapp">
              Add new user
            </Button> */}
          </Box>

          <Spacer />
          {/* total of each data */}
          <Box textAlign="center" w={["95%", "95%", "20%", "20%"]} mt="50px">
            <Dashboard
              users={users}
              admins={admins}
              products={products}
              carts={carts}
            />
          </Box>
        </Flex>
      </Box>
      {/* <BoxCrouser/>  */}
    </>
  );
};

//ghfghgf
