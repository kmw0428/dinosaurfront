import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

// Employee 인터페이스 선언
interface Employee {
  id: number;
  empName: string;
  empPosition: string;
  empDepart: string;
  empEmail: string;
  empPhone: string;
  empAddress: string;
  empBirth: string;
  empWorkYear: number;
}

function EmployeeList(): JSX.Element {
  // useState 훅을 사용하여 상태 변수 정의
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [selectedEmpId, setSelectedEmpId] = useState<number | null>(null); // 선택된 직원의 ID로 상태 관리

  // useEffect 훅을 사용하여 컴포넌트가 마운트되었을 때 한 번만 실행되는 로직 정의
  useEffect(() => {
    const fetchData = async () => {
      try {
        // API 호출
        const response = await axios.get("http://localhost:8080/api/employees");
        // 응답 데이터로 상태 업데이트
        setEmployees(response.data);
      } catch (error) {
        console.error("API 호출 중 오류 발생:", error);
      }
    };

    fetchData();
  }, []); // 의존성 배열을 빈 배열로 설정하여 컴포넌트 마운트 시에만 호출

  // 선택된 직원 ID를 관리하는 함수
  const handleSelectEmp = (id: number) => {
    if (selectedEmpId === id) {
      setSelectedEmpId(null);
    } else {
      setSelectedEmpId(id);
    }
  };

  // 직원 삭제를 처리하는 함수
  const handleDeleteEmp = async (empId: number) => {
    if (window.confirm("Are you sure you want to delete?")) {
      try {
        // 삭제 요청을 서버에 보냅니다.
        await axios.delete(`http://localhost:8080/api/employees/${empId}`);
        alert("Employee deleted successfully!");
  
        setEmployees(employees.filter((emp) => emp.id !== empId));
        setSelectedEmpId(null);
      } catch (error) {
        console.error("Failed to delete employee", error);
        alert("Failed to delete employee.");
      }
    }
  };

  return (
    <div>
      <h1>Employee List</h1>
      <ul>
        {employees.map((emp) => (
          <React.Fragment key={emp.id}>
            <li
              onClick={(e) => {
                e.stopPropagation();
                handleSelectEmp(emp.id);
              }}
            >
              {emp.empName}
              <Link to={`/emp/edit/${emp.id}`}>Edit</Link>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleDeleteEmp(emp.id);
                }}
              >
                Delete
              </button>
            </li>
            {selectedEmpId === emp.id && (
              <div>
                <h2>Selected employee</h2>
                <p>Name: {emp.empName}</p>
                <p>Position: {emp.empPosition}</p>
                <p>Department: {emp.empDepart}</p>
                <p>E-mail: {emp.empEmail}</p>
                <p>Phone number: {emp.empPhone}</p>
                <p>Address: {emp.empAddress}</p>
                <p>BirthDay: {emp.empBirth}</p>
                <p>Work-Year: {emp.empWorkYear}</p>
              </div>
            )}
          </React.Fragment>
        ))}
      </ul>
      <div>
        <Link to={'/emp/add'}>Add</Link>
      </div>
    </div>
  );
}

export default EmployeeList;
