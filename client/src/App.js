import "./App.css";
import { BrowserRouter as Router, Route, Routes, NavLink } from "react-router-dom"; // Switch is replaced by Routes
import TestPicture from "./pages/TestPicture";
import SingleProperty from "./pages/SingleProperty";
// import Navbar from "./components/HomeNavbar";
import SearchBar from "./components/SearchBar";
import Navbar2 from "./components/Navbar";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <div className="App">
      {/* <Navbar /> */}
      <Navbar2 />
      <SearchBar />

      <Router>
        <div style={{
          display: "flex",
          background: 'orange',
          padding: '5px 0 5px 5px',
          fontSize: '20px'
        }}>
          <div style={{ margin: '10px' }}>

            <NavLink to="/" style={({ isActive }) => ({
              color: isActive ? 'black' : 'white'
            })}>Belle Maison</NavLink>
          </div>

          <div style={{ margin: '10px', contentalign: 'end' }}>
            <NavLink to="/add" style={({ isActive }) => ({
              color: isActive ? 'black' : 'white'
            })}>Brokers</NavLink>
          </div>

          <div style={{ margin: '10px' }}>
            <NavLink to="/" style={({ isActive }) => ({
              color: isActive ? 'black' : 'white'
            })}>login</NavLink>
          </div>
          <div style={{ margin: '10px' }}>
            <NavLink to="/" style={({ isActive }) => ({
              color: isActive ? 'black' : 'white'
            })}>register</NavLink>
          </div>
          <div style={{ margin: '10px' }}>
            <NavLink to="/" style={({ isActive }) => ({
              color: isActive ? 'black' : 'white'
            })}>logout</NavLink>
          </div>
        </div>
        <Routes>
          {/* <Route path="/" exact element={<Home />} /> */}
          <Route path="/testPicture" exact element={<TestPicture />} />
          <Route path="/property" exact element={<SingleProperty />} />
          {/* <Route path="/register" exact element={<Register />} />
          <Route path="/login" exact element={<Login />} /> */}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
