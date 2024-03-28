import React, { useState, useEffect } from 'react';

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
    <div>
      <h1>Welcome to the HomePage</h1>
      <p>You have visited this page {visits} times.</p>
      <a href='/dino'>공룡 목록</a><br />
      <a href='/emp'>직원 목록</a><br />
      <a href='/login'>login&Signup</a>
    </div>
  );
}

export default Home;
