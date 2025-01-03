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
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      const auth = async () => {
        try {
          console.log(import.meta.env.VITE_API_BASE_URL);
          
          const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/auth/user/getUser`, {
          
            withCredentials: true,
          });
          if (res.data.name) {
            setVerified(true);
          }
        } catch (error) {
          console.log(error);
        } finally {
          setLoading(false);
        }
      };
      auth();
    }, []);
    

    return (
      <>
        <BrowserRouter>
  {loading ? (
    <div>Loading...</div>
  ) : (
    <Routes>
      <Route path="/" element={verified ? <Chatboard /> :<LandingPage />} />
      <Route path="/Register" element={<Register />} />
      <Route path="/Login" element={<LoginPage />} />
      <Route path="/verify-OTP" element={<VerifyOTP />} />
      <Route
        path="/chatboard"
        element={ verified ? <Chatboard /> :<LoginPage /> }
      />
      <Route path="/EditProfile" element={<EditProfile />} />
    </Routes>
  )}
</BrowserRouter>

      </>
    );
  }

  export default App;
