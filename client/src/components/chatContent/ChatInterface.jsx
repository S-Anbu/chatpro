import React, { useEffect, useState, useContext } from 'react';
import { io } from 'socket.io-client';
import axios from 'axios';
import { UserContext } from '../../UserContext'; // Adjust based on your project structure
import chat from '../../assets/chat2.svg';
import '../../index.css'

const socket = io('http://localhost:5000', { withCredentials: true });

const ChatInterface = () => {
  const { selectedUser } = useContext(UserContext);
  const [userData, setUserData] = useState({
    name: '',
    isOnline: false,
    id: '',
  });
  const [currentUser, setCurrentUser] = useState({ name: '', id: '' });
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  // Fetch current user data on mount
  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const res = await axios.get('http://localhost:5000/auth/user/getUser', {
          withCredentials: true,
        });
        setCurrentUser({
          name: res.data.name,
          id: res.data.id,
        });

        // Join the socket room for this user
        socket.emit('join', res.data.id);
      } catch (err) {
        console.error('Error fetching current user data:', err);
      }
    };
    fetchCurrentUser();
  }, []);

  // Fetch selected user data and chat history when selectedUser changes
  useEffect(() => {
    if (selectedUser?.name) {
      const fetchUserData = async () => {
        try {
          const res = await axios.post(
            'http://localhost:5000/auth/user/selectedUser',
            { Uname: selectedUser.name },
            { withCredentials: true }
          );
          setUserData({
            name: res.data.name,
            isOnline: res.data.isOnline,
            id: res.data.id,
            profileImage: res.data.profileImage,
          });

        } catch (err) {
          console.error('Error fetching selected user data or messages:', err);
        }
      };
      fetchUserData();
    }
  }, [selectedUser, currentUser.id]);


useEffect(() => {
  if (!selectedUser.name) return;
  
  try {
    console.log(`iam working`);
    
    const fetchMessages = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/auth/user/messages/${currentUser.id}/${userData.id}`,
          { withCredentials: true }
        );
        console.log(res.data.messages);
        
        setMessages(res.data.messages);
      } catch (err) {
        console.error('Error fetching messages:', err);
      }
    };
    fetchMessages();
  } catch (error) {
    console.error("Error fetching messages:", error);  
  }
   
}, [userData.id])

  // Handle incoming messages
  useEffect(() => {
    socket.on('chatMessage', (msg) => {
      setMessages((prevChat) => [...prevChat, msg]);
    });

    return () => socket.off('chatMessage');
  }, [currentUser.id, userData.id]);

  // Handle sending a new message
  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (newMessage.trim()) {
      const messagePayload = {
        senderId: currentUser.id,
        receiverId: userData.id,
        message: newMessage,
      };

      try {
        setMessages((prevChat) => [...prevChat, messagePayload]);

        socket.emit('chatMessage', messagePayload);

     
        setNewMessage('');
      } catch (err) {
        console.error('Error sending message:', err);
      }
    }
  };

  return (
    <div className="w-full h-[90vh] flex flex-col mx-auto border bg-white rounded-lg shadow-md">
      {!selectedUser?.name ? (
        <div className="flex flex-col items-center justify-center space-y-20 flex-1 bg-gray-50">
          <h1 className="text-lg font-semibold bg-green-50 rounded p-3 text-gray-700">
            Welcome! Please select a user to start chatting.
          </h1>
          <img src={chat} className="w-96" alt="chat" />
        </div>
      ) : (
        <div className="flex flex-col justify-between h-full">
          <div className="flex items-center justify-between p-4 border-b bg-gray-50">
            <div className="flex items-center">
              <img
                src={
                  userData.profileImage ||
                  `https://ui-avatars.com/api/?name=${userData.name}&length=1`
                }
                alt="Profile"
                className="w-10 h-10 rounded-full border-2"
              />
              <div className="ml-3">
                <h1 className="text-sm font-semibold">{userData.name}</h1>
                <span>{userData.isOnline ? 'online' : 'offline'}</span>
              </div>
            </div>
          </div>

          <div className="flex-1 p-4 overflow-y-auto scrollbar-hidden">
            {messages && messages.map((msg, index) => (
              <div
                key={index}
                className={`mb-2 ${
                  msg.senderId === currentUser.id ? 'text-right' : 'text-left'
                }`}
              >
                <p
                  className={`inline-block text-red-900 text-xl px-4 py-2 rounded-lg ${
                    msg.senderId === currentUser.id
                      ? 'bg-green-100'
                      : 'bg-gray-200'
                  }`}
                >
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
