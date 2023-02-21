import React from "react";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { SoketProvider } from "./context/context";
import { toast } from "react-toastify";

const Home = () => {
  const navigate = useNavigate();

  const { data, setdata, socketIO } = useContext(SoketProvider);

  const clickHandler = (e) => {
    e.preventDefault();
    if (data.username !== "" && data.room !== "") {
      socketIO.emit("join", data, (err) => {
        if (err) {
          toast.error(err);
          navigate("/");
          return window.location.reload();
        }
      });
      navigate("/chat", { replace: true });
    }
  };

  return (
    <div className="flex flex-row justify-center items-center h-full">
      <form
        className="flex flex-col w-[35rem] gap-12 bg-primary dark:bg-darkPrimary h-[25rem] justify-center rounded-lg"
        onSubmit={clickHandler}
      >
        <div className="text-center text-3xl">
          <h1>Dev Room</h1>
        </div>
        <input
          type="text"
          className="mx-20 p-2 bg-bgColor/40 dark:bg-bgDarkColor/40 placeholder:text-teal-600 dark:placeholder:text-teal-100"
          placeholder="Username"
          style={{ paddingInline: "1rem" }}
          value={data.username}
          onChange={(e) => {
            setdata({ ...data, username: e.target.value });
          }}
          autoFocus={true}
          required
        />
        <select
          name="select rooms"
          className="mx-20 p-2 bg-bgColor/40 dark:bg-bgDarkColor/40"
          style={{ paddingInline: "1rem" }}
          onChange={(e) => {
            setdata({ ...data, room: e.target.value });
          }}
          required
        >
          <option className=" bg-bgColor dark:bg-bgDarkColor" value="">
            select room
          </option>
          <option
            className=" bg-bgColor dark:bg-bgDarkColor"
            value="javascript"
          >
            javascript
          </option>
          <option className=" bg-bgColor dark:bg-bgDarkColor" value="react">
            react
          </option>
          <option className=" bg-bgColor dark:bg-bgDarkColor" value="node">
            node
          </option>
        </select>

        <button
          type="submit"
          className=" bg-secondary dark:bg-darkSecondary text-bgDarkColor mx-40 rounded"
        >
          Join room
        </button>
      </form>
    </div>
  );
};

export default Home;
