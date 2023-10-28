import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
const DataDetails = () => {
  const [detailData, setDetails] = useState({});
  const { empid } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    (async () => {
      try {
        const Response1 = await axios.get(
          "http://localhost:8000/details/" + empid
        );
        setDetails(Response1.data);
      } catch (error) {
        alert(error.msg);
      }
    })();
  }, []);
  const EditData = (id) => {
    navigate("/home/edit/" + id);
  };
  const RemoveData = async (id) => {
    try {
      await axios.delete("http://localhost:8000/details/" + id);
    } catch (error) {
      alert(error.msg);
    }
    navigate("/");
  };
  return (
    <div className="data-details">
      <h1 className="heading">EMPLOYE DETAIL</h1>
      <hr />
      <h1>
        Name:{detailData.FirstName} {detailData.LastName}
      </h1>
      <h1>E.Mail:{detailData.Email}</h1>
      <h1>DoB:{detailData.DoB}</h1>
      <h1>Mobile:{detailData.Mobile}</h1>
      <h1>Location:{detailData.location}</h1>
      <div className="details-btn">
        <button>
          <Link to="/" className="link">
            BACK
          </Link>
        </button>

        <button onClick={() => RemoveData(empid)}>DELETE</button>

        <button onClick={() => EditData(empid)}>EDIT</button>
      </div>
    </div>
  );
};

export default DataDetails;
