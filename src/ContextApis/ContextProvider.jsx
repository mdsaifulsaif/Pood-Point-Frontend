import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext(null);

function ContextProvider({ children }) {
  const [user, setUser] = useState(null);
  const [partner, setPartner] = useState(null); // 👈 নতুন স্টেট
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAuthData = async () => {
      try {
        // ইউজারের ডেটা ফেচ
        const resUser = await fetch("http://localhost:5000/api/auth/me", {
          method: "GET",
          credentials: "include",
        });

        if (resUser.ok) {
          const data = await resUser.json();
          setUser(data?.user || null);
        } else {
          setUser(null);
        }

        // ফুড পার্টনার ডেটা ফেচ
        const resPartner = await fetch(
          "http://localhost:5000/api/auth/food-partner/me",
          {
            method: "GET",
            credentials: "include",
          }
        );

        if (resPartner.ok) {
          const partnerData = await resPartner.json();
          setPartner(partnerData || null);
        } else {
          setPartner(null);
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
    <AuthContext.Provider
      value={{ user, setUser, partner, setPartner, loading }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default ContextProvider;
