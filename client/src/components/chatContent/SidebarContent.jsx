import React, { useState,useEffect } from "react";
import { UnderlineTabs } from "./UnderlineTabs";
import axios from "axios";
import {
  Popover,
  Button,
  PopoverHandler,
  PopoverContent,
  ListItem,
} from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
const SidebarContent = () => {
 const [userData, setUserData]=useState({ name: "", isOnline: false ,profileImage:""})
 const navigate =useNavigate()

  useEffect(() => {
      const fetchUserData = async () => {
        try {
          const res = await axios.get(
            "http://localhost:5000/auth/user/getUser",
            { withCredentials: true }
          );
          setUserData({
            name: res.data.name,
            isOnline: res.data.isOnline,
            profileImage:res.data.profileImage
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
          <img src={userData.profileImage ||"https://docs.material-tailwind.com/img/face-2.jpg"} className="w-10 h-10 rounded-full"/>
          <div>
            <p className="text- font-semibold text-blue-500">{userData.name ? userData.name : 'Guest'}</p>
            <span className={`text-[12px]  font-medium ${userData.isOnline ? 'text-green-500' : 'text-red-500'} `}> {userData.isOnline ? 'Online':"Offline"} </span>
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
          <Popover placement="bottom">
      <PopoverHandler>
      <Button  className="bg-white text-blue-500 border-none shadow-none hover:shadow-none p-0">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="25"
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
        <button onClick={()=>{navigate('/EditProfile')}} className="hover:bg-gray-100 px-1 rounded-lg" >
          View Profile
        </button>
        <button className="hover:bg-gray-100 px-1 rounded-lg" >
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
      <div></div>
    </div>
  );
};

export default SidebarContent;
