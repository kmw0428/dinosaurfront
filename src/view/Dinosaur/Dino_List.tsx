import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css"; // Bootstrap CSS
import "bootstrap/dist/js/bootstrap.bundle.min"; // Bootstrap JS
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { getCurrentUser } from "../../services/AutoService";
import { getAccessToken } from "../../services/AcceeToken";

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

interface User {
  id: number;
  username: string;
  email: string;
  roles: string[];
}

const token = getAccessToken();
const MySwal = withReactContent(Swal);

function DinosaurList(): JSX.Element {
  // 상태 관리
  const [dinosaurs, setDinosaurs] = useState<Dinosaur[]>([]);
  const [selectedDinoId, setSelectedDinoId] = useState<number | null>(null);
  const [currentUser, setCurrentUser] = useState<User | null>(getCurrentUser());

  useEffect(() => {
    const user = getCurrentUser();
    setCurrentUser(user);

    const fetchData = async () => {
      try {
        // API 호출
        const response = await axios.get("http://localhost:8080/api/dinosaur");
        // 응답 데이터로 상태 업데이트
        setDinosaurs(response.data);
      } catch (error) {
        MySwal.fire({
          icon: "error",
          title: "Oops...",
          text: "There was a problem calling the API.",
          confirmButtonText: "Ok",
        }).then(() => {
          window.location.replace("/");
        });
      }
    };

    fetchData();
  }, []); // 의존성 배열을 빈 배열로 설정하여 컴포넌트 마운트 시에만 호출

  const handleDeleteDino = async (dinoId: number) => {
    const result = await MySwal.fire({
      icon: "warning",
      title: "Delete",
      text: "Are you sure you want to delete?",
      showCancelButton: true,
      confirmButtonText: "OK",
      cancelButtonText: "NO, Cancel",
    });
    if (result.isConfirmed) {
      try {
        // 삭제 요청을 서버에 보냅니다.
        await axios.delete(`http://localhost:8080/api/dinosaur/${dinoId}`, {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        MySwal.fire("Success!!", "Dinosaur deleted successfully!", "success");

        setDinosaurs(dinosaurs.filter((dino) => dino.id !== dinoId));
        setSelectedDinoId(null);
      } catch (error) {
        MySwal.fire("Fail!", "Failed to delete dinosaur.", "error");
      }
    }
  };

  return (
    <div className="accordion" id="dinosaurAccordion" style={{margin: '15px'}}>
      <h1>
        Dinosaur List
        {currentUser &&
          (currentUser.roles.includes("ROLE_ADMIN")) && (
            <span className="Add">
              <Link to={`/dino/add`} className="btn btn-info">
                Add
              </Link>
            </span>
          )}
      </h1>
      {dinosaurs.map((dino, index) => (
        <div className="accordion-item" key={dino.id}>
          <h2 className="accordion-header" id={`heading${index}`}>
            <button
              className="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target={`#collapse${index}`}
              aria-expanded="false"
              aria-controls={`collapse${index}`}
            >
              {dino.dinoSpecies}
            </button>
          </h2>

          <div
            id={`collapse${index}`}
            className="accordian-collapse collapse"
            aria-labelledby={`heading${index}`}
            data-bs-parent="#dinosaurAccorion"
          >
            <div className="accordion body" style={{margin: '15px'}}>
              <p>Species: {dino.dinoSpecies}</p>
              <p>Era: {dino.dinoEra}</p>
              <p>Type: {dino.dinoType}</p>
              <p>Feature: {dino.dinoFeature}</p>
              <p>Size: {dino.dinoSize}</p>
              <p>Weight: {dino.dinoWeight}</p>
              <p>Danger Level: {dino.dinoDangerLevel}</p>
              <p>Health Status: {dino.dinoHealthStatus}</p>
              {currentUser &&
                (currentUser.roles.includes("ROLE_ADMIN")) && (
                  <>
                    <Link
                      to={`/dino/edit/${dino.id}`}
                      className="btn btn-primary"
                    >
                      Edit
                    </Link>
                    <button
                      className="btn btn-danger"
                      onClick={(e) => handleDeleteDino(dino.id)}
                    >
                      Delete
                    </button>
                  </>
                )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default DinosaurList;
