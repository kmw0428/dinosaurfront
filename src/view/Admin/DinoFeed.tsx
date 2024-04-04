import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { getAccessToken } from "../../services/AcceeToken";
import { getCurrentUser } from "../../services/AutoService";
import "bootstrap/dist/css/bootstrap.min.css"; // Bootstrap CSS
import "bootstrap/dist/js/bootstrap.bundle.min"; // Bootstrap JS

interface Feed {
  id: number;
  feedingTime: string;
  feedingDetail: string[];
}

interface User {
  id: number;
  username: string;
  email: string;
  roles: string[];
}

const token = getAccessToken();
const MySwal = withReactContent(Swal);

function FeedSchedule(): JSX.Element {
  const [schedules, setSchedules] = useState<Feed[]>([]);
  const [selectedTime, setSelectedTime] = useState("");
  const [feedingDetail, setFeedingDetail] = useState("");
  const [hoveredFeedId, setHoveredFeedId] = useState<number | null>(null);
  const [currentUser, setCurrentUser] = useState<User | null>(getCurrentUser());
  const [dinosaurs, setDinosaurs] = useState<string[]>([]);
  const [selectedDinoSpecies, setSelectedDinoSpecies] = useState("");

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/schedule", {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const formattedData = response.data.map(
        (schedule: { feedingDetail: any; feedingTime: string | null }) => ({
          ...schedule,
          feedingDetail:
            typeof schedule.feedingDetail === "string"
              ? schedule.feedingDetail.split(",")
              : schedule.feedingDetail,

          feedingTime: schedule.feedingTime
            ? schedule.feedingTime.substring(0, 5)
            : "", // HH:mm:ss를 HH:mm으로 변환
        })
      );
      setSchedules(formattedData);
    } catch (error) {
      console.log(error);
      MySwal.fire({
        icon: "error",
        title: "Oops...",
        text: "There was a problem calling the API.",
        confirmButtonText: "Ok",
      }).then(() => {
        window.location.replace("/admin");
      });
    }
  };

  const fetchDino = async () => {
    try {
      // API 호출
      const response = await axios.get("http://localhost:8080/api/dinosaur");
      // 응답 데이터로 상태 업데이트
      const species = response.data.map(
        (dino: { dinoSpecies: any }) => dino.dinoSpecies
      );

      setDinosaurs(species);
    } catch (error) {
      console.log(error);
      MySwal.fire({
        icon: "error",
        title: "Oops...",
        text: "There was a problem calling the API.",
      });
    }
  };

  useEffect(() => {
    fetchData();
    fetchDino();
  }, []);

  // 의존성 배열을 빈 배열로 설정하여 컴포넌트 마운트 시에만 호출

  const formattedTime = `${selectedTime}:00`; // HH:mm 형식을 HH:mm:ss 형식으로 변환
  const detailString = feedingDetail
    .split(",")
    .map((detail) => detail.trim())
    .join(","); // 배열을 문자열로 변환

  const handleAddFeed = async () => {
    if (!selectedTime || !feedingDetail) {
      MySwal.fire({
        icon: "warning",
        title: "Oops...",
        text: "Fill in all fields!",
      });
      return;
    }

    try {
      await axios.post(
        "http://localhost:8080/api/schedule",
        {
          feedingTime: formattedTime,
          feedingDetail: detailString,
        },
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      MySwal.fire("Success!", "Feed-Schedule added successfully!", "success");
      fetchData(); // 스케줄 목록을 다시 가져옵니다
      setSelectedTime(""); // 입력 필드 초기화
      setFeedingDetail(""); // 입력 필드 초기화
    } catch (error) {
      MySwal.fire("Fail!", "Failed to add Feed-Schedule.", "error");
    }
  };

  const handleMouseEnter = (id: number) => {
    setHoveredFeedId(id);
  };

  const handleMouseLeave = () => {
    setHoveredFeedId(null);
  };

  const handleDeleteFeed = async (feedId: number) => {
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
        await axios.delete(`http://localhost:8080/api/schedule/${feedId}`, {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        MySwal.fire(
          "Success!",
          "Feed-Schedule deleted successfully!",
          "success"
        );
        setSchedules(schedules.filter((feed) => feed.id !== feedId));
      } catch (error) {
        MySwal.fire("Fail!", "Failed to delete Feed-Schedule.", "error");
      }
    }
  };

  const times = Array.from({ length: 19 }, (_, i) =>
    `${i + 6}:00`.padStart(5, "0")
  );

  return (
    <div>
      <br/>
      <h2>공룡 급식 스케줄</h2>

      <div className="addFeed container">
      <div className="row justify-content-md-center">
        {currentUser && currentUser.roles.includes("ROLE_ADMIN") && (
          <>
            <div className="col-md-auto">
              <select
                className="form-select"
                value={selectedTime}
                onChange={(e) => setSelectedTime(e.target.value)}
              >
                <option value="">시간 선택...</option>
                {times.map((time, index) => (
                  <option key={index} value={time}>
                    {time}
                  </option>
                ))}
              </select>
            </div>
            <div className="col-md-auto">
              <select
                className="form-select "
                value={feedingDetail}
                onChange={(e) => setFeedingDetail(e.target.value)}
              >
                <option value="">공룡 선택...</option>
                {dinosaurs.map((species, index) => (
                  <option key={index} value={species}>
                    {species}
                  </option>
                ))}
              </select>
            </div>
            <div className="col">
              <button className="btn btn-outline-dark" onClick={handleAddFeed}>
                추가
              </button>
            </div>
          </>
        )}</div>
        <table>
          <thead>
            <tr>
              <th>시간</th>
              <th>급식</th>
            </tr>
          </thead>
          <tbody>
            {times.map((time, index) => {
              // 현재 시간에 해당하는 스케줄의 feedingDetail 배열을 찾기
              const currentSchedules = schedules.filter(
                (schedule) => schedule.feedingTime === time
              );
              return (
                <tr key={index}>
                  <td>{time}</td>
                  <td>
                    {currentSchedules.map((schedule, idx) => (
                      <div
                        key={schedule.id}
                        onMouseEnter={() => handleMouseEnter(schedule.id)}
                        onMouseLeave={handleMouseLeave}
                      >
                        {schedule.feedingDetail.join(", ")}
                        {hoveredFeedId === schedule.id && (
                          <button
                            className="btn btn-outline-danger btn-sm feeddel"
                            onClick={() => handleDeleteFeed(schedule.id)}
                          >
                            Delete
                          </button>
                        )}
                      </div>
                    ))}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default FeedSchedule;
