import axios from "axios";

function Logout() {
  const handleLogout = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/auth/logout", {
        withCredentials: true, // cookie পাঠানোর জন্য
      });

      if (res.data) {
        alert("Logout successful ✅");
      }
    } catch (error) {
      console.error("Logout error:", error);
      alert("Logout failed ❌");
    }
  };

  return <div onClick={handleLogout}>Logout</div>;
}

export default Logout;
