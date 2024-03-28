import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

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

const Dino_Edit: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [dinoData, setDinoData] = useState<DinoData>({
    dinoSpecies: '',
    dinoEra: '',
    dinoType: '',
    dinoFeature: '',
    dinoSize: 0,
    dinoWeight: 0,
    dinoDangerLevel: 0,
    dinoHealthStatus: 0,
  });

  useEffect(() => {
    const fetchDinoData = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/dinosaur/${id}`);
        setDinoData(response.data);
      } catch (error) {
        console.error('공룡 정보 불러오기 실패:', error);
      }
    };

    fetchDinoData();
  }, [id, navigate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setDinoData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (window.confirm("저장하시겠습니까?")) {
      try {
        await axios.put(`http://localhost:8080/api/dinosaur/${id}`, dinoData);
        navigate('/dino');
      } catch (error) {
        console.error('공룡 정보 업데이트 실패:', error);
      }
    }
  };

  return (
    <div>
      <h2>Edit Dinosaur</h2>
      <form onSubmit={handleSubmit}>
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
                  value={dinoData.dinoSpecies}
                  onChange={handleChange}
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
                  value={dinoData.dinoHealthStatus}
                  onChange={handleChange}
                />
              </td>
            </tr>
          </tbody>
        </table>
        <button type="submit">Save Changes</button>
      </form>
    </div>
  );
};

export default Dino_Edit;
