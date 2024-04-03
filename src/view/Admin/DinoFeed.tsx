import React, { useEffect, useState } from "react";
import axios from "axios";

// 공룡 급식 스케줄 인터페이스
interface FeedingSchedule {
  id: number;
  feedingTime: string;
  feedingDetail: string[];
}

const transformTimeForDisplay = (timeString: string): string => {
    const [hours, minutes] = timeString.split(":");
    return `${hours}:${minutes}`;
  };

  const transformTimeForServer = (timeString: string): string => {
    return `${timeString}:00`;
  };
  


const DinoFeed: React.FC = () => {
  const [schedules, setSchedules] = useState<FeedingSchedule[]>([]);
  const [newFeedingDetail, setNewFeedingDetail] = useState("");
  const [selectedFeedingTime, setSelectedFeedingTime] = useState("");

  const fetchSchedules = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/schedule");
      const transformedData = response.data.map((schedule: { feedingDetail: string; }) => {
        // feedingDetail이 문자열이라면 쉼표를 기준으로 배열로 변환
        return {
          ...schedule,
          feedingDetail: typeof schedule.feedingDetail === 'string'
            ? schedule.feedingDetail.split(',')
            : schedule.feedingDetail
        };
      });
      setSchedules(transformedData);
    } catch (error) {
      console.error("Failed to fetch schedules:", error);
    }
  };

  useEffect(() => {
    fetchSchedules();
  }, []);

  // 스케줄에 공룡 추가 함수
  const addFeedingDetailToSchedule = async () => {
    const transformedTime = transformTimeForServer(selectedFeedingTime);
    try {
      await axios.post("http://localhost:8080/api/schedule", {
        feedingTime: transformedTime,
        feedingDetail: newFeedingDetail.split(',').map(detail => detail.trim()) // 여러 공룡을 입력받는 경우를 대비해 배열로 변환
      });
      fetchSchedules(); // 스케줄 목록을 다시 가져옵니다
      setNewFeedingDetail("");
      setSelectedFeedingTime("");
    } catch (error) {
      console.error("Failed to add feedingDetail to schedule:", error);
    }
  };
  // 특정 시간에 대한 공룡 삭제 함수
  const deleteFeedingDetailFromSchedule = async (scheduleId: number) => {
    try {
        await axios.delete(`http://localhost:8080/api/schedule/${scheduleId}`);
        fetchSchedules(); // 스케줄 목록을 다시 가져옵니다
      } catch (error) {
        console.error("Failed to delete dinosaur from schedule:", error);
      }
    };

  return (
    <div>
      <h2>공룡 급식 스케줄</h2>
      <div className="addFeed">
        <select
          value={selectedFeedingTime}
          onChange={(e) => setSelectedFeedingTime(e.target.value)}
        >
          <option value="">시간 선택...</option>
          {schedules.map((schedule) => (
            <option key={schedule.id} value={schedule.feedingTime}>
              {schedule.feedingTime}
            </option>
          ))}
        </select>
        <input
          type="text"
          placeholder="공룡 이름"
          value={newFeedingDetail}
          onChange={(e) => setNewFeedingDetail(e.target.value)}
        />
        <button onClick={addFeedingDetailToSchedule} disabled={!selectedFeedingTime || !newFeedingDetail}>
          추가
        </button>
      </div>
      <table>
        <thead>
          <tr>
            <th className="feedTime">시간</th>
            <th>공룡</th>
          </tr>
        </thead>
        <tbody>
          {schedules.map((schedule, index) => (
            <tr key={index}>
              <td className="feedTime">{schedule.feedingTime}</td>
              <td>
                {schedule.feedingDetail.map((feedingDetail, idx) => (
                  <div key={idx}>
                    {feedingDetail}
                    <button onClick={() => deleteFeedingDetailFromSchedule(schedule.id)}>
                      삭제
                    </button>
                  </div>
                ))}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DinoFeed;
