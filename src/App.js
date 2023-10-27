import React from "react";
import Home from "./Home";
import { Routes, Route } from "react-router-dom";
import AddData from "./AddData";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/add" element={<AddData />}></Route>
      </Routes>
    </div>
  );
};

export default App;
