import React from "react";
import { Route, Routes } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import Navbar from "./view/Main/Navbar";
import LoginPage from "./view/Signup/index";
import EmpPage from "./view/Employee/Emp_List";
import EmpEdit from "./view/Employee/Emp_Edit";
import EmpAdd from "./view/Employee/Emp_Add";
import DinoPage from "./view/Dinosaur/Dino_List";
import DinoEdit from "./view/Dinosaur/Dino_Edit";
import DinoAdd from "./view/Dinosaur/Dino_Add";
import MainPage from "./view/Main/Main";
import TodoListPage from "./view/Employee/Emp_ToDoList";
import DashBoardPage from "./view/Admin/DashBoard";
import ProfilPage from "./view/Profile/Profile";
import DinoHealth from "./view/Admin/DinoHealth";
import DinoFeed from "./view/Admin/DinoFeed";
import ParkSafety from "./view/Admin/ParkSafety";
import Email from "./view/Admin/Email";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/emp" element={<EmpPage />} />
        <Route element={<ProtectedRoute roles={['ROLE_ADMIN']} />}>
          <Route path="/emp/edit/:id" element={<EmpEdit />} />
        </Route>
        <Route element={<ProtectedRoute roles={['ROLE_ADMIN']} />}>
          <Route path="/emp/add" element={<EmpAdd />} />
        </Route>
        <Route path="/dino" element={<DinoPage />} />
        <Route element={<ProtectedRoute roles={['ROLE_ADMIN']} />}>
          <Route path="/dino/edit/:id" element={<DinoEdit />} />
        </Route>
        <Route element={<ProtectedRoute roles={['ROLE_ADMIN']} />}>
          <Route path="/dino/add" element={<DinoAdd />} />
        </Route>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<MainPage />} />
        <Route element={<ProtectedRoute roles={['ROLE_ADMIN', 'ROLE_MODERATOR']} />}>
          <Route path="/todolist" element={<TodoListPage />} />
        </Route>
        <Route path="/admin" element={<DashBoardPage />} />
        <Route element={<ProtectedRoute roles={['ROLE_ADMIN', 'ROLE_MODERATOR']} />}>
          <Route path="/admin/safety-inspections" element={<ParkSafety />} />
        </Route>
        <Route element={<ProtectedRoute roles={['ROLE_ADMIN', 'ROLE_MODERATOR']} />}>
          <Route path="/admin/health-records" element={<DinoHealth />} />
        </Route>
        <Route element={<ProtectedRoute roles={['ROLE_ADMIN', 'ROLE_MODERATOR']} />}>
          <Route path="/admin/feeding-schedules" element={<DinoFeed />} />
        </Route>
        <Route element={<ProtectedRoute roles={['ROLE_ADMIN']} />}>
          <Route path="/admin/email" element={<Email />} />
        </Route>
        <Route path="/profile" element={<ProfilPage />} />
      </Routes>
    </>
  );
}

export default App;
