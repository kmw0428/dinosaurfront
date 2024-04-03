import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";


// 공룡 데이터에 대한 타입 정의
interface DinoData {
  id?: number;
  dinoSpecies: string;
  dinoEra: string;
  dinoType: string;
  dinoFeature: string;
  dinoSize: number;
  dinoWeight: number;
  dinoDangerLevel: number;
  dinoHealthStatus: number;
}
const token = localStorage.getItem('token'); // 로컬 스토리지에서 토큰을 가져옵니다.

const MySwal = withReactContent(Swal);

const Dino_Edit: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [dinoData, setDinoData] = useState<DinoData>({
    dinoSpecies: "",
    dinoEra: "",
    dinoType: "",
    dinoFeature: "",
    dinoSize: 0,
    dinoWeight: 0,
    dinoDangerLevel: 0,
    dinoHealthStatus: 0,
  });

  useEffect(() => {
    const fetchDinoData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/dinosaur/${id}`
        );
        setDinoData(response.data);
      } catch (error) {
        MySwal.fire(
          'Fail!',
          'Fail to access information',
          'error'
        );
      }
    };

    fetchDinoData();
  }, [id, navigate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setDinoData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const result = await MySwal.fire({
      icon: "info",
      title: "Edit",
      text: "Are you sure to edit?",
      showCancelButton: true,
      confirmButtonText: "OK",
      cancelButtonText: "NO, Cancel",
    });
    if (result.isConfirmed) {
      try {
        await axios.put(`http://localhost:8080/api/dinosaur/${id}`, dinoData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        MySwal.fire(
          'Success!',
          'Dinosaur edited successfully!',
          'success'
        );
        navigate(-1); // 이전 페이지로 이동
      } catch (error) {
        MySwal.fire(
          'Fail!',
          'Failed to edit dinosaur.',
          'error'
        );
      }
    }
  };

  return (
    <div className="container">
      <br />
      <h2 className="edit-heading">Edit Dinosaur</h2><br />
      <form onSubmit={handleSubmit} className="edit-form">
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
                  value={dinoData.dinoSpecies}
                  onChange={handleChange}
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
                  value={dinoData.dinoEra}
                  onChange={handleChange}
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
                  value={dinoData.dinoType}
                  onChange={handleChange}
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
                  value={dinoData.dinoFeature}
                  onChange={handleChange}
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
                  value={dinoData.dinoSize}
                  onChange={handleChange}
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
                  value={dinoData.dinoWeight}
                  onChange={handleChange}
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
                  value={dinoData.dinoDangerLevel}
                  onChange={handleChange}
                  className="input-field"
                />
              </td>
            </tr>
            <tr
              className={dinoData.dinoHealthStatus <= 5 ? "red-background" : ""}
            >
              <td>
                <label htmlFor="dinoHealthStatus">Health Status:</label>
              </td>
              <td>
                <input
                  type="text"
                  id="dinoHealthStatus"
                  name="dinoHealthStatus"
                  value={dinoData.dinoHealthStatus}
                  onChange={handleChange}
                  className="input-field"
                />
              </td>
            </tr>
          </tbody>
        </table>
        <br />
        <button type="submit" className="btn btn-center">
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default Dino_Edit;
