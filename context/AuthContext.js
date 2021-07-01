import { createContext, useEffect, useState } from "react";
import { NEXT_URL } from "@/config/index";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    checkIfLoggedIn();
  }, []);

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

    if (res.ok) {
      setUser(data.user);
    } else {
      setError(data.message);
      setError(null);
    }
  };

  const checkIfLoggedIn = async () => {
    const res = await fetch(`${NEXT_URL}/api/user`);
    const { user } = await res.json();

    if (res.ok) {
      setUser(user);
    } else {
      setUser(null);
    }
  };
  const register = (user) => {
    console.log(user);
  };
  const logout = () => {
    console.log("logout");
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
