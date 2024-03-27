import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { DUMMY_EMPLOYEES } from "./Emp_Info";

// Employee 인터페이스 선언
interface Employee {
  id?: number;
  empName: string;
  empPosition: string;
  empDepart: string;
  empEmail: string;
  empPhone: string;
  empAddress: string;
  empBirth: string;
  empWorkYear: number;
}

const Emp_Edit: React.FC = () => {
  // useParams 훅을 사용하여 URL 파라미터(id) 추출
  const { id } = useParams();
  // useNavigate 훅을 사용하여 라우터 내비게이션 기능 활성화
  const navigate = useNavigate();
  
  // useState 훅을 사용하여 상태 변수 정의
  const [empData, setEmpData] = useState<Employee>({
    empName: "",
    empPosition: "",
    empDepart: "",
    empEmail: "",
    empPhone: "",
    empAddress: "",
    empBirth: "",
    empWorkYear: 0 ,
  });

  // useEffect 훅을 사용하여 컴포넌트가 마운트되었을 때 한 번만 실행되는 로직 정의
  useEffect(() => {
    const emp = DUMMY_EMPLOYEES.find((emp) => emp.id === parseInt(id!));
    if (emp) {
      setEmpData(emp);
    } else {
      navigate("/emp");
    }
  }, [id, navigate]);

  // 입력 필드 값 변경 시 상태 업데이트 함수
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEmpData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // 폼 제출 시 처리 함수
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (window.confirm("Are you sure you want to save?")) {
      console.log(empData);
      navigate("/emp");
    }
  };

  return (
    <div>
      <h2>Edit Employee</h2>
      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          maxWidth: "400px",
          margin: "auto",
          textAlign: "center",
        }}
      >
        <table>
          <tbody>
            <tr>
              <td>
                <label htmlFor="empName">Name:</label>
              </td>
              <td>
                <input
                  type="text"
                  id="empName"
                  name="empName"
                  value={empData.empName}
                  onChange={handleChange}
                />
              </td>
            </tr>
            <tr>
              <td>
                <label htmlFor="empPosition">Position:</label>
              </td>
              <td>
                <input
                  type="text"
                  id="empPosition"
                  name="empPosition"
                  value={empData.empPosition}
                  onChange={handleChange}
                />
              </td>
            </tr>
            <tr>
              <td>
                <label htmlFor="empDepart">Department:</label>
              </td>
              <td>
                <input
                  type="text"
                  id="empDepart"
                  name="empDepart"
                  value={empData.empDepart}
                  onChange={handleChange}
                />
              </td>
            </tr>
            <tr>
              <td>
                <label htmlFor="empEmail">E-mail:</label>
              </td>
              <td>
                <input
                  type="text"
                  id="empEmail"
                  name="empEmail"
                  value={empData.empEmail}
                  onChange={handleChange}
                />
              </td>
            </tr>
            <tr>
              <td>
                <label htmlFor="empPhone">Phone number:</label>
              </td>
              <td>
                <input
                  type="text"
                  id="empPhone"
                  name="empPhone"
                  value={empData.empPhone}
                  onChange={handleChange}
                />
              </td>
            </tr>
            <tr>
              <td>
                <label htmlFor="empAddress">Address:</label>
              </td>
              <td>
                <input
                  type="text"
                  id="empAddress"
                  name="empAddress"
                  value={empData.empAddress}
                  onChange={handleChange}
                />
              </td>
            </tr>
            <tr>
              <td>
                <label htmlFor="empBirth">Birth:</label>
              </td>
              <td>
                <input
                  type="text"
                  id="empBirth"
                  name="empBirth"
                  value={empData.empBirth}
                  onChange={handleChange}
                />
              </td>
            </tr>
            <tr>
              <td>
                <label htmlFor="empWorkYear">Work Year:</label>
              </td>
              <td>
                <input
                  type="text"
                  id="empWorkYear"
                  name="empWorkYear"
                  value={empData.empWorkYear}
                  onChange={handleChange}
                />
              </td>
            </tr>
          </tbody>
        </table>
        <button type="submit">Save Changes</button>
      </form>
    </div>
  );
}

export default Emp_Edit;
