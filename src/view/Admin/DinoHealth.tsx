import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css"; // Bootstrap CSS
import "bootstrap/dist/js/bootstrap.bundle.min"; // Bootstrap JS
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { getCurrentUser } from "../../services/AutoService";

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

const MySwal = withReactContent(Swal);

function DinoHealth(): JSX.Element {
  // 상태 관리
  const [dinosaurs, setDinosaurs] = useState<Dinosaur[]>([]);
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
          text: "API 호출 중 문제가 발생했습니다.",
          confirmButtonText: "확인",
        }).then(() => {
          window.location.replace("/");
        });
      }
    };

    fetchData();
  }, []); // 의존성 배열을 빈 배열로 설정하여 컴포넌트 마운트 시에만 호출

  return (
    <div>
      <br />
      <h2>공룡 건강 점검 레코드</h2><br />
      {dinosaurs.map((dino, index) => (
        <div key={dino.id}>
          <h2 id={`heading${index}`}></h2>
          <div>
            <table className="health">
              <tr>
                <th className="health-species">{dino.dinoSpecies}</th>
                <td className={dino.dinoHealthStatus <= 5 ? "red-number td1" : "td1"}>
                  <div className="health-status">
                  {dino.dinoHealthStatus}
                    {dino.dinoHealthStatus <= 5 && (<span className="red-text">EMERGENCY</span>)}
                  </div>
                </td>
                <td>
                  <Link
                    to={`/dino/edit/${dino.id}`}
                    className="btn-whitebase"
                  >
                    Edit
                  </Link>
                </td>
              </tr>
            </table>
          </div>
        </div>
      ))}
    </div>
  );
  
}

export default DinoHealth;
