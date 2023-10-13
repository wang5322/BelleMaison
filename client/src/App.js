import "./App.css";
import { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"; // Switch is replaced by Routes
import TestPicture from "./pages/TestPicture";
import SingleProperty from "./pages/SingleProperty";
import Registration from "./pages/Registration";
import Login from "./pages/Login";
import Home from "./pages/Home";
import PostListing from "./pages/PostListing";
import BrokerList from "./pages/BrokerList";
import BuyerProfile from "./pages/BuyerProfile";
import Navbar2 from "./components/Navbar";
import { AuthContext } from "./helpers/AuthContext";
import "bootstrap/dist/css/bootstrap.min.css";


function App() {
  const [authState, setAuthState] = useState({
    email: "",
    id: 0,
    role: "",
    status: false,
  });

  return (
    <div className="App">
      <AuthContext.Provider value={{ authState, setAuthState }}>
        {/* <Navbar /> */}
        <Navbar2 />
        <Router>
          <Routes>
            <Route path="/" exact element={<Home />} />
            <Route path="/testPicture" exact element={<TestPicture />} />
            <Route path="/property" exact element={<SingleProperty />} />
            <Route path="/register" exact element={<Registration />} />
            <Route path="/login" exact element={<Login />} />
            <Route path="/brokerList" exact element={<BrokerList />} />
            <Route path="/postListing" exact element={<PostListing />} />
            <Route path="/myProfile/user" exact element={<BuyerProfile />}/>
            {/* <Route path="/myProfile/broker" exact element={<BrokerProfile />}/> */}
          </Routes>
        </Router>
      </AuthContext.Provider>
    </div>
  );
}

export default App;
