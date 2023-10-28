import React from "react";
import Home from "./Home";
import { Routes, Route, Link } from "react-router-dom";
import AddData from "./AddData";
import DataDetails from "./DataDetails";
import EditData from "./EditData";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/add" element={<AddData />}></Route>
        <Route path="/home/detail/:empid" element={<DataDetails />}></Route>
        <Route path="/home/edit/:empid" element={<EditData />}></Route>
      </Routes>
    </div>
  );
};

export default App;
