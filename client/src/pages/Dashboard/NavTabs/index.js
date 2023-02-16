import React from 'react';
import './style.css';
import Row from "react-bootstrap/Row";
import Nav from "react-bootstrap/Nav";

function NavTabs({ currentPage, handlePageChange }) {
  return (
    <Row>
      <Nav className="nav-tabs bg-dark p-0 flex-nowrap">
        {/* <Nav.Item>
        </Nav.Item> */}
        <Nav.Item>
          <Nav.Link
            href="#friends"
            onClick={() => handlePageChange('Friends')}
            className={currentPage === 'Friends' ? 'nav-link active' : 'nav-link'}
          >
            Friends
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link
            href="#landing"
            onClick={() => handlePageChange('Landing')}
            className={currentPage === 'Landing' ? 'nav-link active' : 'nav-link'}
          >Landing
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link
            href="#history"
            onClick={() => handlePageChange('History')}
            className={currentPage === 'History' ? 'nav-link active' : 'nav-link'}
          >
            History
          </Nav.Link>
        </Nav.Item>
      </Nav>
    </Row >
  );
}

export default NavTabs;