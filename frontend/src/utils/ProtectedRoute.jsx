import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { validateUser } from "../services/api";
import GlobalLoader from "../components/GlobalLoader";

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  // const [isValid, setIsValid] = useState(false);

  // useEffect(() => {
  //   const userAuth = async () => {
  //     try {
  //       const res = await validateUser();
  //       if (res) {
  //         setIsValid(true);
  //       } else {
  //         setIsValid(false);
  //       }
  //     } catch (error) {
  //       setIsValid(false);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   userAuth();
  // }, []);

  if (!token) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default ProtectedRoute;
