import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";

export const UserContext = createContext(null);

export const useUserContext = () => useContext(UserContext);

export const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState();

  useEffect(() => {
    const axiosGet = async () => {
      const { data, error } = await axios.get("/users/profile");
      if (error) return console.log(error)
      setUser(data);
    };
    axiosGet();
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
