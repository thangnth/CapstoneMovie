import React, { createContext, useContext, useState } from "react";
const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(() => {
    const user = JSON.parse(localStorage.getItem("currentUser"));
    return user || null;
  });
  const handleSignIn = (user) => {
    setCurrentUser(user);
    localStorage.setItem("currentUser", JSON.stringify(user));
  };
  const handleSignOut = () => {
    setCurrentUser(null);
    localStorage.removeItem("currentUser");
  };
  return (
    <UserContext.Provider value={{ currentUser, handleSignIn, handleSignOut }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => {
  const value = useContext(UserContext);
  return value;
};

export default UserProvider;
