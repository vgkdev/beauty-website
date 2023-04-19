import React, { useEffect, useState } from "react";
import "./SignUp.css";
import { dataUrl } from "../../share";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { Button, Input } from "@chakra-ui/react";
import "react-toastify/dist/ReactToastify.css";

import axios from "axios";
import { createNewUserService, registerUserService } from "../../api/userApi";
import { registerUser } from "../../reducers/user";

export default function SingUp() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [confirmpass, setConfirmPass] = useState("");

  const payload = {
    firstName: firstName,
    lastName: lastName,
    phoneNumber: Number(phoneNumber),
    email: email,
    password: password,
    address: address,
  };

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onsubmit = async (e) => {
    e.preventDefault();
    if (
      firstName === "" ||
      lastName === "" ||
      phoneNumber === "" ||
      email === "" ||
      password === "" ||
      confirmpass === ""
    ) {
      toast.error("Nhập thiếu dữ liệu!");
    } else if (password !== confirmpass) {
      toast.error("Mật khẩu xác thực không chính xác!");
    } else {
      dispatch(registerUser(payload, toast, navigate));
    }
  };
  return (
    <div>
      <div className="input_div_main">
        <div className="input_div">
          <div className="input_heading">PERSONAL INFORMATION</div>

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
                  placeholder="Enter your first name"
                  onChange={(e) => setFirstName(e.target.value)}
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
                  style={{ paddingLeft: "10px" }}
                  placeholder="Enter your last name"
                  onChange={(e) => setLastName(e.target.value)}
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
                style={{ paddingLeft: "10px" }}
                placeholder="Enter your email"
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="input_details">
              <label>
                Password<span> *</span>
              </label>
              <br />
              <Input
                type="password"
                style={{ paddingLeft: "10px" }}
                placeholder="Enter your password"
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <div className="input_details">
              <label>
                Confirm Password<span> *</span>
              </label>
              <br />
              <Input
                type="password"
                placeholder="Confirm Password"
                style={{ paddingLeft: "10px" }}
                onChange={(e) => setConfirmPass(e.target.value)}
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
                style={{ paddingLeft: "10px" }}
                placeholder="Enter your phone"
                onChange={(e) => setPhoneNumber(e.target.value)}
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
                style={{ paddingLeft: "10px" }}
                placeholder="Enter your address"
                onChange={(e) => setAddress(e.target.value)}
                required
              />
            </div>

            <div className="input_button">
              <button onClick={onsubmit}>CREATE AN ACCOUNT </button>
            </div>
          </form>
        </div>
      </div>
      <ToastContainer position="top-center" autoClose={3000} />
    </div>
  );
}
