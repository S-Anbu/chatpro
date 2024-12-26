import axios from "axios";
import React, { useEffect, useState, useContext } from "react";
import "../../index.css";
import { UserContext } from "../../UserContext";

const Alluser = () => {
  const [userData, setUserData] = useState([]);
  const [error, setError] = useState(null);
  const [clickedIndex, setClickedIndex] = useState(null); // Track the clicked button
  const { setSelectedUser } = useContext(UserContext);

  const handleClick = (user, index) => {
    setSelectedUser({ name: user.name });
    setClickedIndex(index); // Update the clicked button index
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const res = await axios.get(
          "http://localhost:5000/auth/user/getAllUser",
          { withCredentials: true }
        );
        setUserData(res.data.names);
      } catch (err) {
        setError(err.message);
        console.log(`Error: ${err}`);
      }
    };

    fetchUserData();
  }, []);

  return (
    <div className="flex flex-col h-[62vh] items-start space-y-3  rounded   overflow-y-scroll scrollbar-hidden">
      {error && <span className="text-red-500">Error: {error}</span>}
      {userData.map((user, index) => (
        <button
          key={index}
          onClick={() => handleClick(user, index)}
          className={`flex items-center space-x-3 rounded shadow-md p-2 w-full ${
            clickedIndex === index ? "bg-gray-200" : "bg-white"
          }`}
        >
          <div className="rounded-full w-10 h-10 bg-blue-gray-200"></div>
          <span className=" font-semibold">{user.name}</span>
        </button>
      ))}
    </div>
  );
};

export default Alluser;
