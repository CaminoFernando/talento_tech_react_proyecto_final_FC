import React, { createContext, useState, useContext, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    try {
      const storedUser = localStorage.getItem("mercadoCautivoUser");
      return storedUser ? JSON.parse(storedUser) : null;
    } catch (error) {
      console.error("Error al leer usuario de localStorage:", error);
      return null;
    }
  });

  useEffect(() => {
    try {
      if (user) {
        localStorage.setItem("mercadoCautivoUser", JSON.stringify(user));
      } else {
        localStorage.removeItem("mercadoCautivoUser");
      }
    } catch (error) {
      console.error("Error al guardar usuario en localStorage:", error);
    }
  }, [user]);

  const login = (email, password) => {
    if (email === "admin@cautivo.com" && password === "1234") {
      const loggedInUser = { email };
      setUser(loggedInUser);
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);