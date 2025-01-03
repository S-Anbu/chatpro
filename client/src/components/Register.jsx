import React from "react";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Input,
  Button,
  Popover,
  PopoverHandler,
  PopoverContent,
} from "@material-tailwind/react";

const Register = () => {
  const Navigate = useNavigate();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    cpassword: "",
  });
  const [image, setImage] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
    setError("");
    setSuccess("");
  };


  const handleRegister = async (e) => {
    e.preventDefault();
    try {
     
      if (data.password !== data.cpassword) {
        setError("Passwords do not match.");
        return;
      }


      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/auth/user/register`,
        data
      );

      if (response.status === 201) {
        return setError(response.data.message);
      }
      if (response.status === 202) {
        return setError(response.data);
      }

      setSuccess(response.data.message);
      setTimeout(() => {
        Navigate("/verify-OTP");
      }, 2000);
    } catch (error) {
      setError(error.response?.data?.message || error.message);
      console.log(error);
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mt-10 px-20">
        <span className="text-blue-500 text-2xl font-semibold">ChatPro</span>
        <div className="flex gap-4">
          <Button
            onClick={() => Navigate("/")}
            variant="gradient"
            className="rounded-full"
          >
            Home
          </Button>
          <Button
            onClick={() => Navigate("/login")}
            variant="gradient"
            className="rounded-full"
          >
            Login
          </Button>
        </div>
      </div>
      <div>
        <form onSubmit={handleRegister}>
          <div className="flex items-center justify-center mt-20">
            <div className="flex w-72 flex-col mt-2 items-center gap-6">
              <Input
                type="text"
                label="Name"
                value={data.name}
                onChange={handleChange}
                name="name"
                required
              />
              <Input
                type="email"
                label="Email"
                value={data.email}
                onChange={handleChange}
                name="email"
                required
              />
              <Input
                type="password"
                label="Password"
                value={data.password}
                onChange={handleChange}
                name="password"
                required
              />
              <Input
                type="password"
                label="Confirm Password"
                value={data.cpassword}
                onChange={handleChange}
                name="cpassword"
                required
              />

              <Button
                variant="gradient"
                type="submit"
                className="rounded-full w-full"
              >
                Register
              </Button>
              {error && (
                <p className="text-red-400 text-center font-semibold">
                  {error}
                </p>
              )}
              {success && (
                <p className="text-green-500 text-center font-semibold">
                  {success}
                </p>
              )}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
