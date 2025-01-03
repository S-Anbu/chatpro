import axios from "axios";
import React, { useEffect, useState, useContext } from "react";
import "../../index.css";
import { UserContext } from "../../UserContext";

const Alluser = () => {
  const [userData, setUserData] = useState([]);
  const [error, setError] = useState(null);
  const { setSelectedUser } = useContext(UserContext);

  const handleClick = (user) => {
    setSelectedUser({ name: user.name, id: user.id });
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/auth/user/getAllUser`,
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
          className={`flex items-center space-x-3 rounded hover:bg-gray-100 focus:bg-gray-200 shadow-md p-2 w-full `}
        >
          <img
            src={
              user.profileImage
                ? user.profileImage
                : `https://ui-avatars.com/api/?name=${user.name}&length=1`
            }
            className="rounded-full w-10 h-10 border-2"
          ></img>
          <span className=" font-semibold">{user.name}</span>
        </button>
      ))}
    </div>
  );
};

export default Alluser;
