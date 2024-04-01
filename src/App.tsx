import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import LoginPage from './view/Signup/index'
import EmpPage from './view/Employee/Emp_List'
import EmpEdit from './view/Employee/Emp_Edit'
import EmpAdd from './view/Employee/Emp_Add'
import DinoPage from './view/Dinosaur/Dino_List'
import DinoEdit from './view/Dinosaur/Dino_Edit';
import DinoAdd from './view/Dinosaur/Dino_Add';
import MainPage from './view/Main/Main';
import TodoListPage from './view/Employee/Emp_ToDoList';
import DashBoardPage from './view/Admin/DashBoard';

function App() {
  return (
    <Router>
      <header>
        <div className="logo">
          <Link to = "/">
          <img src={process.env.PUBLIC_URL + "/yellowLogo.jpg.png"} alt="Logo" />
          </Link>
        </div>
        <nav>
          <a href='/dino'>공룡 목록</a>
          <a href='/emp'>직원 목록</a>
          <a href='/login'>Login & Signup</a>
        </nav>
      </header>
      <footer>
        <p>© 2024 Team2 . All rights reserved.</p>
      </footer>
      <Routes>
        <Route path="/emp" element={<EmpPage />} /> 
        <Route path="/emp/edit/:id" element={<EmpEdit /> } />
        <Route path="/emp/add" element={<EmpAdd />} />
        <Route path="/dino" element={<DinoPage />} />
        <Route path="/dino/edit/:id" element={<DinoEdit />} />
        <Route path="/dino/add" element={<DinoAdd />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<MainPage />} />
        <Route path='/todolist/' element={<TodoListPage />} />
        <Route path='/admin' element={<DashBoardPage />} />
      </Routes>
    </Router>
  );
}

export default App;
