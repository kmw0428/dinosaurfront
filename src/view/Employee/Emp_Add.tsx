import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { getAccessToken } from "../../services/AcceeToken";

interface Employee {
  empName: string;
  empPosition: string;
  empDepart: string;
  empEmail: string;
  empPhone: string;
  empAddress: string;
  empBirth: string;
  empWorkYear: number;
}

const token = getAccessToken();
const MySwal = withReactContent(Swal);

function Emp_Add(): JSX.Element {
  const navigate = useNavigate();

  const [newEmp, setNewEmp] = useState<Employee>({
    empName: "",
    empPosition: "",
    empDepart: "",
    empEmail: "",
    empPhone: "",
    empAddress: "",
    empBirth: "",
    empWorkYear: 0,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewEmp((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmitNewEmp = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8080/api/employees", newEmp, {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      MySwal.fire("Success!", "Employee added successfully!", "success");
      navigate("/emp");
    } catch (error) {
      MySwal.fire("Fail!", "Failed to add employee.", "error");
    }
  };

  return (
    <div className="container">
      <br />
      <h2 className="edit-heading">Add New Employee</h2>
      <br />
      <form
        onSubmit={handleSubmitNewEmp}
        className="edit-form"
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          maxWidth: "400px",
          margin: "auto",
          textAlign: "center",
        }}
      >
        <table className="edit-table">
          <tbody>
            <tr>
              <td>
                <label htmlFor="empName">Name:</label>
              </td>
              <td>
                <input
                  type="text"
                  id="empName"
                  name="empName"
                  value={newEmp.empName}
                  onChange={handleInputChange}
                  className="input-field"
                />
              </td>
            </tr>
            <tr>
              <td>
                <label htmlFor="empPosition">Position:</label>
              </td>
              <td>
                <input
                  type="text"
                  id="empPosition"
                  name="empPosition"
                  value={newEmp.empPosition}
                  onChange={handleInputChange}
                  className="input-field"
                />
              </td>
            </tr>
            <tr>
              <td>
                <label htmlFor="empDepart">Department:</label>
              </td>
              <td>
                <input
                  type="text"
                  id="empDepart"
                  name="empDepart"
                  value={newEmp.empDepart}
                  onChange={handleInputChange}
                  className="input-field"
                />
              </td>
            </tr>
            <tr>
              <td>
                <label htmlFor="empEmail">E-mail:</label>
              </td>
              <td>
                <input
                  type="text"
                  id="empEmail"
                  name="empEmail"
                  value={newEmp.empEmail}
                  onChange={handleInputChange}
                  className="input-field"
                />
              </td>
            </tr>
            <tr>
              <td>
                <label htmlFor="empPhone">Phone number:</label>
              </td>
              <td>
                <input
                  type="text"
                  id="empPhone"
                  name="empPhone"
                  value={newEmp.empPhone}
                  onChange={handleInputChange}
                  className="input-field"
                />
              </td>
            </tr>
            <tr>
              <td>
                <label htmlFor="empAddress">Address:</label>
              </td>
              <td>
                <input
                  type="text"
                  id="empAddress"
                  name="empAddress"
                  value={newEmp.empAddress}
                  onChange={handleInputChange}
                  className="input-field"
                />
              </td>
            </tr>
            <tr>
              <td>
                <label htmlFor="empBirth">Birth:</label>
              </td>
              <td>
                <input
                  type="date"
                  id="empBirth"
                  name="empBirth"
                  value={newEmp.empBirth}
                  onChange={handleInputChange}
                  className="input-field"
                />
              </td>
            </tr>
            <tr>
              <td>
                <label htmlFor="empWorkYear">Work Year:</label>
              </td>
              <td>
                <input
                  type="text"
                  id="empWorkYear"
                  name="empWorkYear"
                  value={newEmp.empWorkYear}
                  onChange={handleInputChange}
                  className="input-field"
                />
              </td>
            </tr>
          </tbody>
        </table>
        <button type="submit" className="btn btn-center">
          Save
        </button>
      </form>
    </div>
  );
}

export default Emp_Add;
