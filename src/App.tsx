import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from '../src/view/Signup/index'
import EmpPage from '../src/view/Employee/Emp_List'
import EmpEdit from '../src/view/Employee/Emp_Edit'
import EmpAdd from '../src/view/Employee/Emp_Add'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/emp/edit/:id" element={<EmpEdit /> } />
        <Route path="/emp" element={<EmpPage />} /> 
        <Route path="/login" element={<LoginPage />} />
        <Route path="/emp/add" element={<EmpAdd />} />
      </Routes>
    </Router>

  );
}

export default App;
