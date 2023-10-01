import logo from "./logo.svg";
import "./App.css";
import { useEffect, useState } from "react";

function App() {
  const [formData, setFormData] = useState({
    FirstName: "",
    LastName: "",
    Gender: "",
    DoB: "",
    Email: "",
    Mobile: "",
    location: "Chennai",
  });
  const [total, setTotal] = useState([]);

  useEffect(() => {
    const savedData = JSON.parse(localStorage.getItem("DETAIL FORM") || "[]");
    setTotal(savedData);
  }, []);
  const saveForm = (details) => {
    localStorage.setItem("DETAIL FORM", JSON.stringify(details));
  };

  const submitData = () => {
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
      let datas = [...total, formData];
      setTotal(datas);
      saveForm(datas);

      setFormData({
        FirstName: "",
        LastName: "",
        Gender: "",
        DoB: "",
        Email: "",
        Mobile: "",
        location: "",
      });
    }
  };
  const handleDelete = (index) => {
    const updatedaForm = [...total];
    updatedaForm.splice(index, 1);
    setTotal(updatedaForm);
    saveForm(updatedaForm);
  };

  return (
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
        </div>
      </div>
      <div className="table-data">
        <table>
          {total[0] && (
            <tr>
              <th>SI.NO</th>
              <th>Name</th>
              <th>Gender</th>
              <th>DoB</th>
              <th>Email</th>
              <th>Mobile</th>
              <th>location</th>
              <th className="empty"></th>
            </tr>
          )}
          {total.map((totals, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td className="ip">
                {totals.FirstName} {totals.LastName}
              </td>
              <td>{totals.Gender}</td>
              <td>{totals.DoB}</td>
              <td className="ip">{totals.Email}</td>
              <td>{totals.Mobile}</td>
              <td>{totals.location}</td>

              <button onClick={handleDelete} className="delete">
                Remove
              </button>
            </tr>
          ))}
        </table>
      </div>
    </div>
  );
}

export default App;
