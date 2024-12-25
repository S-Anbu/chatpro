import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Input,
  Button,
  Popover,
  PopoverHandler,
  PopoverContent,
} from "@material-tailwind/react";

import axios from "axios";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [alert, setAlert] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setAlert("Please fill out all fields.");
      return;
    }

    try {
      const res = await axios.post(
        "http://localhost:5000/auth/user/login",
        { email, password },
        { withCredentials: true }
      );

      if (res.data && res.data.token) {
        console.log(res.data.token);
      }

      if (res.status === 200) {
        setAlert("Logged in successfully");
        setEmail("");
        setPassword("");
        setTimeout(() => {
          navigate("/Chatboard");
        }, 1000);
      }
    } catch (error) {
      if (error.response) {
        setAlert(
          error.response.data.message || "Login failed. Please try again."
        );
      } else if (error.request) {
        setAlert("No response from server. Please try again later.");
      } else {
        setAlert("Something went wrong. Please try again.");
      }
      console.log(error.message);
    }
  };

  return (
    <div className="">
      <div className="flex items-center justify-between mt-10 px-20">
        <span className=" text-blue-500 text-2xl font-semibold">ChatPro</span>
        <div className="flex gap-4">
          <Button
            onClick={() => navigate("/register")}
            variant="gradient"
            type="submit"
            className="rounded-full "
          >
            Register
          </Button>
          <Button
            onClick={() => navigate("/login")}
            variant="gradient"
            type="submit"
            className="rounded-full "
          >
            login
          </Button>
        </div>
      </div>
      <div className="  flex-col items-center justify-center  ">
        <form onSubmit={handleLogin}>
          <div className="flex items-center justify-center mt-20">
            <div className="flex w-72 flex-col mt-2 items-center gap-6">
              <Input
                type="email"
                label="Email"
                value={email}
                name="email"
                required
                onChange={(e) => {
                  setEmail(e.target.value);
                  setAlert("");
                }}
                // className="w-full px-4 py-2 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
              />
              <Input
                type="password"
                label="Password"
                value={password}
                name="password"
                required
                onChange={(e) => {
                  setPassword(e.target.value);
                  setAlert("");
                }}
                // className="w-full px-4 py-2 mb-6 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
              />
              <Button
                type="submit"
                variant="gradient"
                className="rounded-full w-52 "
              >
                Login
              </Button>
            </div>
          </div>
        {alert && (
          <p className="text-red-400 p-2  mt-5 text-center rounded font-semibold">
            {alert}
          </p>
        )}
        </form>
        <div className="flex items-center justify-center mt-5 space-x-10">
          <button
            onClick={() => navigate("/Register")}
            className="text-blue-500 underline mt-2"
          >
            New user? Register
          </button>
          <button
            onClick={() => navigate("/ForgetPassword")}
            className="text-blue-500 underline mt-2"
          >
            Forget Password!
          </button>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
