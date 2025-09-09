import axios from "axios";
import { useContext } from "react";
import { useNavigate } from "react-router";
import { AuthContext } from "../ContextApis/ContextProvider";

function Logout() {
  const { setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/auth/logout", {
        withCredentials: true,
      });

      if (res.data) {
        setUser(null); //
        alert("Logout successful ✅");
        navigate("/home");
      }
    } catch (error) {
      console.error("Logout error:", error);
      // alert("Logout failed ❌");
    }
  };

  return <div onClick={handleLogout}>Logout</div>;
}

export default Logout;
