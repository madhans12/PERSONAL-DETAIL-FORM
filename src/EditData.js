import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";

const EditData = () => {
  const navigate = useNavigate();
  const { empid } = useParams();
  const [formData, setFormData] = useState({
    FirstName: "",
    LastName: "",
    Gender: "",
    DoB: "",
    Email: "",
    Mobile: "",
    location: "",
  });
  useEffect(() => {
    (async () => {
      try {
        const Response2 = await axios.get(
          "http://localhost:8000/details/" + empid
        );
        setFormData(Response2.data);
        console.log(Response2.data);
      } catch (error) {
        alert(error.msg);
      }
    })();
  }, []);

  const submitData = async () => {
    if (!formData.FirstName) {
      alert("FirstName is missing");
    } else if (!formData.LastName) {
      alert("LastName is Missing");
    } else if (!formData.Gender) {
      alert("Gender is missing");
    } else if (!formData.DoB) {
      alert("DoB is missing");
    } else if (!formData.location) {
      alert("location is missing");
    } else if (
      !/^([a-zA-Z0-9_\.]+@[a-zA-Z0-9_]+\.[a-zA-Z]{2,})$/.test(formData.Email)
    ) {
      alert("Wrong email format");
      setFormData({ Email: "" });
    } else if (
      !/^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/i.test(
        formData.Mobile
      ) ||
      formData.Mobile.trim().length !== 10
    ) {
      alert("Wrong Mobile Number format");
    } else {
      try {
        await axios.put("http://localhost:8000/details/" + empid, formData, {
          headers: { "Content-Type": "application/json" },
        });
      } catch (error) {
        alert(error.msg);
      }
    }

    navigate("/");
  };

  return (
    <div>
      <div className="App">
        <div className="details">
          <h1>PERSONAL DETAILS FORM</h1>

          <div className="row-1">
            <label>
              FirstName :
              <input
                type="text"
                name="FirstName"
                placeholder="First Name"
                value={formData.FirstName}
                onChange={(e) =>
                  setFormData({ ...formData, FirstName: e.target.value })
                }
              />
            </label>
            <label>
              LastName :
              <input
                type="text"
                name="LastName"
                value={formData.LastName}
                placeholder="Last Name"
                onChange={(e) =>
                  setFormData({ ...formData, LastName: e.target.value })
                }
              />
            </label>
          </div>
          <div className="row-2">
            <label className="gender">
              Gender :
              <input
                type="radio"
                value="Male"
                name="Gender"
                checked={formData.Gender === "Male"}
                onChange={(e) =>
                  setFormData({ ...formData, Gender: e.target.value })
                }
              />{" "}
              Male
              <input
                type="radio"
                value="Female"
                name="Gender"
                checked={formData.Gender === "Female"}
                onChange={(e) =>
                  setFormData({ ...formData, Gender: e.target.value })
                }
              />{" "}
              Female
              <input
                type="radio"
                value="Others"
                name="Gender"
                checked={formData.Gender === "Others"}
                onChange={(e) =>
                  setFormData({ ...formData, Gender: e.target.value })
                }
              />{" "}
              Others
            </label>
            <label>
              Date Of Brith :
              <input
                type="date"
                name="DoB"
                value={formData.DoB}
                onChange={(e) =>
                  setFormData({ ...formData, DoB: e.target.value })
                }
              />
            </label>
            <label>
              Location :
              <select
                name="location"
                value={formData.location}
                onChange={(e) => {
                  console.log(e.target.value);
                  setFormData({ ...formData, location: e.target.value });
                }}
              >
                <option value="">location</option>
                <option value="Chennai">Chennai</option>
                <option value="Bangalore">Bangalore</option>
                <option value="Coimbatore">Coimbatore</option>
              </select>
            </label>
          </div>
          <div className="row-3">
            <label>
              {" "}
              Mail ID :
              <input
                type="email"
                name="Email"
                placeholder="xyz@gmail.com"
                value={formData.Email}
                onChange={(e) =>
                  setFormData({ ...formData, Email: e.target.value })
                }
              />
            </label>
            <label>
              {" "}
              Mobile No :
              <input
                type="number"
                name="Mobile"
                placeholder="9876543210"
                value={formData.Mobile}
                onChange={(e) =>
                  setFormData({ ...formData, Mobile: e.target.value })
                }
              />
            </label>
          </div>
          <div className="btn">
            <button onClick={submitData}> SUBMIT</button>
            <button>
              <Link to="/" className="link">
                BACK
              </Link>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditData;
