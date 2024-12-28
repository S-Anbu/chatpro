import { BrowserRouter, Routes, Route , Navigate} from "react-router-dom";
import "./App.css";
import Register from "./components/Register";
import LoginPage from "./components/LoginPage";
import LandingPage from "./components/LandingPage";
import VerifyOTP from "./components/verifyOTP";
import Chatboard from "./components/chatContent/Chatboard.jsx";
import EditProfile from "./components/chatContent/EditProfile.jsx";
import axios from "axios";
import { useState, useEffect } from "react";
function App() {
  const [verified, setVerified] = useState(false);
  useEffect(() => {
    const auth = async () => {
      try {
        const res = await axios.get(
          "http://localhost:5000/auth/user/getUser",
          {
            withCredentials: true,
          }
        );        
        if (res.data.name) {
          setVerified(true);
        } else {
          console.log(`Unauthorized`);
        }
      } catch (error) {
        console.log(error);
      }
    };
    auth();
  }, []);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={verified ?<Chatboard />:<LandingPage />} />
          <Route path="/Register" element={<Register />} />
          <Route path="/Login" element={<LoginPage />} />
          <Route path="/verify-OTP" element={<VerifyOTP />} />
          <Route
            path="/chatboard"
            element={verified ? <Chatboard />  : <LoginPage /> }
          />
          <Route path="/EditProfile" element={<EditProfile />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
