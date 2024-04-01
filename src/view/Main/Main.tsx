import React, { useState, useEffect } from 'react';
import './Main.css';

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
    <div className="main-page">
      <main>
        <br />
      <p>You have visited this page <span>{visits}</span> times.</p>
            <h1>Welcome to the our HomePage</h1>
            
      </main>
    </div>
  );
}

export default Home;
