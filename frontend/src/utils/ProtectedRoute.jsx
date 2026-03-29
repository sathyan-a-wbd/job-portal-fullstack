import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { validateUser } from "../services/api";
import GlobalLoader from "../components/GlobalLoader";

const ProtectedRoute = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    const userAuth = async () => {
      try {
        const res = await validateUser();
        if (res) {
          setIsValid(true);
        } else {
          setIsValid(false);
        }
      } catch (error) {
        setIsValid(false);
      } finally {
        setLoading(false);
      }
    };

    userAuth();
  }, []);

  if (loading) {
    return <GlobalLoader />;
  }

  if (!isValid) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default ProtectedRoute;
