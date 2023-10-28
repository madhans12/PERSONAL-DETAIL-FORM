import React, { useState, useEffect } from "react";
import myData from "./db.json";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "./App.css";

const Home = () => {
  const [total, setTotal] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    (async () => {
      try {
        const Response = await axios.get("http://localhost:8000/details");
        setTotal(Response.data);
      } catch (error) {
        alert(error.msg);
      }
    })();
  }, [myData]);
  const EmpDetail = (id) => {
    navigate("/home/detail/" + id);
  };

  return (
    <div className="home-page">
      <h1>PERSONAL DETAILS FORM</h1>

      <div className="table-data">
        <table>
          {
            <thead>
              <tr>
                <th>SI.NO</th>
                <th>Name</th>
                <th>Gender</th>
                <th>DoB</th>
                <th>Email</th>
                <th>Mobile</th>
                <th>location</th>
              </tr>
            </thead>
          }

          {total.map((totals) => (
            <tbody>
              <tr>
                <td>{totals.id}</td>
                <td className="ip">
                  {totals.FirstName} {totals.LastName}
                </td>
                <td>{totals.Gender}</td>
                <td>{totals.DoB}</td>
                <td className="ip">{totals.Email}</td>
                <td>{totals.Mobile}</td>
                <td>{totals.location}</td>
                <td>
                  <button onClick={() => EmpDetail(totals.id)}>DETAIL</button>
                </td>
              </tr>
            </tbody>
          ))}
        </table>
      </div>
      <button>
        <Link to="/add" className="link">
          ADD +
        </Link>
      </button>
    </div>
  );
};

export default Home;
