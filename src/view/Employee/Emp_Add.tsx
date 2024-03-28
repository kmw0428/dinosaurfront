import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

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
      await axios.post("http://localhost:8080/api/employees", newEmp);
      alert("Employee added successfully!");
      navigate("/emp");
    } catch (error) {
      console.error("Failed to add employee", error);
      alert("Failed to add employee.");
    }
  };

  return (
    <div>
      <h2>Add New Employee</h2>
      <form
        onSubmit={handleSubmitNewEmp}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          maxWidth: "400px",
          margin: "auto",
          textAlign: "center",
        }}
      >
        <table>
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
                />
              </td>
            </tr>
          </tbody>
        </table>
        <button type="submit">Save</button>
      </form>
    </div>
  );
}

export default Emp_Add;
