import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

interface Dinosaur {
  dinoSpecies: string;
  dinoEra: string;
  dinoType: string;
  dinoFeature: string;
  dinoSize: string;
  dinoWeight: string;
  dinoDangerLevel: string;
  dinoHealthStatus: string;
}

function Dino_Add(): JSX.Element {
  const navigate = useNavigate();

  const [newDino, setNewDino] = useState<Dinosaur>({
    dinoSpecies: "",
    dinoEra: "",
    dinoType: "",
    dinoFeature: "",
    dinoSize: "",
    dinoWeight: "",
    dinoDangerLevel: "",
    dinoHealthStatus: "",
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

  const handleSubmitNewDino = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    if (window.confirm("Are you sure you want to save?")) {
      console.log(newDino);
      navigate("/dino");
    }
  };

  return (
    <div>
      <h2>Add New Dinosaur</h2>
      <form
        onSubmit={handleSubmitNewDino}
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
                <label htmlFor="dinoSpecies">Species:</label>
              </td>
              <td>
                <input
                  type="text"
                  id="dinoSpecies"
                  name="dinoSpecies"
                  value={newDino.dinoSpecies}
                  onChange={handleInputChange}
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

export default Dino_Add;
