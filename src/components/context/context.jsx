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

  const [disconect, setdisconect] = useState(false);

  return (
    <SoketProvider.Provider
      value={{ data, setdata, socketIO, disconect, setdisconect }}
    >
      {children}
    </SoketProvider.Provider>
  );
};

export default Soketprovider;
