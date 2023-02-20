import Home from "./components/Home";
import { Route, Routes } from "react-router-dom";
import Chatpage from "./components/Chatpage";
import Soketprovider from "./components/context/context";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <div className="h-screen bg-bgColor dark:bg-bgDarkColor text-gray-600 dark:text-teal-100">
      <Soketprovider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/chat" element={<Chatpage />} />
          <Route path="*" element={<p>page not found</p>} />
        </Routes>
      </Soketprovider>
      <ToastContainer
        position="top-right"
        autoClose={3500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        pauseOnHover
        theme="dark"
      />
    </div>
  );
}

export default App;
