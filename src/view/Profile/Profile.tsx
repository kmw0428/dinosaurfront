import React, { useState, useEffect } from "react";
import { getCurrentUser } from "../../services/AutoService";


const Profile = () => {
    interface User {
        id: number;
        username: string;
        email: string;
        roles: string[];
      }
      
      const [currentUser, setCurrentUser] = useState<User | null>(null);
    
  useEffect(() => {
    const user = getCurrentUser();
    setCurrentUser(user);
  }, []);

  if (!currentUser) {
    return <div>Loading...</div>; // 혹은 로딩 상태를 나타내는 다른 UI를 여기에 표시할 수 있습니다.
  }

  return (
    <div className="container">
      <header className="jumbotron">
        <h3>
          <strong>{currentUser.username}</strong> Profile
        </h3>
      </header>
      <p>
        <strong>Id:</strong> {currentUser.id}
      </p>
      <p>
        <strong>Email:</strong> {currentUser.email}
      </p>
      <strong>Authorities:</strong>
      <ul>
        {currentUser.roles &&
          currentUser.roles.map((role, index) => <li key={index}>{role}</li>)}
      </ul>
      <a href="/todolist">To Do List</a>
    </div>
  );
};

export default Profile;