import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import { useAuth } from "./services/AuthContext";
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
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Form from "react-bootstrap/Form";
import "bootstrap/dist/css/bootstrap.min.css"; // Bootstrap CSS

function App() {
  const { isLoggedIn, username, logout } = useAuth();

  return (
    <Router>
      <Navbar bg="light" expand="lg">
        <Navbar.Brand href="/">
          <img 
            src={process.env.PUBLIC_URL + "/logo_2_1.png"}
            alt="Logo"
            style={{ width: '75px', height: 'auto' }}
             />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link as={Link} to="/dino">
              Dinosaur
            </Nav.Link>
            <Nav.Link as={Link} to="/emp">
              Employee
            </Nav.Link>
            <Form className="d-flex">
              <Form.Control
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
              />
              <button className="outline-success">Search</button>
            </Form>
            {isLoggedIn ? (
          <>
            <Nav.Link as={Link} to="/profile">{username}</Nav.Link>
            <Nav.Link onClick={logout}>Logout</Nav.Link>
          </>
        ) : (
          <Nav.Link as={Link} to="/login">Login</Nav.Link>
        )}
      </Nav>
        </Navbar.Collapse>
      </Navbar>
      <Routes>
        <Route path="/emp" element={<EmpPage />} />
        <Route path="/emp/edit/:id" element={<EmpEdit />} />
        <Route path="/emp/add" element={<EmpAdd />} />
        <Route path="/dino" element={<DinoPage />} />
        <Route path="/dino/edit/:id" element={<DinoEdit />} />
        <Route path="/dino/add" element={<DinoAdd />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<MainPage />} />
        <Route path="/todolist/" element={<TodoListPage />} />
        <Route path="/admin" element={<DashBoardPage />} />
      </Routes>
    </Router>
  );
}

export default App;