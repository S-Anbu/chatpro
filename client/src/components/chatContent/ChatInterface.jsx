import { useEffect, useState, useContext } from "react";
import React from "react";
import { UserContext } from "../../UserContext";
import { io } from "socket.io-client";
import axios from "axios";

const socket = io("http://localhost:5000"); // Connect to Socket.IO server

const ChatInterface = () => {
  const { selectedUser } = useContext(UserContext);
  const [userData, setUserData] = useState({ name: "", isOnline: false ,id:""});
  const [currentUser, setCurrentUser] = useState({ name: "", id:"" });
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

useEffect(() => {
  const fetchUser = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/auth/user/getUser",
        { withCredentials: true }
      );
      setCurrentUser({
        name: res.data.name,
        id: res.data.id,
      });
      
    } catch (err) {
      console.error(`Error fetching user data: ${err}`);
    }
  };
  fetchUser();
}, [])

  // useEffect(() => {
  //   // Join a room when a user is selected
  //   if (selectedUser) {
  //     console.log(`${currentUser.id} \n ${userData.id}`);
  //     const roomId = [currentUser.id, userData.id].sort().join("-");
      
  //     socket.emit("send_message", newMessageData);
  //   }
  // }, [selectedUser]);

  useEffect(() => {
    // Listen for incoming messages
    socket.on("receive-message", (message) => {
      setMessages((prev) => [...prev, message]);
    });

    return () => {
      socket.off("receive-message");
    };
  }, []);

  useEffect(() => {
    if (selectedUser?.name) {
      const fetchUserData = async () => {
        try {
          const res = await axios.post(
            "http://localhost:5000/auth/user/selectedUser",
            { Uname: selectedUser.name },
            { withCredentials: true }
          );
          setUserData({
            name: res.data.name,
            isOnline: res.data.isOnline,
            id:res.data.id,
            profileImage:res.data.profileImage
          });
        } catch (err) {
          console.error(`Error fetching user data: ${err}`);
        }
      };
      fetchUserData();
    }
  }, [selectedUser]);

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const messageData = {
        senderId: currentUser.id,
        receiverId: selectedUser.id,
        message: newMessage,
      };
      const roomId = [currentUser.id, selectedUser.id].sort().join("-");
      socket.emit("send-message", messageData); // Send message through socket
      setMessages((prev) => [
        ...prev,
        { ...messageData, timestamp: new Date().toISOString() },
      ]);
      setNewMessage("");
    }
  };

  return (
    <div className="w-full h-[90vh] flex flex-col mx-auto border bg-white rounded-lg shadow-md">
      {!selectedUser.name ? (
        <div className="flex items-center justify-center flex-1 bg-gray-50">
          <h1 className="text-lg font-semibold text-gray-700">
            Welcome! Please select a user to start chatting.
          </h1>
        </div>
      ) : (
        <div className="flex flex-col justify-between h-full">
          <div className="flex items-center justify-between p-4 border-b bg-gray-50">
            <div className="flex items-center">
              <img
                src={userData.profileImage ||  `https://ui-avatars.com/api/?name=${userData.name}&length=1`}
                alt="Profile"
                className="w-10 h-10 rounded-full border-2"
              />
              <div className="ml-3">
                <h1 className="text-sm font-semibold">{userData.name}</h1>
                <span>{userData.isOnline ? "online" : "offline"}</span>
              </div>
            </div>
          </div>

          <div className="flex-1 p-4 overflow-y-auto">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`mb-2 ${
                  msg.senderId === currentUser.id ? "text-right" : "text-left"
                }`}
              >
                <p className="inline-block px-4 py-2 bg-gray-200 rounded-lg">
                  {msg.message}
                </p>
              </div>
            ))}
          </div>

          <div className="flex items-center p-4 border-t bg-gray-50">
            <input
              type="text"
              placeholder="Type a message"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              className="flex-1 mx-4 px-4 py-2 border rounded-full text-sm focus:outline-none focus:ring focus:ring-green-200"
            />
            <button
              className="ml-3 bg-green-500 text-white px-3 py-1 rounded-full hover:bg-green-600"
              onClick={handleSendMessage}
            >
              Send
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatInterface;
