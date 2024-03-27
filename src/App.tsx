import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from '../src/view/Signup/index'
import EmpPage from '../src/view/Employee/Emp_List'
import EmpEdit from '../src/view/Employee/Emp_Edit'
import EmpAdd from '../src/view/Employee/Emp_Add'
import DinoPage from '../src/view/Dinosaur/Dino_List'
import DinoEdit from '../src/view/Dinosaur/Dino_Edit';
import DinoAdd from './view/Dinosaur/Dino_Add';
import MainPage from './view/Main/Main';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/emp" element={<EmpPage />} /> 
        <Route path="/emp/edit/:id" element={<EmpEdit /> } />
        <Route path="/emp/add" element={<EmpAdd />} />
        <Route path="/dino" element={<DinoPage />} />
        <Route path="/dino/edit/:id" element={<DinoEdit />} />
        <Route path="/dino/add" element={<DinoAdd />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<MainPage />} />
      </Routes>
    </Router>
  );
}

export default App;
