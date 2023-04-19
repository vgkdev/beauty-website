import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Login.css";
import { useNavigate } from "react-router-dom";
import { loginUserService } from "../../api/userApi";
import { Button, Input } from "@chakra-ui/react";
import { loginUser } from "../../reducers/user";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  const loading = useSelector((state) => state.user.loading);
  const error = useSelector((state) => state.user.error);

  const navigate = useNavigate();

  const pay = {
    email,
    password,
  };

  const onLogin = async () => {
    if (email === "" || password === "") {
      toast.error("Nhập thiếu thông tin!");
    } else {
      // const response = await loginUserService(pay);
      // // console.log("check login user: ", response);
      // if (response.data.errCode === 0) {
      //   localStorage.setItem("UserToken", JSON.stringify(response.data.user));
      //   toast.success("Đăng nhập thành công");
      //   navigate("/");
      // } else {
      //   toast.error(response.data.message);
      // }
      dispatch(loginUser(pay, toast, navigate));
      // if (!loading) {
      //   console.log("check user when not loading: ", user);
      //   console.log("check err when not loading:", error);
      // }

      // if (error) {
      //   toast.error(error);
      // } else {
      //   localStorage.setItem("UserToken", JSON.stringify(user));
      //   toast.success("Đăng nhập thành công");
      //   navigate("/");
      // }
    }
  };
  return (
    <div>
      <div className="input_div_main">
        {/* sign in */}
        <div className="input_div">
          <div className="input_heading">REGISTERED CUSTOMERS</div>

          <div className="tit">
            If you have an account, sign in with your email address.
          </div>

          <div className="input_details">
            <label>
              Email<span> *</span>
            </label>
            <br />
            <Input
              placeholder="Enter your email"
              type="email"
              style={{ paddingLeft: "10px" }}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="input_details">
            <label>
              Password<span> *</span>
            </label>
            <br />
            <Input
              placeholder="Enter your password"
              type="password"
              style={{ paddingLeft: "10px" }}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="input_button">
            <Button colorScheme="blue" onClick={onLogin}>
              SIGN IN
            </Button>
            {/* <a href="#">Forgot Your Password?</a> */}
          </div>
        </div>
        {/* end sign in */}

        {/* create account */}
        <div className="register">
          <div className="input_heading">NEW CUSTOMERS</div>

          <div className="tit">
            Creating an account has many benefits: check out faster, keep more
            than one address, track orders and more.
          </div>
          <div className="input_button">
            <Link to="/signup">
              {" "}
              <Button colorScheme="blue">CREATE AN ACCOUNT</Button>
            </Link>
          </div>
        </div>
        {/* end create account */}
      </div>
      <ToastContainer position="top-center" autoClose={3000} />
    </div>
  );
}
