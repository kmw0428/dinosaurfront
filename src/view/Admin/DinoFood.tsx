import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

interface Feed {
  id: number;
  feedingTime: string;
  feedingDetail: string[];
}

const MySwal = withReactContent(Swal);

function FeedSchedule(): JSX.Element {
  const [schedules, setSchedules] = useState<Feed[]>([]);
  const [selectFeedId, setSelectedFeedId] = useState<number | null>(null);
  const [selectedTime, setSelectedTime] = useState("");
  const [feedingDetail, setFeedingDetail] = useState("");
  const [isHovered, setIsHovered] = useState(false);
  const [hoveredFeedId, setHoveredFeedId] = useState<number | null>(null);


  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/schedule");
      const formattedData = response.data.map(
        (schedule: { feedingDetail: any; feedingTime: string }) => ({
          ...schedule,
          feedingDetail:
            typeof schedule.feedingDetail === "string"
              ? schedule.feedingDetail.split(",")
              : schedule.feedingDetail,

          feedingTime: schedule.feedingTime.substring(0, 5), // HH:mm:ss를 HH:mm으로 변환
        })
      );
      setSchedules(formattedData);
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

  useEffect(() => {
    fetchData();
  }, []);

  // 의존성 배열을 빈 배열로 설정하여 컴포넌트 마운트 시에만 호출

  const handleAddFeed = async () => {
    if (!selectedTime || !feedingDetail) {
      MySwal.fire({
        icon: "warning",
        title: "Oops...",
        text: "모든 필드를 채워주세요!",
      });
      return;
    }

    const formattedTime = `${selectedTime}:00`; // HH:mm 형식을 HH:mm:ss 형식으로 변환
    const detailString = feedingDetail
      .split(",")
      .map((detail) => detail.trim())
      .join(","); // 배열을 문자열로 변환

    try {
      await axios.post("http://localhost:8080/api/schedule", {
        feedingTime: formattedTime,
        feedingDetail: detailString,
      });
      MySwal.fire(
        "Success!",
        "급식 스케줄이 성공적으로 추가되었습니다!",
        "success"
      );
      fetchData(); // 스케줄 목록을 다시 가져옵니다
      setSelectedTime(""); // 입력 필드 초기화
      setFeedingDetail(""); // 입력 필드 초기화
    } catch (error) {
      MySwal.fire("Fail!", "급식 스케줄 추가에 실패했습니다.", "error");
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
        await axios.delete("http://localhost:8080/api/schedule/${feedId}");
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
      <h2>공룡 급식 스케줄</h2>
      <div className="addFeed">
        <select
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
        <input
          type="text"
          placeholder="급식 내용"
          value={feedingDetail}
          onChange={(e) => setFeedingDetail(e.target.value)}
        />
        <button onClick={handleAddFeed}>추가</button>
        <table>
          <thead>
            <tr>
              <th>시간</th>
              <th>급식</th>
            </tr>
          </thead>
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
                        <button className="btn btn-outline-danger btn-sm feeddel"
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
        </table>
      </div>
    </div>
  );
}

export default FeedSchedule;
