import { useState, useContext, createContext } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [password, setPassword] = useState(null);

  const login = (user, password) => {
    setUser(user);
    setPassword(password);
  };

  const logout = () => {
    setUser(null);
    setPassword(null);
  };

  return <AuthContext.Provider value={{ user, password, login, logout }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};
