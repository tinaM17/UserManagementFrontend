import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard/Dashboard";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import CreateUser from "./pages/CreateUser/CreateUser";
import Users from "./pages/Users/Users";

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/users" element={<Users />} />
          <Route path="/createUser" element={<CreateUser />} />
        </Routes>
        <Footer />
      </Router>
    </>
  );
}

export default App;
