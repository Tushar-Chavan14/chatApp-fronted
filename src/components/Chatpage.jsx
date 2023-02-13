import React, { useRef, useState } from "react";
import { useContext } from "react";
import { SoketProvider } from "./context/context";

const Chatpage = () => {
  const { socketIO } = useContext(SoketProvider);

  const btnRef = useRef();

  const [msg, setmsg] = useState("");

  socketIO.on("message", (value) => {
    console.log(value);
  });

  socketIO.on("locMessage", (val) => {
    console.log(val);
  });

  const sendMesssage = (e) => {
    e.preventDefault();

    btnRef.current.setAttribute("disabled", true);

    socketIO.emit("clienMessage", msg, (err) => {
      btnRef.current.removeAttribute("disabled");
      if (err) {
        console.log(err);
      }
    });
    setmsg("");
  };

  const sendLoction = (e) => {
    e.preventDefault();

    if (!navigator.geolocation) return alert("not supported browser");

    btnRef.current.setAttribute("disabled", true);

    navigator.geolocation.getCurrentPosition((value) => {
      socketIO.emit(
        "location",
        {
          latitude: value.coords.latitude,
          longitude: value.coords.longitude,
        },
        () => {
          btnRef.current.removeAttribute("disabled");
          console.log("location shared");
        }
      );
    });
  };

  return (
    <div className="flex flex-col gap-10 items-center justify-center h-full">
      <h1 className=" text-4xl text-center">Dev Rooms</h1>
      <form
        className="h-[38rem] w-[26rem] bg-primary dark:bg-darkPrimary rounded-lg flex flex-col-reverse"
        onSubmit={sendMesssage}
      >
        <div className=" self-center p-5 flex gap-3">
          <input
            type="text"
            className="rounded bg-bgColor/40 dark:bg-bgDarkColor/40 placeholder:text-teal-600 dark:placeholder:text-teal-100"
            style={{ paddingInline: "0.5rem" }}
            placeholder="message"
            value={msg}
            onChange={(e) => {
              setmsg(e.target.value);
            }}
          />
          <button
            type="submit"
            className=" bg-secondary px-2 rounded dark:bg-darkSecondary text-bgDarkColor"
            ref={btnRef}
          >
            send
          </button>
          <button
            className=" bg-secondary px-2 rounded dark:bg-darkSecondary text-bgDarkColor"
            onClick={sendLoction}
            ref={btnRef}
          >
            location
          </button>
        </div>
        <div className=" h-5/6 bg-secondary/80 dark:bg-darkSecondary/30 w-[24rem] self-center mb-4"></div>
      </form>
    </div>
  );
};

export default Chatpage;
