import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Friends from "../Friends";
import Landing from "../Landing";
import History from "../History";
import { useQuery, useLazyQuery, useMutation } from '@apollo/client';
import { QUERY_ME, SEARCH_USERS } from '../../../utils/queries';
import { ADD_FRIEND } from '../../../utils/mutations';

const Profile = () => {
    const [currentTab, setCurrentTab] = useState('Landing');
    const { loading, error, data } = useQuery(QUERY_ME); 
   

    console.log(data)
    const renderPage = () => {
        if(loading) {
            return <div>Loading...</div>
        }
        if (currentTab === 'Friends') {
            return <Friends data={data}/>;
        }
        if (currentTab === 'Landing') {
            return <Landing data={data}/>;
        }
        return <History data={data}/>;
    };

    return (
        <div className="bg-dark">
            <Container className="bg-white border-dark border-0 rounded">
                <Row>
                    <Col className='container-fluid text-center'>
                        <h1>{data?.me.username}'s Profile</h1>
                    </Col>
                </Row>                
                <Row>
                    {renderPage()}
                </Row>
                <Row fixed="bottom">
                    <Col className='text-center'>
                        <button 
                            className={currentTab==="Friends"?'btn border border-2 border-secondary rounded text-secondary bg-light':'btn btn-secondary'}
                            onClick={()=>setCurrentTab("Friends")}
                        >
                            Friends
                        </button>
                    </Col>
                    <Col className='text-center'>
                        <button 
                            className={currentTab==="Landing"?'btn border border-2 border-secondary rounded text-secondary bg-light':'btn btn-secondary'}
                            onClick={()=>setCurrentTab("Landing")}
                        >
                            Landing
                        </button>
                    </Col>
                    <Col className='text-center'>
                        <button 
                            className={currentTab==="History"?'btn border border-2 border-secondary rounded text-secondary bg-light':'btn btn-secondary'}
                            onClick={()=>setCurrentTab("History")}
                        >
                            History
                        </button>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default Profile;