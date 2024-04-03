import React, { useState, useEffect } from 'react';
import "./style.css";

const Home: React.FC = () => {
  const [visits, setVisits] = useState<number>(0);

  useEffect(() => {
    // 로컬 스토리지에서 방문 횟수를 가져옵니다.
    const visitCount: number = parseInt(localStorage.getItem('visits') || '0', 10);
    // 방문 횟수를 1 증가시킵니다.
    const newVisitCount: number = visitCount + 1;
    // 새 방문 횟수를 로컬 스토리지에 저장합니다.
    localStorage.setItem('visits', newVisitCount.toString());
    // 상태를 업데이트하여 페이지에 표시합니다.
    setVisits(newVisitCount);
  }, []);

  return (
    <div className="container">
      <div className="centered">
        <p className="title">Welcome to the HomePage</p>
        <p>You have visited this page <strong>{visits}</strong> times.</p>
      </div>
      <div className="horizontal-list">
        <a href='/dino'>Dinosaur List</a>
        <strong>| &nbsp;&nbsp;</strong>
        <a href='/emp'>Employee List</a>
      </div>
    </div>
  );
}

export default Home;
