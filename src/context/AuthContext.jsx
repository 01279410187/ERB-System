import React, { createContext, useState, useContext, useEffect } from "react";
import { getProfile } from "../apis/auth";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const checkAuthUser = async () => {
    try {
      const profileData = await getProfile();
      const { id, username, phone, department, permissions, roles } =
        profileData;
      setUser({
        id,
        username,
        phone,
        department,
        permissions,
        roles,
      });
      setIsAuthenticated(true);
    } catch (error) {
      console.error("Error fetching profile:", error);
      setIsAuthenticated(false);
      navigate("/login");
    }
  };

  useEffect(() => {
    checkAuthUser();
    console.log(typeof localStorage.getItem("token"));
    if (
      localStorage.getItem("token") === null &&
      sessionStorage.getItem("token") === null
    )
      navigate("/login");
  }, []);

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, checkAuthUser }}>
      {children}
    </AuthContext.Provider>
  );
};
