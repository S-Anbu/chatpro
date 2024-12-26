import { useEffect, useState, useContext } from "react";
import React from "react";
import { UserContext } from "../../UserContext";
import axios from "axios";


const ChatInterface = () => {
  const { selectedUser, currentUser } = useContext(UserContext);
  const [userData, setUserData] = useState({ name: "", isOnline: false });
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");


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
          });
        } catch (err) {
          setError(err.message);
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
      socket.emit("send-message", messageData);
      setMessages((prev) => [...prev, { ...messageData, timestamp: new Date().toISOString() }]);
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
                src="https://via.placeholder.com/40"
                alt="Profile"
                className="w-10 h-10 rounded-full"
              />
              <div className="ml-3">
                <h1 className="text-sm font-semibold">{userData.name}</h1>
                <span>{userData.isOnline ? 'online':'offline'}</span>
              </div>
            </div>
          </div>

          <div className="flex-1 p-4 overflow-y-auto">
            {messages.map((msg, index) => (
              <div key={index} className={`mb-2 ${msg.senderId === currentUser.id ? "text-right" : "text-left"}`}>
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
              className="flex-1 mx-4 px-4 py-2 border rounded-full text-sm focus:outline-none focus:ring focus:ring-blue-200"
            />
            <button
              className="ml-3 bg-blue-500 text-white px-3 py-1 rounded-full hover:bg-blue-600"
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