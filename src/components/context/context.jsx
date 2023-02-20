import { createContext, useState } from "react";
import React from "react";
import { io } from "socket.io-client";

export const SoketProvider = createContext({});

const socketIO = io("https://devroom.up.railway.app/");

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
