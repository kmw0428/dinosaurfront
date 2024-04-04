import React, { useState, useEffect } from "react";
import axios from "axios";

interface Safety {
    id: number;
    dayOfWeek: string;
    inspectionTime: string;
    inspectionDetail: string;
}

function ParkSafety(): JSX.Element {
    const [inspection, setInspection] = useState<Safety[]>([]);
    const [hoveredSafeId, setHoveredSafeId] = useState<number | null>(null);

    const fetchData = async () => {
        try {
            const response = await axios.get("http://localhost:8080/api/inspection");
            setInspection(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    // 시간을 나타내는 배열
    const times = ["9:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00","16:00","17:00","18:00"];

    // 세이프 삭제 핸들러
    const handleDeleteSafe = (id: number) => {
        // 세이프 삭제 로직 구현
    };

    // 마우스 진입 핸들러
    const handleMouseEnter = (id: number) => {
        setHoveredSafeId(id);
    };

    // 마우스 이탈 핸들러
    const handleMouseLeave = () => {
        setHoveredSafeId(null);
    };

    return (
        <div>
            <br />
            <h2>안전 점검 일정</h2>
            <br />
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
            {['MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY', 'SUNDAY'].map((day, dayIndex) => (
                <td key={dayIndex}>
                    {/* 해당 요일과 시간에 맞는 안전 점검 정보를 찾아 출력 */}
                    {inspection.map(safe => (
                        safe.dayOfWeek === day && safe.inspectionTime === time && (
                            <div
                                key={safe.id}
                                onMouseEnter={() => handleMouseEnter(safe.id)}
                                onMouseLeave={handleMouseLeave}
                            >
                                <p>{safe.inspectionDetail}</p>
                                {hoveredSafeId === safe.id && (
                                    <button
                                        className="btn btn-outline-danger btn-sm feeddel"
                                        onClick={() => handleDeleteSafe(safe.id)}
                                    >
                                        Delete
                                    </button>
                                )}
                            </div>
                        )
                    ))}
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
