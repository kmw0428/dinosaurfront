import React, { useState, useEffect } from "react";
import { DUMMY_EMPLOYEES } from "./Emp_Info";
import { Link } from "react-router-dom";

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
    // 임시 데이터를 상태에 설정
    // 실제 애플리케이션에서는 여기서 API 호출을 통해 데이터를 불러옵니다.
    setEmployees(DUMMY_EMPLOYEES);
  }, []);

  // 선택된 직원 ID를 관리하는 함수
  const handleSelectEmp = (id: number) => {
    if (selectedEmpId === id) {
      setSelectedEmpId(null);
    } else {
      setSelectedEmpId(id);
    }
  };

  // 직원 삭제를 처리하는 함수
  const handleDeleteEmp = (empId: number) => {
    if (window.confirm("Are you sure you want to delete?")) {
      // 삭제 로직 구현
      setEmployees(employees.filter((emp) => emp.id !== empId));
      setSelectedEmpId(null); // 선택된 직원을 null로 설정하여 UI에서 제거
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
