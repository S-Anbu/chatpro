
import React from 'react';
// import chat from '../assets/chat.svg'
import chat from '../assets/chat2.svg'
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {

  const navigate =useNavigate()
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <header className="bg-white shadow-md">
        <div className="container mx-auto flex justify-between items-center py-4 px-6">
          <h1 className="text-xl font-bold text-blue-600">ChatPro</h1>
          <nav className="flex space-x-4">
            <button onClick={()=>navigate('/')} className="text-gray-600 px-3 py-1 font-semibold rounded-full bg-blue-gray-50  hover:text-blue-600">Features</button>
            <button onClick={()=>navigate('/register')} className="text-gray-600 px-3 py-1 font-semibold rounded-full bg-blue-gray-50 hover:text-blue-600">Register</button>
            <button onClick={()=>navigate('/login')} className="text-gray-600 px-3 py-1 font-semibold rounded-full bg-blue-gray-50 hover:text-blue-600">login</button>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-blue-100">
        <div className="container mx-auto flex flex-col-reverse md:flex-row items-center py-16 px-6">
          <div className="md:w-1/2 text-center md:text-left">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              Stay Connected with <span className="text-blue-600">ChatPro</span>
            </h2>
            <p className="text-gray-600 mb-6">
              Experience seamless and secure communication with your friends, family, and colleagues. All in one app.
            </p>
            <div className="flex justify-center md:justify-start space-x-4">
              <button onClick={()=>navigate('/register')} className=" font-semibold bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition">
                Get Started
              </button>
              <button onClick={()=>navigate('/login')} className=" font-semibold bg-gray-100 text-gray-800 px-6 py-2 rounded-lg hover:bg-gray-200 transition">
                Login
              </button>
            </div>
          </div>
          <div className="md:w-1/2 flex justify-center">
            <img
              src={chat}
              alt="Chat app preview"
              className="rounded-lg "
            />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-16">
        <div className="container mx-auto px-6">
          <h3 className="text-3xl font-bold text-gray-800 text-center mb-10">Why Choose ChatPro?</h3>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <svg
                className="w-16 h-16 mx-auto text-blue-600"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <path d="M12 0C5.373 0 0 5.373 0 12c0 5.627 3.877 10.338 9.007 11.658V24l3.615-1.984C18.333 21.661 24 16.41 24 12 24 5.373 18.627 0 12 0z" />
              </svg>
              <h4 className="text-xl font-bold text-gray-800 mt-4">Real-Time Messaging</h4>
              <p className="text-gray-600 mt-2">
                Instant communication with fast and secure real-time messaging.
              </p>
            </div>
            <div className="text-center">
              <svg
                className="w-16 h-16 mx-auto text-blue-600"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <path d="M12 2C6.486 2 2 6.486 2 12c0 5.514 4.486 10 10 10s10-4.486 10-10c0-5.514-4.486-10-10-10zm4 15H8v-2h8v2zm0-4H8v-2h8v2zm0-4H8V7h8v2z" />
              </svg>
              <h4 className="text-xl font-bold text-gray-800 mt-4">Group Chats</h4>
              <p className="text-gray-600 mt-2">
                Create and manage group chats for personal or professional use.
              </p>
            </div>
            <div className="text-center">
              <svg
                className="w-16 h-16 mx-auto text-blue-600"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <path d="M22 6h-4V4c0-1.103-.897-2-2-2H8C6.897 2 6 2.897 6 4v2H2C.897 6 0 6.897 0 8v10c0 1.103.897 2 2 2h4v2c0 1.103.897 2 2 2h8c1.103 0 2-.897 2-2v-2h4c1.103 0 2-.897 2-2V8c0-1.103-.897-2-2-2zM8 4h8v2H8V4zm0 16v-2h8l.002 2H8z" />
              </svg>
              <h4 className="text-xl font-bold text-gray-800 mt-4">Secure Encryption</h4>
              <p className="text-gray-600 mt-2">
                Your messages are safe with end-to-end encryption.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Download Section */}
      <section id="download" className="bg-blue-600 py-16">
        <div className="container mx-auto px-6 text-center text-white">
          <h3 className="text-3xl font-bold mb-6">Get ChatPro Now!</h3>
          <p className="mb-6">
            Download the app today and start connecting with your world.
          </p>
          <div className="flex justify-center space-x-4">
            <button className="bg-white text-blue-600 px-6 py-3 rounded-lg hover:bg-gray-100 transition">
              Download for iOS
            </button>
            <button className="bg-white text-blue-600 px-6 py-3 rounded-lg hover:bg-gray-100 transition">
              Download for Android
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 py-6">
        <div className="container mx-auto text-center text-white">
          <p>&copy; 2024 ChatPro. All Rights Reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
