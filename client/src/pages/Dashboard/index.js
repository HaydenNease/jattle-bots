import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useQuery } from '@apollo/client';
import Auth from '../../utils/auth';


import { useMutation } from '@apollo/client';
import { QUERY_ME } from '../../utils/queries';
import Landing from './Landing';
import Friends from './Friends';
import History from './History';
import NavTabs from './NavTabs';

export default function Dashboard() {
  const [currentPage, setCurrentPage] = useState('Landing');
  const { loading, error, data } = useQuery(QUERY_ME, {
    variables: {
      id: 'peepee poo poo'
    }
  }); 
  

  // This method is checking to see what the value of `currentPage` is. Depending on the value of currentPage, we return the corresponding component to render.
  const renderPage = () => {
    if (currentPage === 'Friends') {
      return <Friends />;
    }
    if (currentPage === 'Landing') {
      return <Landing />;
    }
    return <History />;    
  };

  const handlePageChange = (page) => setCurrentPage(page);

  return (
    <div className="bg-dark ">    
      <Container className="bg-white border-dark border-0 rounded">
        <Row>
          <Col className='container-fluid'>      
            {renderPage()}
          </Col>
        <NavTabs currentPage={currentPage} handlePageChange={handlePageChange} />
        </Row>
      </Container>
    </div>
  );
}