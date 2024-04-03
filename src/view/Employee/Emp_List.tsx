import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css"; // Bootstrap CSS
import "bootstrap/dist/js/bootstrap.bundle.min"; // Bootstrap JS
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { getCurrentUser } from "../../services/AutoService";

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

interface User {
  id: number;
  username: string;
  email: string;
  roles: string[];
}

const MySwal = withReactContent(Swal);

function EmployeeList(): JSX.Element {
  // useState 훅을 사용하여 상태 변수 정의
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [selectedEmpId, setSelectedEmpId] = useState<number | null>(null); // 선택된 직원의 ID로 상태 관리
  const [currentUser, setCurrentUser] = useState<User | null>(getCurrentUser());

  // useEffect 훅을 사용하여 컴포넌트가 마운트되었을 때 한 번만 실행되는 로직 정의
  useEffect(() => {
    const user = getCurrentUser();
    setCurrentUser(user);

    const fetchData = async () => {
      try {
        // API 호출
        const response = await axios.get("http://localhost:8080/api/employees");
        // 응답 데이터로 상태 업데이트
        setEmployees(response.data);
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
    <div className="accordion" id="employeeAccordion">
      <h1>
        Employee List{" "}
        {currentUser &&
          (currentUser.roles.includes("ROLE_ADMIN") ||
            currentUser.roles.includes("ROLE_MODERATOR")) && (
            <span className="Add">
              <Link to={"/emp/add"} className="btn btn-info">
                Add
              </Link>
            </span>
          )}
      </h1>
      {employees.map((emp, index) => (
        <div className="accordion-item" key={emp.id}>
          <h2 className="accordion-header" id={`heading${index}`}>
            <button
              className="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target={`#collapse${index}`}
              aria-expanded="false"
              aria-controls={`collapse${index}`}
            >
              {emp.empName}
            </button>
          </h2>

          <div
            id={`collapse${index}`}
            className="accordion-collapse collapse"
            aria-labelledby={`heading${index}`}
            data-bs-parent="#employeeAccordion"
          >
            <div className="accordion-body">
              <p>Position: {emp.empPosition}</p>
              <p>Department: {emp.empDepart}</p>
              <p>E-mail: {emp.empEmail}</p>
              <p>Phone number: {emp.empPhone}</p>
              <p>Address: {emp.empAddress}</p>
              <p>BirthDay: {emp.empBirth}</p>
              <p>Work-Year: {emp.empWorkYear}</p>
              {currentUser &&
                (currentUser.roles.includes("ROLE_ADMIN") ||
                  currentUser.roles.includes("ROLE_MODERATOR")) && (
                  <>
                    <Link
                      to={`/emp/edit/${emp.id}`}
                      className="btn btn-primary"
                    >
                      Edit
                    </Link>
                    <button
                      className="btn btn-danger"
                      onClick={(e) => handleDeleteEmp(emp.id)}
                    >
                      Delete
                    </button>
                  </>
                )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default EmployeeList;
