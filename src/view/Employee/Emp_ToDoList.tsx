import React, { useState, useEffect } from 'react';
import { getCurrentUser } from '../../services/AutoService'; // 사용자 인증 정보를 가져오는 서비스

const tasks = [
  '공룡 먹이 주기',
  '공룡 행동 관찰하기',
  '방문객 안내 및 투어 진행',
  '공룡 파크 시설 점검',
  '공룡 건강 상태 체크',
  '공룡 배설물 정리',
  '식물원 관리 및 식물 물주기',
  '파크 안전 규칙 점검',
  '공룡 유적 발굴 돕기',
  '교육 프로그램 준비 및 진행'
];

function getTasksForUser(userId: any) {
  const key = `tasks_for_${userId}`;
  const taskData = localStorage.getItem(key);
  const now = new Date().getTime();

  if (taskData) {
    const data = JSON.parse(taskData);
    // 6시간 (21600000 밀리초) 동안 유효
    if (now - data.timestamp < 21600000) {
      return data.tasks;
    }
  }

  // 새로운 작업 목록 생성 및 저장
  const newTasks = tasks.sort(() => 0.5 - Math.random()).slice(0, 3);
  localStorage.setItem(key, JSON.stringify({ timestamp: now, tasks: newTasks }));
  return newTasks;
}

function TodoList() {
  const [userTasks, setUserTasks] = useState([]);

  useEffect(() => {
    const user = getCurrentUser(); // 로그인한 사용자 정보 가져오기
    if (user) {
      const assignedTasks = getTasksForUser(user.id); // 사용자별 할당된 작업 가져오기
      setUserTasks(assignedTasks);
    }
  }, []);

  return (
    <div className="container">
      <h2 className="title">오늘의 작업 목록</h2>
      <ul className="task-list">
        {userTasks.map((task, index) => (
          <li key={index} className="task-item"><input type="checkbox" id={`task-${index}`} />
          <label htmlFor={`task-${index}`}>{task}</label></li>
        ))}
      </ul>
    </div>
  );
}

export default TodoList;
