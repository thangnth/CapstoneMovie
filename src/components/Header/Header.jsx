import React from "react";
import { useUserContext } from "../../contexts/UserContext/UserContext";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";


export default function Header() {
  const { currentUser, handleSignOut } = useUserContext();
  return (
    <>
      <Navbar collapseOnSelect expand="lg" className="header">
        <Container>
          <Navbar.Brand className="logo fw-bold">NEW MOVIE</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link className="nav"href="/">Trang chủ</Nav.Link>
              <Nav.Link className="nav"href="/#systems-cinemas-showtimes">Lịch chiếu</Nav.Link>
              <Nav.Link className="nav"href="/#systems-cinemas-showtimes">Cụm rạp</Nav.Link>
              <Nav.Link className="nav"href="/">Liên hệ</Nav.Link>
            </Nav>
            {currentUser ? (
              <Nav className="">
                <p className="me-2 mt-3">{currentUser.taiKhoan}</p>
                <button type="button" className="btn text-primary" onClick={handleSignOut}>
                <i className="me-1 bi bi-box-arrow-right"></i>
                  Đăng xuất
                </button> 
              </Nav>
            ) : (
              <Nav>
                <Nav.Link href="/sign-in">
                  <i className="bi bi-person-circle me-1"></i>Đăng Nhập
                </Nav.Link>
                <Nav.Link eventKey={2} href="/sign-up">
                  <i className="bi bi-person-circle me-1"></i>Đăng ký
                </Nav.Link>
              </Nav>
            )}
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}
