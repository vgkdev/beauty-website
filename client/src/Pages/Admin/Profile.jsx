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
import Dashboard from "./Dashboard";
import "./profile.css";
import { FaUsers, FaWineBottle, FaClipboardList } from "react-icons/fa";
import { MdCategory } from "react-icons/md";
import {
  createNewUserService,
  deleteUserService,
  editUserService,
  getAllUsersService,
} from "../../api/userApi";
import FormUser from "./Comp/FormUser";
import AllCategories from "./AllCategories";
import {
  deleteCategoryService,
  editCategoryService,
  getAllCategoriesService,
} from "../../api/categoryApi";
import FormCategory from "./Comp/FormCategory";
import { createNewCategoryService } from "../../api/categoryApi";
import {
  createNewProductService,
  deleteProductService,
  editProductImageService,
  editProductService,
  getAllProductsService,
} from "../../api/productApi";

import ConvertImgToBase64 from "../../Utils/ConvertImgToBase64";
import { Buffer } from "buffer";
import FormProduct from "./Comp/FromProduct";

const init1 = {
  userSection: false,
  productSection: false,
  orderSection: false,
  categorySection: false,
  photos: false,
  exercises: false,
  messages: false,
};

export const Profile = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isModalUserOpen, setIsModalUserOpen] = useState(false);
  const [isModalCategoryOpen, setIsModalCategoryOpen] = useState(false);
  const [isModalProductOpen, setIsModalProductOpen] = useState(false);
  const [change, setChange] = useState(0);
  const { smallScreen, mediumScreen } = useMedia();
  const [section, setSection] = useState({ ...init1, userSection: true });
  const {
    userSection,
    productSection,
    orderSection,
    categorySection,
    photos,
    exercises,
    messages,
  } = section;
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  /* dashboard */
  const [users, setUsers] = useState([]);
  const [categories, setCategories] = useState([]);
  const [admins, setAdmins] = useState([]);
  const [products, setProducts] = useState([]);
  const [carts, setCarts] = useState([]);
  const [userDetailInModal, setUserDetailInModal] = useState(null);
  const [categoryDetailInModal, setCategoryDetailInModal] = useState(null);
  const [productDetailInModal, setProductDetailInModal] = useState(null);
  const [modalType, setModalType] = useState("");

  useEffect(() => {
    let newId = setTimeout(() => {
      getUser();
      getAllCategories();
      getAllProducts();
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
      const user = users.filter((value) => value.id === id);
      // console.log("check id is showed: ", user[0]);
      // console.log("check type: ", type);
      setUserDetailInModal(user[0]);
    } else {
      setUserDetailInModal(null);
    }

    setModalType(type);
    setIsModalUserOpen(true);
  };

  const handleShowModalCategory = (id, type) => {
    if (type !== "Create") {
      const category = categories.filter((value) => value.id === id);
      // console.log("check id is showed: ", user[0]);
      // console.log("check type: ", type);
      setCategoryDetailInModal(category[0]);
    } else {
      setCategoryDetailInModal(null);
    }

    setModalType(type);
    setIsModalCategoryOpen(true);
  };

  const handleShowModalProduct = (id, type) => {
    if (type !== "Create") {
      const product = products.filter((value) => value.id === id);
      setProductDetailInModal(product[0]);
    } else {
      setProductDetailInModal(null);
    }

    setModalType(type);
    setIsModalProductOpen(true);
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
    }, 3000);
  };

  function changeIt() {
    setChange((prev) => prev + 1);
  }

  const getUser = async () => {
    const response = await getAllUsersService();
    if (response.data.errCode === 0) {
      setUsers(response.data.user);
      printS(response.data.message);
    } else {
      printF(response.data.message);
    }
    // console.log("check data from server: ", response);
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
    setIsModalUserOpen(false);
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
    setIsModalUserOpen(false);
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

  // modal category

  const getAllCategories = async () => {
    const response = await getAllCategoriesService();
    if (response.data.errCode === 0) {
      console.log("check categories: ", response.data.category);
      setCategories(response.data.category);
      printS(response.data.message);
    } else {
      printF(response.data.message);
    }
  };

  const createNewCategory = async (data) => {
    const response = await createNewCategoryService(data);
    if (response.data.errCode === 0) {
      setCategories(response.data.category);
      printS(response.data.message);
    } else {
      printF(response.data.message);
    }
    setIsModalCategoryOpen(false);
  };

  const editCategory = async (data) => {
    const response = await editCategoryService(data);
    if (response.data.errCode === 0) {
      setCategories(response.data.category);
      printS(response.data.message);
    } else {
      printF(response.data.message);
    }
    setIsModalCategoryOpen(false);
  };

  const deleteCategory = async (id) => {
    const response = await deleteCategoryService(id);
    if (response.data.errCode === 0) {
      setCategories(response.data.category);
      printS(response.data.message);
    } else {
      printF(response.data.message);
    }
  };

  const getAllProducts = async () => {
    const response = await getAllProductsService();
    if (response.data.errCode === 0) {
      // console.log("chech img server: ", response.data.product[0].imageUrl);
      const products = response.data.product;
      for (let i = 0; i < products.length; i++) {
        // console.log("check image: ", products[i].imageUrl);
        const buffer = products[i].imageUrl;
        const base64String = new Buffer(buffer, "base64").toString("base64");
        products[i].imageUrl = base64String;
      }
      // console.log("check products: ", products);
      setProducts(products);
      printS(response.data.message);
    } else {
      printF(response.data.message);
    }
  };

  const handleCreateProduct = async (data) => {
    const response = await createNewProductService(data);
    if (response.data.errCode === 0) {
      const products = response.data.product;
      for (let i = 0; i < products.length; i++) {
        const buffer = products[i].imageUrl;
        const base64String = new Buffer(buffer, "base64").toString("base64");
        products[i].imageUrl = base64String;
      }
      // console.log("check products: ", products);
      setProducts(products);
      printS(response.data.message);
      setIsModalProductOpen(false);
    } else {
      printF(response.data.message);
    }
  };

  const editProduct = async (data) => {
    const response = await editProductService(data);
    if (response.data.errCode === 0) {
      const products = response.data.product;
      for (let i = 0; i < products.length; i++) {
        const buffer = products[i].imageUrl;
        const base64String = new Buffer(buffer, "base64").toString("base64");
        products[i].imageUrl = base64String;
      }
      // console.log("check products: ", products);
      setProducts(products);
      printS(response.data.message);
      setIsModalProductOpen(false);
    } else {
      printF(response.data.message);
    }
  };

  const editProductImage = async (data) => {
    const response = await editProductImageService(data);
    if (response.data.errCode === 0) {
      const products = response.data.product;
      for (let i = 0; i < products.length; i++) {
        const buffer = products[i].imageUrl;
        const base64String = new Buffer(buffer, "base64").toString("base64");
        products[i].imageUrl = base64String;
      }
      // console.log("check products: ", products);
      setProducts(products);
      printS(response.data.message);
      setIsModalProductOpen(false);
    } else {
      printF(response.data.message);
    }
  };

  const deleteProduct = async (id) => {
    const response = await deleteProductService(id);
    if (response.data.errCode === 0) {
      const products = response.data.product;
      for (let i = 0; i < products.length; i++) {
        const buffer = products[i].imageUrl;
        const base64String = new Buffer(buffer, "base64").toString("base64");
        products[i].imageUrl = base64String;
      }
      // console.log("check products: ", products);
      setProducts(products);
      printS(response.data.message);
      setIsModalProductOpen(false);
    } else {
      printF(response.data.message);
    }
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
        <Modal
          onClose={() => setIsModalUserOpen(false)}
          size={"lg"}
          isOpen={isModalUserOpen}
        >
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
              <Button onClick={() => setIsModalUserOpen(false)}>Close</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>

        <Modal
          onClose={() => setIsModalCategoryOpen(false)}
          size={"lg"}
          isOpen={isModalCategoryOpen}
        >
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>{modalType} category</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <FormCategory
                category={categoryDetailInModal}
                type={modalType}
                handleEditCategory={editCategory}
                handleCreateCategory={createNewCategory}
              />
            </ModalBody>
            <ModalFooter>
              <Button onClick={() => setIsModalCategoryOpen(false)}>
                Close
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>

        <Modal
          onClose={() => setIsModalProductOpen(false)}
          size={"lg"}
          isOpen={isModalProductOpen}
        >
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>{modalType} product</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <FormProduct
                product={productDetailInModal}
                categories={categories}
                type={modalType}
                handleEditProduct={editProduct}
                handleCreateProduct={handleCreateProduct}
                handleEditProductImage={editProductImage}
              />
            </ModalBody>
            <ModalFooter>
              <Button onClick={() => setIsModalProductOpen(false)}>
                Close
              </Button>
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
              onClick={() => changePages("userSection")}
              style={{ cursor: "pointer" }}
            >
              <FaUsers style={{ width: "20px", marginRight: "5px" }} />
              <Text fontSize="sm"> All Users </Text>
            </Flex>
            <Divider mt="3px" mb="3px" orientation="horizontal" />

            <Flex
              mb="7px"
              onClick={() => changePages("categorySection")}
              style={{ cursor: "pointer" }}
            >
              <MdCategory style={{ width: "20px", marginRight: "5px" }} />
              <Text fontSize="sm"> All Categories </Text>
            </Flex>
            <Divider mt="3px" mb="3px" orientation="horizontal" />

            <Flex
              mb="7px"
              onClick={() => changePages("productSection")}
              style={{ cursor: "pointer" }}
            >
              <FaWineBottle style={{ width: "20px", marginRight: "5px" }} />
              <Text fontSize="sm"> All Products </Text>
            </Flex>
            <Divider mt="3px" mb="3px" orientation="horizontal" />
            <Flex
              mb="7px"
              onClick={() => changePages("orderSection")}
              style={{ cursor: "pointer" }}
            >
              <FaClipboardList style={{ width: "20px", marginRight: "5px" }} />
              <Text fontSize="sm"> All Orders </Text>
            </Flex>

            <Divider mt="3px" mb="3px" orientation="horizontal" />
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
            {userSection && (
              <MyRoutine
                users={users}
                handleShowModalUser={handleShowModalUser}
                handleDeleteUser={deleteUser}
              />
            )}
            {categorySection && (
              <AllCategories
                categories={categories}
                handleShowModalCategory={handleShowModalCategory}
                handleDeleteCategory={deleteCategory}
              />
            )}
            {productSection && (
              <LogsPage
                products={products}
                handleShowModalProduct={handleShowModalProduct}
                handleDeleteProduct={deleteProduct}
              />
            )}
            {orderSection && <Reports carts={carts} cartChange={cartChange} />}
            {photos && <Photos />}
            {exercises && <Exercises />}
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
