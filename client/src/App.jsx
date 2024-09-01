import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import { useEffect, useState } from "react";
import { initFacebookSdk } from "./utils/FacebookSDK";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

function App() {
  const [userId,setUserId] = useState(null)
  useEffect(() => {
    const initFb = async () => {
      const res = await initFacebookSdk();
      setUserId(res)
    };
    initFb();
  }, []);
  // console.log(userId)
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={userId ? <Home setUserId={setUserId} /> : <Navigate to="/login" /> } />
        <Route path="/login" element={!userId ? <Login setUserId={setUserId} /> : <Navigate to="/" /> } />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
