import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import { useMutation } from '@apollo/client';
import { ADD_FRIEND, DECLINE_FRIEND, ACCEPT_FRIEND, ADD_CHALLENGE, DECLINE_CHALLENGE } from '../utils/mutations';

export default function Dashboard() {
  const [currentPage, setCurrentPage] = useState('Play');

  // This method is checking to see what the value of `currentPage` is. Depending on the value of currentPage, we return the corresponding component to render.
  const renderPage = () => {
    if (currentPage === 'Friends') {
      return <Friends />;
    }
    if (currentPage === 'Play') {
      return <Play />;
    }
    return <History />;    
  };

  const handlePageChange = (page) => setCurrentPage(page);

  return (
    <div className="bg-dark ">
      {/* We are passing the currentPage from state and the function to update it */}
      <Container className="bg-white border-dark border-0 rounded">
        <Row>
          <Col className='container-fluid'>
            {/* Here we are calling the renderPage method which will return a component  */}
            {renderPage()}
          </Col>
        <NavTabs currentPage={currentPage} handlePageChange={handlePageChange} />
        </Row>
      </Container>
    </div>
  );
}