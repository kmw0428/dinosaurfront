import React, { useState, useEffect } from 'react';


// 작업(task) 목록의 타입을 문자열 배열로 지정
type Task = string[];

function TodoList(): JSX.Element {
  // useState에 타입 지정하여 tasks 상태를 문자열 배열로 관리
  const [tasks, setTasks] = useState<Task>([]);

  useEffect(() => {
    const fetchTasks = async () => {
      const assignedTasks: Task = [
        '문서 작성',
        '이메일 답변 처리',
        '회의 준비',
        '프로젝트 기획 검토',
        '코드 리뷰'
      ];

      // 랜덤으로 3개의 작업을 선택합니다.
      const selectedTasks: Task = assignedTasks.sort(() => 0.5 - Math.random()).slice(0, 3);
      setTasks(selectedTasks);
    };

    fetchTasks();
  }, []);

  return (
    <div className="container">
      <h2 className="title">할당된 작업 목록</h2>
      <ul className="task-list">
        {tasks.map((task, index) => (
          <li key={index} className="task-item">
            <input type="checkbox" id={`task-${index}`} />
            <label htmlFor={`task-${index}`}>{task}</label>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TodoList;
