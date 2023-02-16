import React from 'react';
import './style.css';
// import { useNavigate } from 'react-router-dom';
import Row from "react-bootstrap/Row";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

function NavTabs({ currentPage }) {
  return (
    <Row>
      <Navbar>
        <Nav className="nav-tabs p-0 flex-nowrap">
          <Nav.Item>
            <Nav.Link
              href="/friends"
              className={currentPage === 'Friends' ? 'nav-link active' : 'nav-link'}
            >
              Friends
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link
              href="/"
              className={currentPage === 'Landing' ? 'nav-link active' : 'nav-link'}
            >Dashboard
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link
              href="#history"
              className={currentPage === 'History' ? 'nav-link active' : 'nav-link'}
            >
              History
            </Nav.Link>
          </Nav.Item>
        </Nav>
      </Navbar>
    </Row >
  );
}

export default NavTabs;