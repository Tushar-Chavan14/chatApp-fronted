import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useContext } from "react";
import { SoketProvider } from "./context/context";
import moment from "moment";
import Ui from "./Ui";
import style from "./css/style.module.css";
import { toast } from "react-toastify";

const Chatpage = () => {
  const { socketIO, data, setdisconect } = useContext(SoketProvider);

  const btnRef = useRef();
  const bottomRef = useRef(null);

  const [msg, setmsg] = useState("");
  const [messages, setmessages] = useState([]);

  useEffect(() => {
    socketIO.on("message", ({ msg, createdAt }, username) => {
      setmessages((prev) => {
        return [
          ...prev,
          { msg, createdAt: moment(createdAt).format("hh:mm a"), username },
        ];
      });
    });

    socketIO.on("locMessage", ({ loc, createdAt }, username) => {
      setmessages((prev) => {
        return [
          ...prev,
          { loc, createdAt: moment(createdAt).format("hh:mm a"), username },
        ];
      });
    });

    return () => {
      socketIO.removeListener("message");
      socketIO.removeListener("locMessage");
    };
  }, [socketIO]);

  useLayoutEffect(() => {
    bottomRef.current.scrollIntoView({ behavior: "smooth" });

    return () => {};
  }, [messages]);

  const sendMesssage = (e) => {
    e.preventDefault();

    btnRef.current.setAttribute("disabled", true);

    socketIO.emit("clienMessage", msg, (err) => {
      btnRef.current.removeAttribute("disabled");
      if (data.username === "") {
        setdisconect((prev) => !prev);
      } else if (!err) {
        setmessages((prev) => {
          return [
            ...prev,
            {
              msg,
              createdAt: moment(new Date().getTime()).format("hh:mm a"),
              isSent: true,
              username: data.username,
            },
          ];
        });
      } else {
        toast.error(err);
      }
    });
    setmsg("");
  };

  const sendLoction = (e) => {
    e.preventDefault();

    if (!navigator.geolocation) return alert("not supported browser");

    btnRef.current.setAttribute("disabled", true);

    if (data.username === "") {
      setdisconect((prev) => !prev);
    } else {
      navigator.geolocation.getCurrentPosition((value) => {
        socketIO.emit(
          "location",
          {
            latitude: value.coords.latitude,
            longitude: value.coords.longitude,
          },
          () => {
            btnRef.current.removeAttribute("disabled");
            toast.success("location shared");
          }
        );
      });
    }
  };

  return (
    <Ui>
      <div className="flex flex-col gap-10 items-center justify-center h-screen">
        <h1 className="text-4xl md:hidden">Dev Rooms</h1>
        <form
          className="h-[38rem] w-[26rem] md:h-[40rem] md:w-[65rem] bg-primary dark:bg-darkPrimary rounded-lg flex flex-col-reverse"
          onSubmit={sendMesssage}
        >
          <div className="self-center p-5 md:h-20 flex gap-3">
            <input
              type="text"
              className="md:w-96 rounded bg-bgColor/40 dark:bg-bgDarkColor/40 placeholder:text-teal-600 dark:placeholder:text-teal-100"
              style={{ paddingInline: "0.5rem" }}
              placeholder="message"
              value={msg}
              autoFocus={true}
              onChange={(e) => {
                setmsg(e.target.value);
              }}
              required
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
          <div
            className={`h-5/6 w-[24rem] md:w-[95%] bg-secondary/80 dark:bg-darkSecondary/30 self-center mb-4 md:mb-2 overflow-y-scroll ${style.scroll}`}
          >
            {messages &&
              messages.map(
                ({ msg, loc, createdAt, username, isSent }, index) => (
                  <div key={index} className={isSent && "flex justify-end"}>
                    <div className="bg-bgColor dark:bg-bgDarkColor w-64 m-4 overflow-x-hidden rounded-lg p-2 flex items-center justify-between">
                      <div>
                        <p className="text-sm text-blue-600 dark:text-blue-200 ">
                          {username}
                        </p>
                        {msg ? (
                          <span>{msg}</span>
                        ) : (
                          <a href={loc} target="_blank">
                            {username} shared location
                          </a>
                        )}
                      </div>
                      <span className="text-[0.65rem] relative right-2 self-end shrink-0">
                        {createdAt}
                      </span>
                    </div>
                  </div>
                )
              )}
            <div ref={bottomRef} />
          </div>
        </form>
      </div>
    </Ui>
  );
};

export default Chatpage;
