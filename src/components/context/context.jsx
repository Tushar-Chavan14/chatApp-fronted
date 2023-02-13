import { createContext, useState } from "react";
import React from "react";
import { io } from "socket.io-client";

export const SoketProvider = createContext({});

const socketIO = io("http://localhost:3000");

const Soketprovider = ({ children }) => {
  const [data, setdata] = useState({
    username: "",
    room: "",
  });

  return (
    <SoketProvider.Provider value={{ data, setdata, socketIO }}>
      {children}
    </SoketProvider.Provider>
  );
};

export default Soketprovider;
