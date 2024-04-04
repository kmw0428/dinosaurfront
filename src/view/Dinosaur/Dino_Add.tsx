import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { getAccessToken } from "../../services/AcceeToken";

interface Dinosaur {
  dinoSpecies: string;
  dinoEra: string;
  dinoType: string;
  dinoFeature: string;
  dinoSize: number;
  dinoWeight: number;
  dinoDangerLevel: number;
  dinoHealthStatus: number;
}

const token = getAccessToken();
const MySwal = withReactContent(Swal);

function Dino_Add(): JSX.Element {
  const navigate = useNavigate();

  const [newDino, setNewDino] = useState<Dinosaur>({
    dinoSpecies: "",
    dinoEra: "",
    dinoType: "",
    dinoFeature: "",
    dinoSize: 0,
    dinoWeight: 0,
    dinoDangerLevel: 0,
    dinoHealthStatus: 0,
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const { name, value } = e.target;
    setNewDino((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmitNewDino = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    const result = await MySwal.fire({
      icon: "info",
      title: "Add",
      text: "Are you sure to add?",
      showCancelButton: true,
      confirmButtonText: "OK",
      cancelButtonText: "NO, Cancel",
    });
    if (result.isConfirmed) {
    try {
      await axios.post("http://localhost:8080/api/dinosaur", newDino, {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      MySwal.fire(
        'Success!',
        'Dinosaur added successfully!',
        'success'
      );
      navigate(-1);
    } catch (error) {
      MySwal.fire(
        'Fail!',
        'Failed to add dinosaur.',
        'error'
      );
    }}
  };

  return (
    <div className="container">
      <br />
      <h2 className="edit-heading">Add New Dinosaur</h2><br />
      <form
        onSubmit={handleSubmitNewDino} className="edit-form"
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
                <label htmlFor="dinoSpecies">Species:</label>
              </td>
              <td>
                <input
                  type="text"
                  id="dinoSpecies"
                  name="dinoSpecies"
                  value={newDino.dinoSpecies}
                  onChange={handleInputChange}
                  className="input-field"
                />
              </td>
            </tr>
            <tr>
              <td>
                <label htmlFor="dinoEra">Era:</label>
              </td>
              <td>
                <input
                  type="text"
                  id="dinoEra"
                  name="dinoEra"
                  value={newDino.dinoEra}
                  onChange={handleInputChange}
                  className="input-field"
                />
              </td>
            </tr>
            <tr>
              <td>
                <label htmlFor="dinoType">Type:</label>
              </td>
              <td>
                <input
                  type="text"
                  id="dinoType"
                  name="dinoType"
                  value={newDino.dinoType}
                  onChange={handleInputChange}
                  className="input-field"
                />
              </td>
            </tr>
            <tr>
              <td>
                <label htmlFor="dinoFeature">Feature:</label>
              </td>
              <td>
                <input
                  type="text"
                  id="dinoFeature"
                  name="dinoFeature"
                  value={newDino.dinoFeature}
                  onChange={handleInputChange}
                  className="input-field"
                />
              </td>
            </tr>
            <tr>
              <td>
                <label htmlFor="dinoSize">Size:</label>
              </td>
              <td>
                <input
                  type="text"
                  id="dinoSize"
                  name="dinoSize"
                  value={newDino.dinoSize}
                  onChange={handleInputChange}
                  className="input-field"
                />
              </td>
            </tr>
            <tr>
              <td>
                <label htmlFor="dinoWeight">Weight:</label>
              </td>
              <td>
                <input
                  type="text"
                  id="dinoWeight"
                  name="dinoWeight"
                  value={newDino.dinoWeight}
                  onChange={handleInputChange}
                  className="input-field"
                />
              </td>
            </tr>
            <tr>
              <td>
                <label htmlFor="dinoDangerLevel">Danger Level:</label>
              </td>
              <td>
                <input
                  type="text"
                  id="dinoDangerLevel"
                  name="dinoDangerLevel"
                  value={newDino.dinoDangerLevel}
                  onChange={handleInputChange}
                  className="input-field"
                />
              </td>
            </tr>
            <tr>
              <td>
                <label htmlFor="dinoHealthStatus">Health Status:</label>
              </td>
              <td>
                <input
                  type="text"
                  id="dinoHealthStatus"
                  name="dinoHealthStatus"
                  value={newDino.dinoHealthStatus}
                  onChange={handleInputChange}
                  className="input-field"
                />
              </td>
            </tr>
          </tbody>
        </table>
        <button type="submit" className="btn btn-center">Save</button>
      </form>
    </div>
  );
}

export default Dino_Add;
