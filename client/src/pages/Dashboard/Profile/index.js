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
    const [successMessage,setSuccessMessage] = useState("");
    const [currentTab, setCurrentTab] = useState('Landing');
    const [search,setSearch] = useState('');
    const { loading, error, data } = useQuery(QUERY_ME); 
    const [searchUsers, {loading: loadingUsers, data: searchedData}] = useLazyQuery(SEARCH_USERS);
    const [addFriend, {loading: loadAdding, data: addingData}] = useMutation(ADD_FRIEND);

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

    const onChange = (e) => {
        setSearch(e.target.value)
    }

    const onSearch = async () => {
        await searchUsers({
            variables:  {term: search}
        });
    }

    const sendRequest = async (_id) => {
        const res = await addFriend({
            variables: {recipient: _id}
        });
        setSuccessMessage(res.data.createFriendRequest);
    }
    
    console.log(searchedData);
    return (
        <div className="bg-dark">
            <Container className="bg-white border-dark border-0 rounded">
                <Row>
                    <Col className='container-fluid text-center'>
                        <h1>{data?.me.username}'s Profile</h1>
                    </Col>
                </Row>
                <Row>
                    <Col className='text-center'>
                        <button 
                            className='btn btn-secondary'
                            onClick={()=>setCurrentTab("Landing")}
                        >
                            Landing
                        </button>
                    </Col>
                    <Col className='text-center'>
                        <button 
                            className='btn btn-secondary'
                            onClick={()=>setCurrentTab("Friends")}
                        >
                            Friends
                        </button>
                    </Col>
                    <Col className='text-center'>
                        <button 
                            className='btn btn-secondary'
                            onClick={()=>setCurrentTab("History")}
                        >
                            History
                        </button>
                    </Col>
                </Row>
                <Row className='p-2'>
                    <input className='' placeholder='Search User' onChange={onChange}>
                    
                    </input>
                    <div className='text-success'>{successMessage}</div>
                    {
                        searchedData && !loadingUsers && searchedData.searchUsers.map(d=>{
                            return <Row key={d._id} className="m-auto my-2 p-2 border border-1 rounded">
                                <Col>
                                    Username: {d.username}
                                </Col>
                                <Col>
                                    <button className='btn btn-success' onClick={()=>sendRequest(d._id)}>
                                        Add Friend
                                    </button>
                                </Col>
                            </Row>
                        })
                    }
                    <button className='btn btn-info' onClick={onSearch}>
                        Add User
                    </button>
                </Row>
                <Row>
                    {renderPage()}
                </Row>
            </Container>
        </div>
    );
}

export default Profile;