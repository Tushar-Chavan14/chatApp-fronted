import Home from "./components/Home";
import { Route, Routes } from "react-router-dom";
import Chatpage from "./components/Chatpage";
import Soketprovider from "./components/context/context";

function App() {
  return (
    <div className="h-screen bg-bgColor dark:bg-bgDarkColor text-teal-600 dark:text-teal-100">
      <Soketprovider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/chat" element={<Chatpage />} />
        </Routes>
      </Soketprovider>
    </div>
  );
}

export default App;
