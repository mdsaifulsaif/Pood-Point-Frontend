import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext(null);

function ContextProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAuthData = async () => {
      try {
        // ইউজারের ডেটা ফেচ
        const resUser = await fetch(
          "https://reels-app-server-200.onrender.com/api/auth/me",
          {
            method: "GET",
            credentials: "include",
          }
        );

        if (resUser.ok) {
          const data = await resUser.json();
          setUser(data?.user || null);
        } else {
          setUser(null);
        }
      } catch (err) {
        console.error("AuthContext fetch error:", err);
        setUser(null);
        setPartner(null);
      } finally {
        setLoading(false);
      }
    };

    fetchAuthData();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export default ContextProvider;
