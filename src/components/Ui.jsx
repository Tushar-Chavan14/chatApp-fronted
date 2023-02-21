import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { SoketProvider } from "./context/context";
import style from "./css/style.module.css";
import { Modal } from "./modal/Modal";

const Ui = ({ children }) => {
  const { socketIO, disconect, setdisconect, data } = useContext(SoketProvider);

  const navigate = useNavigate();

  const [roomData, setroomData] = useState({ data: { room: "", users: [] } });

  useEffect(() => {
    if (data.username === "") {
      setdisconect((prev) => !prev);
    }

    return () => {};
  }, [data]);

  useEffect(() => {
    socketIO.on("roomData", (data) => {
      setroomData({ ...roomData, data });
    });

    return () => {
      socketIO.removeListener("roomData");
    };
  }, [socketIO]);

  const diffRoomHandler = (e) => {
    e.preventDefault();

    navigate("/");
    window.location.reload();
  };

  return (
    <>
      <nav className="hidden h-screen bg-secondary dark:bg-darkSecondary/30 w-80 float-left md:flex flex-col items-center p-10 gap-48">
        <div>
          <h1 className="text-4xl">Dev Rooms</h1>
          <h3 className="text-center">Room : {roomData.data.room}</h3>
        </div>

        <div className=" h-96 bg-bgColor dark:bg-bgDarkColor w-64 rounded-md">
          <div className=" h-10 bg-primary dark:bg-darkPrimary flex items-center justify-center rounded-t-md ">
            <h2 className="text-2xl">users</h2>
          </div>
          <div className={`${style.scroll} overflow-y-scroll h-4/5 p-8`}>
            {roomData.data.users &&
              roomData.data.users.map((user, index) => (
                <li key={index} className="text-lg p-1">
                  {user.username}
                </li>
              ))}
          </div>
        </div>

        <div>
          <button
            className=" bg-bgColor p-2 rounded dark:bg-bgDarkColor"
            onClick={diffRoomHandler}
          >
            Select different Room
          </button>
        </div>
      </nav>
      <Modal
        shouldShow={disconect}
        onRequestClose={() => {
          setdisconect((prev) => !prev);
        }}
      >
        <div className="flex flex-col items-center justify-center gap-11 ">
          <h1>your disconnected</h1>
          <button
            className="bg-secondary px-2 rounded dark:bg-darkSecondary text-bgDarkColor"
            onClick={diffRoomHandler}
          >
            connect!
          </button>
        </div>
      </Modal>
      {children}
    </>
  );
};

export default Ui;
