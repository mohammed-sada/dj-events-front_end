import axios from "axios";
import { createContext, useState } from "react";
import { NEXT_URL } from "@/config/index";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  // Login user
  const login = async ({ email: identifier, password }) => {
    const res = await fetch(`${NEXT_URL}/api/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        identifier,
        password,
      }),
    });

    const data = await res.json();

    console.log(data);

    if (res.ok) {
      setUser(data.user);
    } else {
      setError(data.message);
      setError(null);
    }
  };
  const register = (user) => {
    console.log(user);
  };
  const logout = () => {
    console.log("logout");
  };
  const checkIfLoggedIn = (user) => {
    console.log("check");
  };

  return (
    <AuthContext.Provider
      value={{ user, error, login, register, logout, checkIfLoggedIn }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
