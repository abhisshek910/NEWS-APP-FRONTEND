// AuthContext.js
import React, { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(false);

  const login = (username, password) => {
    if (username === "admin" && password === "password") {
      const loggedInUser = { username: "admin" };
      setUser(true);
      localStorage.setItem("isLoggedIn", "true");
      return loggedInUser;
    } else {
      setUser(false);
      localStorage.setItem("isLoggedIn", "false");
      return null;
    }
  };

  const logout = () => {
    setUser(false);
    localStorage.removeItem("isLoggedIn");
    return true;
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
