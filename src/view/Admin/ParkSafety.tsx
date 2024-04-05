import React, { useState, useEffect } from "react";
import axios from "axios";
import { getCurrentUser } from "../../services/AutoService";
import "bootstrap/dist/css/bootstrap.min.css"; // Bootstrap CSS
import "bootstrap/dist/js/bootstrap.bundle.min"; // Bootstrap JS
import { getAccessToken } from "../../services/AcceeToken";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

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

const token = getAccessToken();
const MySwal = withReactContent(Swal);

function ParkSafety(): JSX.Element {
  const [inspection, setInspection] = useState<Safety[]>([]);
  const [currentUser, setCurrentUser] = useState<User | null>(getCurrentUser());
  const [dayOfWeek, setDayOfWeek] = useState("");
  const [inspectionTime, setInspectionTime] = useState("");
  const [inspectionDetail, setInspectionDetail] = useState("");
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/inspection");
      // 데이터 변환 로직 추가: inspectionTime을 'HH' 포맷으로 변경
      const convertedData = response.data.map(
        (item: { inspectionTime: string }) => ({
          ...item,
          inspectionTime: item.inspectionTime.split(":")[0] + ":00", // 'HH:mm:ss'에서 'HH:00'으로 변경
        })
      );
      setInspection(convertedData);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const formattedinspectionTime = `${inspectionTime}:00`; // HH:mm 형식을 HH:mm:ss 형식으로 변환
  const weeks = dayOfWeek;
  const details = inspectionDetail;
  const handleAddSafety = async () => {
    try {
      await axios.post(
        "http://localhost:8080/api/inspection",
        {
          dayOfWeek: weeks,
          inspectionTime: formattedinspectionTime,
          inspectionDetail: details,
        },
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      MySwal.fire("Success!", "Safety-Test added successfully!", "success");
      fetchData();
      setDayOfWeek("");
      setInspectionTime("");
      setInspectionDetail("");
    } catch (error) {
      MySwal.fire("Fail!", "Failed to add safety-Test.", "error");
    }
  };

  // 시간을 나타내는 배열
  const times = Array.from({ length: 19 }, (_, i) =>
    `${i + 6}:00`.padStart(5, "0")
  );

  const daysOfWeek = [
    "MONDAY",
    "TUESDAY",
    "WEDNESDAY",
    "THURSDAY",
    "FRIDAY",
    "SATURDAY",
    "SUNDAY",
  ];

  // 세이프 삭제 핸들러
  const handleDeleteSafe = async (id: number) => {
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
        await axios.delete(`http://localhost:8080/api/inspection/${id}`, {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        MySwal.fire("Success!", "Safety-Test deleted successfully!", "success");
        setInspection((prev) => prev.filter((time) => time.id !== id));
      } catch (error) {
        MySwal.fire("Fail!", "Failed to delete safety-Test.", "error");
      }
    }
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
                  <option key={index} value={day}>
                    {day}
                  </option>
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
              <button
                className="btn btn-outline-dark"
                onClick={handleAddSafety}
              >
                추가
              </button>
            </div>
          </>
        )}
      </div>
      <table>
        <thead>
          <tr className="tbline">
            <td className="tbline">Time</td>
            <td className="tbline">MONDAY</td>
            <td className="tbline">TUESDAY</td>
            <td className="tbline">WEDNESDAY</td>
            <td className="tbline">THURSDAY</td>
            <td className="tbline">FRIDAY</td>
            <td className="tbline">SATURDAY</td>
            <td className="tbline">SUNDAY</td>
          </tr>
        </thead>
        <tbody>
  {times.map((time, timeIndex) => (
    <tr key={timeIndex}>
      <td className="tbline tbcolor">{time}</td>
      {daysOfWeek.map((day, dayIndex) => (
        <td className="tbline" key={`${day}-${dayIndex}`}>
          {inspection.filter(safe => safe.dayOfWeek === day && safe.inspectionTime.startsWith(time))
            .map((safe, idx) => (
              <div 
                key={safe.id} 
                style={{ display: 'flex', alignItems: 'center', gap: '10px' }}
                onMouseEnter={() => setHoveredId(safe.id)} 
                onMouseLeave={() => setHoveredId(null)}
              >
                <span>{safe.inspectionDetail}</span>
                {hoveredId === safe.id && (
                  <button
                    onClick={() => handleDeleteSafe(safe.id)}
                    className="btn btn-outline-danger btn-sm"
                  >
                    Delete
                  </button>
                )}
              </div>
            ))}
        </td>
      ))}
    </tr>
  ))}
</tbody>
      </table>
    </div>
  );
}

export default ParkSafety;
