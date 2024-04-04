import React, { useState, useEffect } from "react";
import axios from "axios";
import { getCurrentUser } from "../../services/AutoService";
import "bootstrap/dist/css/bootstrap.min.css"; // Bootstrap CSS
import "bootstrap/dist/js/bootstrap.bundle.min"; // Bootstrap JS

interface Safety {
  id: number;
  dayOfWeek: string;
  inspectionTime: string;
  inspectionDetail: string;
}

interface User {
    id: number;
    username: string;
    email: string;
    roles: string[];
  }

function ParkSafety(): JSX.Element {
  const [inspection, setInspection] = useState<Safety[]>([]);
  const [currentUser, setCurrentUser] = useState<User | null>(getCurrentUser());
  const [dayOfWeek, setDayOfWeek] = useState("");
  const [inspectionTime, setInspectionTime] = useState("");
  const [inspectionDetail, setInspectionDetail] = useState("");


  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/inspection");
      // 데이터 변환 로직 추가: inspectionTime을 'HH' 포맷으로 변경
      const convertedData = response.data.map((item: { inspectionTime: string; }) => ({
        ...item,
        inspectionTime: item.inspectionTime.split(':')[0] + ":00" // 'HH:mm:ss'에서 'HH:00'으로 변경
      }));
      setInspection(convertedData);
    } catch (error) {
      console.log(error);
    }
  };
  

  useEffect(() => {
    fetchData();
  }, []);

  // 시간을 나타내는 배열
  const times = Array.from({ length: 19 }, (_, i) =>
    `${i + 6}:00`.padStart(5, "0")
  );

  const daysOfWeek = [
    "MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY", "SATURDAY", "SUNDAY"
  ];

  // 세이프 삭제 핸들러
  const handleDeleteSafe = (id: number) => {
    // 세이프 삭제 로직 구현
  };


  return (
    <div className="container">
      <br />
      <h2>안전 점검 일정</h2>
      <br />
      <div className="row justify-content-md-center">
        {currentUser && currentUser.roles.includes("ROLE_ADMIN") && (
          <>
            <div className="col-md-auto">
              <select
                className="form-select"
                value={dayOfWeek}
                onChange={(e) => setDayOfWeek(e.target.value)}
              >
                <option value="">요일 선택...</option>
                {daysOfWeek.map((day, index) => (
              <option key={index} value={day}>{day}</option>
              ))}
              </select>
            </div>
            <div className="col-md-auto">
              <select
                className="form-select "
                value={inspectionTime}
                onChange={(e) => setInspectionTime(e.target.value)}
              >
                <option value="">시간 선택...</option>
                {times.map((time, index) => (
                  <option key={index} value={time}>
                    {time}
                  </option>
                ))}
              </select>
            </div>
            <div className="col">
                <input
                type="text"
                value={inspectionDetail}
                onChange={(e) => setInspectionDetail(e.target.value)}
                />
            </div>
            <div className="col">
              <button className="btn btn-outline-dark">
                추가
              </button>
            </div>
          </>
        )}</div>
      <table>
        <thead>
          <tr>
            <td>Time</td>
            <td>MONDAY</td>
            <td>TUESDAY</td>
            <td>WEDNESDAY</td>
            <td>THURSDAY</td>
            <td>FRIDAY</td>
            <td>SATURDAY</td>
            <td>SUNDAY</td>
          </tr>
        </thead>
        <tbody>
          {times.map((time, timeIndex) => (
            <tr key={timeIndex}>
              <td>{time}</td>
              {[
                "MONDAY",
                "TUESDAY",
                "WEDNESDAY",
                "THURSDAY",
                "FRIDAY",
                "SATURDAY",
                "SUNDAY",
              ].map((day, dayIndex) => (
                <td key={dayIndex}>
                  {/* 해당 요일과 시간에 맞는 안전 점검 정보를 찾아 출력 */}
                  {inspection.map(
                    (safe) =>
                      safe.dayOfWeek === day &&
                      safe.inspectionTime === time && (
                          <p>{safe.inspectionDetail}</p>
                      )
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        <button className="safe-button">ADD</button>
        <button className="safe-button">DELETE</button>
      </div>
    </div>
  );
}

export default ParkSafety;
