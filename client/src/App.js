import "./App.css";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom"; // Switch is replaced by Routes
import TestPicture from "./pages/TestPicture";
import Navbar from './components/HomeNavbar';
import SearchBar from './components/SearchBar';

function App() {
  return (
    <div className="App">
      <Navbar />
      <SearchBar />
      <Router>
        {/* Routes section */}
        <Routes>
          {/* <Route path="/" exact element={<Home />} /> */}
          <Route path="/testPicture" exact element={<TestPicture />} />
          {/* <Route path="/register" exact element={<Register />} />
          <Route path="/login" exact element={<Login />} /> */}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
