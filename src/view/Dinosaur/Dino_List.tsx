import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

// 공룡 데이터의 타입 정의
interface Dinosaur {
  id: number;
  dinoSpecies: string;
  dinoEra: string;
  dinoType: string;
  dinoFeature: string;
  dinoSize: number;
  dinoWeight: number;
  dinoDangerLevel: number;
  dinoHealthStatus: number;
}

function DinosaurList(): JSX.Element {
  // 상태 관리
  const [dinosaurs, setDinosaurs] = useState<Dinosaur[]>([]);
  const [selectedDinoId, setSelectedDinoId] = useState<number | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // API 호출
        const response = await axios.get("http://localhost:8080/api/dinosaur");
        // 응답 데이터로 상태 업데이트
        setDinosaurs(response.data);
      } catch (error) {
        console.error("API 호출 중 오류 발생:", error);
      }
    };

    fetchData();
  }, []); // 의존성 배열을 빈 배열로 설정하여 컴포넌트 마운트 시에만 호출

  const handleSelectDino = (id: number) => {
    if (selectedDinoId === id) {
      setSelectedDinoId(null);
    } else {
      setSelectedDinoId(id);
    }
  };

  const handleDeleteDino = async (dinoId: number) => {
    if (window.confirm("Are you sure you want to delete?")) {
      try {
        // 삭제 요청을 서버에 보냅니다.
        await axios.delete(`http://localhost:8080/api/dinosaur/${dinoId}`);
        alert("Dinosaur deleted successfully!");
  
        setDinosaurs(dinosaurs.filter((dino) => dino.id !== dinoId));
        setSelectedDinoId(null);
      } catch (error) {
        console.error("Failed to delete dinosaur", error);
        alert("Failed to delete dinosaur.");
      }
    }
  };

  return (
    <div>
      <h1>Dinosaur List</h1>
      <ul>
        {dinosaurs.map((dino) => (
          <React.Fragment key={dino.id}>
            <li
              onClick={(e) => {
                e.stopPropagation();
                handleSelectDino(dino.id);
              }}
            >
              {dino.dinoSpecies}
              <Link to={`/dino/edit/${dino.id}`}>Edit</Link>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleDeleteDino(dino.id);
                }}
              >
                Delete
              </button>
            </li>
            {selectedDinoId === dino.id && (
              <div>
                <h2>Selected Dinosaur</h2>
                <p>Species: {dino.dinoSpecies}</p>
                <p>Era: {dino.dinoEra}</p>
                <p>Type: {dino.dinoType}</p>
                <p>Feature: {dino.dinoFeature}</p>
                <p>Size: {dino.dinoSize}</p>
                <p>Weight: {dino.dinoWeight}</p>
                <p>Danger Level: {dino.dinoDangerLevel}</p>
                <p>Health Status: {dino.dinoHealthStatus}</p>
              </div>
            )}
          </React.Fragment>
        ))}
      </ul>
      <div>
        <Link to={'/dino/add'}>Add</Link>
      </div>
    </div>
  );
}

export default DinosaurList;
