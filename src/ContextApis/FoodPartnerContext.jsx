// import React, { createContext, useContext, useEffect, useState } from "react";
// import axios from "axios";

// // Context তৈরি
// export const FoodPartnerContext = createContext();

// // Provider
// export const FoodPartnerProvider = ({ children }) => {
//   const [partner, setPartner] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     const fetchPartner = async () => {
//       try {
//         const res = await axios.get(
//           "http://localhost:5000/api/auth/food-partner/me",
//           { withCredentials: true }
//         );
//         setPartner(res.data);
//       } catch (err) {
//         console.error(err);
//         setError("Failed to fetch partner info");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchPartner();
//   }, []);

//   return (
//     <FoodPartnerContext.Provider
//       value={{ partner, setPartner, loading, error }}
//     >
//       {children}
//     </FoodPartnerContext.Provider>
//   );
// };

// // Custom hook
// export const useFoodPartner = () => {
//   return useContext(FoodPartnerContext);
// };
