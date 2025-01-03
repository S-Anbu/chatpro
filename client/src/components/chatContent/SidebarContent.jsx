import React, { useState, useEffect } from "react";
import { UnderlineTabs } from "./UnderlineTabs";
import axios from "axios";
import {
  Popover,
  Button,
  PopoverHandler,
  PopoverContent,
  Drawer,
  Typography,
  IconButton,
  Input,
} from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import GroupUsers from "../groupContent/GroupUsers";
// import GroupUserss from "../groupContent/GroupUserss";
const SidebarContent = () => {
  const [userData, setUserData] = useState({
    name: "",
    isOnline: false,
    profileImage: "",
  });
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);
  const openDrawer = () => setOpen(true);
  const closeDrawer = () => setOpen(false);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/auth/user/getUser`,
          { withCredentials: true }
        );
        setUserData({
          name: res.data.name,
          isOnline: res.data.isOnline,
          profileImage: res.data.profileImage,
        });
      } catch (err) {
        console.error(`Error fetching user data: ${err}`);
      }
    };
    fetchUserData();
  }, []);

  return (
    <div>
      <div className="flex items-center justify-between p-4 ">
        <div className="flex items-center space-x-2">
          <button onClick={() => navigate("/EditProfile")}>
            <img
              src={
                userData.profileImage ||
                "https://docs.material-tailwind.com/img/face-2.jpg"
              }
              className="w-10 h-10 rounded-full"
            />
          </button>
          <div>
            <p className="text- font-semibold text-blue-500">
              {userData.name ? userData.name : "Guest"}
            </p>
            <span
              className={`text-[12px]  font-medium ${
                userData.isOnline ? "text-green-500" : "text-red-500"
              } `}
            >
              {" "}
              {userData.isOnline ? "Online" : "Offline"}{" "}
            </span>
          </div>
        </div>
        <div className="flex space-x-5 text-blue-500">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="25"
            height="25"
            viewBox="0 0 24 24"
          >
            <path
              fill="currentColor"
              d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2m0 14H5.2L4 17.2V4h16zm-4-7v2h-3v3h-2v-3H8V9h3V6h2v3z"
            />
          </svg>
          <button onClick={openDrawer}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="25"
              height="25"
              viewBox="0 0 24 24"
            >
              <path
                fill="currentColor"
                d="M12 5a3.5 3.5 0 0 0-3.5 3.5A3.5 3.5 0 0 0 12 12a3.5 3.5 0 0 0 3.5-3.5A3.5 3.5 0 0 0 12 5m0 2a1.5 1.5 0 0 1 1.5 1.5A1.5 1.5 0 0 1 12 10a1.5 1.5 0 0 1-1.5-1.5A1.5 1.5 0 0 1 12 7M5.5 8A2.5 2.5 0 0 0 3 10.5c0 .94.53 1.75 1.29 2.18c.36.2.77.32 1.21.32s.85-.12 1.21-.32c.37-.21.68-.51.91-.87A5.42 5.42 0 0 1 6.5 8.5v-.28c-.3-.14-.64-.22-1-.22m13 0c-.36 0-.7.08-1 .22v.28c0 1.2-.39 2.36-1.12 3.31c.12.19.25.34.4.49a2.48 2.48 0 0 0 1.72.7c.44 0 .85-.12 1.21-.32c.76-.43 1.29-1.24 1.29-2.18A2.5 2.5 0 0 0 18.5 8M12 14c-2.34 0-7 1.17-7 3.5V19h14v-1.5c0-2.33-4.66-3.5-7-3.5m-7.29.55C2.78 14.78 0 15.76 0 17.5V19h3v-1.93c0-1.01.69-1.85 1.71-2.52m14.58 0c1.02.67 1.71 1.51 1.71 2.52V19h3v-1.5c0-1.74-2.78-2.72-4.71-2.95M12 16c1.53 0 3.24.5 4.23 1H7.77c.99-.5 2.7-1 4.23-1"
              />
            </svg>
          </button>

          <Popover placement="bottom">
            <PopoverHandler>
              <Button className="bg-white text-blue-500 border-none shadow-none hover:shadow-none p-0">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 16 16"
                >
                  <path
                    fill="currentColor"
                    d="M9.5 13a1.5 1.5 0 1 1-3 0a1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0a1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0a1.5 1.5 0 0 1 3 0"
                  />
                </svg>
              </Button>
            </PopoverHandler>
            <PopoverContent className="z-20">
              <div className=" flex flex-col space-y-2">
                <button
                  onClick={() => {
                    navigate("/EditProfile");
                  }}
                  className="hover:bg-gray-100 px-1 rounded-lg"
                >
                  View Profile
                </button>
                <button className="hover:bg-gray-100 px-1 rounded-lg">
                  Create Group
                </button>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </div>
      <div className="mx-4">
        <input
          className=" bg-gray-100 mb-2  px-4 py-1 w-full  rounded-full outline-none"
          type="text"
          placeholder="search"
        />
      </div>
      <div className="mx-4">
        <UnderlineTabs />
      </div>
      <Drawer open={open} onClose={closeDrawer}  placement="right" className=" p-5 overflow-y-scroll scrollbar-hidden">
        <div className="mb-6  flex items-center justify-between  ">
          <Typography variant="h5" color="blue-gray">
            Add Members
          </Typography>
          <IconButton variant="text" color="blue-gray" onClick={closeDrawer}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="h-5 w-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </IconButton>
        </div>
        <div className="">
          <GroupUsers />
          {/* <GroupUserss/> */}
        </div>
      </Drawer>
    </div>
  );
};

export default SidebarContent;
