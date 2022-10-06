import React, { useEffect } from "react";
import NavBar from "../components/NavBar/NavBar";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
function Home() {
  const navigation = useNavigate();
  useEffect(() => {
    if (!Cookies.get("token")) {
      navigation("/login");
    }
  }, []);
  return (
    <div>
      <NavBar />
    </div>
  );
}

export default Home;
