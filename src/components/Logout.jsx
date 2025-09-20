import axios from "axios";
import { useContext } from "react";
import { useNavigate } from "react-router";
import { AuthContext } from "../ContextApis/ContextProvider";
import { toast } from "react-toastify";
import { FaSignOutAlt } from "react-icons/fa";

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
        toast.success("Logout successful 🎉");
        navigate("/home");
      }
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <button
      onClick={handleLogout}
      className=" flex cursor-pointer  items-center justify-center gap-3 text-red-600 "
    >
      <FaSignOutAlt /> Logout
    </button>
  );
}

export default Logout;
