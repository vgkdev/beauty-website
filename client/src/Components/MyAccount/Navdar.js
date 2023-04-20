import React, { useEffect, useState } from "react";
import { FiSearch } from "react-icons/fi";
import "./Responsive.css";
import { BsSuitHeartFill, BsPersonFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import logo1 from "../../assets/images/logo-app.png";
import {
  Image,
  Text,
  Menu,
  MenuList,
  MenuItem,
  MenuButton,
  Button,
  Box,
} from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../reducers/user";
export default function Navdar() {
  const [loginDropDown, setloginDropDown] = useState(false);
  const [loginDropDown2, setloginDropDown2] = useState(false);
  const [userNmae, setUserName] = useState("");

  const dispatch = useDispatch();

  const user = useSelector((state) => state.user.user);
  useEffect(() => {
    if (user) setUserName(user.firstName + " " + user.lastName);
  }, [user]);

  const doIt = () => {
    setloginDropDown(false);
    setloginDropDown2(false);
  };

  const data = [
    "All Categories",
    "--Make up",
    "----Face",
    "------Foundation",
    "------Blush",
    "------Highlighter",
    "------Concealer",
    "------Compact & Powder",
    "------Face Primer",
    "------Makeup Remover",
    "------Bronzer",
    "------BB Cream",
    "------Loose Powder",
    "------Setiig Spray",
    "------Makeup Kit",
    "------CC Cream",
  ];
  return (
    <div className="mid_nav_main" style={{ backgroundColor: "#6bc6d9" }}>
      <div className="mid_nav_mid">
        <div className="mid_nav_first">
          {/* logo */}
          <div style={{ width: "30%", paddingLeft: "5%", marginTop: "-15px" }}>
            <Link to={"/"}>
              <Image alt="logo" objectFit={"contain"} src={logo1} />{" "}
            </Link>
          </div>
          {/* end logo */}

          <div className="logo_div">
            <div
              className="user"
              onClick={() => setloginDropDown2(!loginDropDown2)}
            >
              <BsPersonFill />
            </div>
            {loginDropDown2 ? (
              <>
                <div id="content_dropdown2" onMouseOut={doIt}>
                  <Link to="/login">
                    <div
                      id="login_dropdown"
                      onClick={() => setloginDropDown2(!loginDropDown2)}
                    >
                      Login
                    </div>
                  </Link>
                  <Link to="/signup">
                    <div
                      id="register_dropdown"
                      onClick={() => setloginDropDown2(!loginDropDown2)}
                    >
                      Register
                    </div>
                  </Link>
                </div>
              </>
            ) : null}
          </div>

          {/* search bar */}
          <div className="search_div">
            <select className="select">
              <option>All Categories</option>
              {data.map((item, index) => (
                <option key={index} value="option1">
                  {item}
                </option>
              ))}
            </select>
            <input className="input" type="search" style={{ border: "none" }} />
            <div
              className="search_icon"
              style={{ backgroundColor: "#ffffff", color: "black" }}
            >
              <FiSearch />
            </div>
          </div>
          {/* end search bar */}
        </div>

        {/* user */}
        <div className="mid_nav_sec">
          <Button backgroundColor={"#6bc6d9"}>
            <div
              style={{
                fontSize: "20px",
                color: "#ffffff",
              }}
            >
              <BsSuitHeartFill />
            </div>
          </Button>

          <Menu autoSelect={false}>
            <MenuButton backgroundColor={"#6bc6d9"} as={Button}>
              <div
                style={{
                  fontSize: "20px",
                  color: "#ffffff",
                }}
              >
                <BsPersonFill />
              </div>
            </MenuButton>

            <Box style={{ zIndex: "10000" }}>
              <MenuList>
                {user ? (
                  <MenuItem
                    minH="40px"
                    // id="register_dropdown"
                    backgroundColor={"none"}
                    onClick={() => {
                      setloginDropDown(!loginDropDown);
                      localStorage.removeItem("UserToken");
                      dispatch(logoutUser());
                    }}
                  >
                    Log Out
                  </MenuItem>
                ) : (
                  <>
                    <Link to="/login">
                      <MenuItem
                        minH="40px"
                        onClick={() => setloginDropDown(!loginDropDown)}
                      >
                        Login
                      </MenuItem>
                    </Link>
                    <Link to="/signup">
                      <MenuItem
                        minH="40px"
                        onClick={() => setloginDropDown(!loginDropDown)}
                      >
                        Register
                      </MenuItem>
                    </Link>
                  </>
                )}
              </MenuList>
            </Box>
          </Menu>
          {user ? <Text fontWeight={"bold"}>{userNmae}</Text> : ""}
          {/* <div style={{ display: "flex", cursor: "pointer" }}>
            <div
              className="user_div"
              onClick={() => setloginDropDown(!loginDropDown)}
            >
              <BsPersonFill />
            </div>
            {loginDropDown ? (
              <>
                <div id="content_dropdown">
                  {user ? (
                    <div
                      id="register_dropdown"
                      onClick={() => {
                        setloginDropDown(!loginDropDown);
                        localStorage.removeItem("UserToken");
                        dispatch(logoutUser());
                      }}
                    >
                      Log Out
                    </div>
                  ) : (
                    <>
                      <Link to="/login">
                        <div
                          id="login_dropdown"
                          onClick={() => setloginDropDown(!loginDropDown)}
                        >
                          Login
                        </div>
                      </Link>
                      <Link to="/signup">
                        <div
                          id="register_dropdown"
                          onClick={() => setloginDropDown(!loginDropDown)}
                        >
                          Register
                        </div>
                      </Link>
                    </>
                  )}
                </div>
              </>
            ) : null}
            <div
              className="text"
              style={{ marginTop: "9px", marginLeft: "9px" }}
            >
              {user ? <Text fontWeight={"bold"}>{userNmae}</Text> : ""}
            </div>
          </div> */}
        </div>
        {/* end user */}
      </div>
    </div>
  );
}
