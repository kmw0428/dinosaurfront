import React from 'react';
import { Link } from 'react-router-dom';

function Dashboard() {
  return (
    <div className="dashboard-container">
    <div className="dashboard-content">
      <h2>관리자 대시보드</h2>
      <ul>
        <li><Link to="/admin/health-records">공룡 건강 점검 레코드</Link></li>
        <li><Link to="/admin/feeding-schedules">공룡 급식 스케쥴</Link></li>
        <li><Link to="/admin/safety-inspections">안전 점검 일정</Link></li>
      </ul>
    </div>
    </div>
  );
}

export default Dashboard;
