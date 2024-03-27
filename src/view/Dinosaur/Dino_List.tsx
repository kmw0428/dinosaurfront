import React, { useState, useEffect } from "react";
import { DUMMY_DINOSAURS } from "./Dino_Info";
import { Link } from "react-router-dom";

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
    // 임시 데이터를 상태에 설정
    // 실제 애플리케이션에서는 여기서 API 호출을 통해 데이터를 불러옵니다.
    setDinosaurs(DUMMY_DINOSAURS);
  }, []);

  const handleSelectDino = (id: number) => {
    if (selectedDinoId === id) {
      setSelectedDinoId(null);
    } else {
      setSelectedDinoId(id);
    }
  };

  const handleDeleteDino = (dinoId: number) => {
    if (window.confirm("Are you sure you want to delete?")) {
      //삭제 로직 구현
      setDinosaurs(dinosaurs.filter((dino) => dino.id !== dinoId));
      setSelectedDinoId(null); // 선택된 공룡을 null로 설정하여 UI에서 제거
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
