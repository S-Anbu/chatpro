import axios from "axios";
import React, { useEffect, useState } from "react";
import "../../index.css";
import { Input } from "@material-tailwind/react";
import { io } from "socket.io-client";

const socket = io("http://localhost:3000"); // Update with your backend origin

const GroupUserss = () => {
  const [userData, setUserData] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedGroupMember, setSelectedGroupMember] = useState([]);
  const [groupName, setGroupName] = useState("");
  const [error, setError] = useState(null);

  const handleClick = (user) => {
    setSelectedGroupMember((prev) => [...prev, user.name]);
  };

  const handleRemove = (user) => {
    const updatedMembers = selectedGroupMember.filter(
      (member) => member !== user
    );
    setSelectedGroupMember(updatedMembers);
  };

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    const filtered = userData.filter((user) =>
      user.name.toLowerCase().includes(query)
    );
    setFilteredUsers(filtered);
  };

  const handleCreateGroup = () => {
    if (!groupName || selectedGroupMember.length === 0) {
      alert("Please provide a group name and add members.");
      return;
    }

    const groupData = {
      groupName,
      members: selectedGroupMember,
    };

    socket.emit("createGroup", groupData);
    alert(`Group "${groupName}" created successfully!`);
    setGroupName("");
    setSelectedGroupMember([]);
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/auth/user/getAllUser`,
          { withCredentials: true }
        );
        setUserData(res.data.names);
        setFilteredUsers(res.data.names);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchUserData();
  }, []);

  return (
    <div className="flex flex-col items-start space-y-3 rounded pt-1 overflow-y-scroll scrollbar-hidden">
      <Input
        type="text"
        label="Group Name"
        value={groupName}
        onChange={(e) => setGroupName(e.target.value)}
        className="w-full p-2 border rounded mb-3"
      />
      <Input
        type="text"
        label="Search users..."
        value={searchQuery}
        onChange={handleSearch}
        className="w-full p-2 border rounded mb-3"
      />
      <div className="flex flex-wrap gap-2 mt-3">
        {selectedGroupMember.map((user, index) => (
          <div
            key={index}
            className="flex items-center space-x-3 rounded-lg bg-gray-100 shadow-lg p-1 hover:bg-gray-200 transition duration-200 ease-in-out"
          >
            <span className="text-lg font-semibold text-gray-800">{user}</span>
            <svg
              onClick={() => handleRemove(user)}
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              className="cursor-pointer text-red-500 hover:text-red-700 transition duration-200 ease-in-out"
            >
              <path
                fill="currentColor"
                d="m12 13.4l-4.9 4.9q-.275.275-.7.275t-.7-.275t-.275-.7t.275-.7l4.9-4.9l-4.9-4.9q-.275-.275-.275-.7t.275-.7t.7-.275t.7.275l4.9 4.9l4.9-4.9q.275-.275.7-.275t.7.275t.275.7t-.275.7L13.4 12l4.9 4.9q.275.275.275.7t-.275.7t-.7.275t-.7-.275z"
              />
            </svg>
          </div>
        ))}
        {selectedGroupMember.length > 0 && (
          <button
            onClick={handleCreateGroup}
            className="px-4 py-2 mt-2 rounded-lg bg-blue-500 text-white font-semibold hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300 transition duration-200 ease-in-out"
          >
            Create Group
          </button>
        )}
      </div>
      {error && <span className="text-red-500">Error: {error}</span>}
      {filteredUsers.map((user, index) => (
        <button
          key={index}
          onClick={() => handleClick(user)}
          className="flex items-center space-x-3 rounded hover:bg-gray-100 focus:bg-gray-200 shadow-md p-2 w-full"
        >
          <img
            src={
              user.profileImage
                ? user.profileImage
                : `https://ui-avatars.com/api/?name=${user.name}&length=1`
            }
            className="rounded-full w-10 h-10 border-2"
            alt={`${user.name}'s avatar`}
          ></img>
          <span className="font-semibold">{user.name}</span>
        </button>
      ))}
    </div>
  );
};

export default GroupUserss;
