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

  useEffect(() => {
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

    fetchData();
  }, []); // 의존성 배열을 빈 배열로 설정하여 컴포넌트 마운트 시에만 호출

  const handleDeleteFeed = async (feedId: number) => {
    if (
      MySwal.fire({
        icon: "warning",
        title: "Delete",
        text: "Are you sure you want to delete?",
        showCancelButton: true,
        confirmButtonText: "OK",
        cancelButtonText: "NO, Cancel",
      })
    ) {
      try {
        await axios.delete("http://localhost:8080/api/schedule/${scheduleId}");
        MySwal.fire(
          "Success!",
          "Feed-Schedule deleted successfully!",
          "success"
        );
        setSchedules(schedules.filter((feed) => feed.id !== feedId));
        setSelectedFeedId(null);
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
        <table>
          <thead>
            <tr>
              <th>시간</th>
              <th>급식</th>
            </tr>
          </thead>
          {times.map((time, index) => {
            // 현재 시간에 해당하는 feedingDetail 찾기
            const feedDetails = schedules
              .filter((schedule) => schedule.feedingTime === time)
              .map((schedule) => schedule.feedingDetail.join(", "))
              .join("; ");
            return (
              <>
                <tbody>
                  <tr key={index}>
                    <td>{time}</td>
                    <td>{feedDetails || ""}</td>
                  </tr>
                </tbody>
              </>
            );
          })}
        </table>
      </div>
    </div>
  );
}

export default FeedSchedule;
