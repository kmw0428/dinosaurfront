import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { logoutUser } from "../../services/AutoService";
import { Navbar, Nav, Form } from "react-bootstrap"; // react-bootstrap에서 필요한 컴포넌트를 import
import "bootstrap/dist/css/bootstrap.min.css"; // Bootstrap CSS
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

function CustomNavbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const MySwal = withReactContent(Swal);
  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem("user");
    setIsLoggedIn(!!user);
  }, []);

  const handleLogout = async () => {
    // 로그아웃 처리 로직 (예: API 호출)
    try {
      await logoutUser();
      console.log("Logout successful");
      localStorage.removeItem("user");
      setIsLoggedIn(false);
      navigate("/");
      MySwal.fire({
        icon: "info",
        title: "Logout Successful!!",
        text: "Good-Bye",
      });
    } catch (error) {
      console.error("Logout failed", error);
      MySwal.fire({
        icon: "error",
        title: "Logout failed",
        text: "Something went wrong",
      });
    }
  };
  return (
    <Navbar bg="light" expand="lg">
      <Navbar.Brand as={Link} to="/">
        <img
          src={process.env.PUBLIC_URL + "/logo_2_1.png"}
          alt="Logo"
          style={{ width: "75px", height: "auto" }}
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
              <Nav.Link as={Link} to="/todolist">
                {JSON.parse(localStorage.getItem("user") || "{}").username ||
                  "Profile"}
              </Nav.Link>
              <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
            </>
          ) : (
            <Nav.Link as={Link} to="/login">
              Login
            </Nav.Link>
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}
export default CustomNavbar;
