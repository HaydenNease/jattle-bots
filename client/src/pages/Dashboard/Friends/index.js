import React, { useState } from 'react';
import CurrentFriends from './CurrentFriends';
import Incoming from './Incoming';
import Outgoing from './Outgoing';
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useQuery, useLazyQuery, useMutation } from '@apollo/client';
import { QUERY_ME, SEARCH_USERS } from '../../../utils/queries';
import { ADD_FRIEND } from '../../../utils/mutations';

// import { Navigate, useParams } from 'react-router-dom';
// import { useQuery } from '@apollo/client';

// import { useMutation } from '@apollo/client';
// import { ADD_FRIEND, DECLINE_FRIEND, ACCEPT_FRIEND } from '../utils/mutations';

export default function Friends({ data }) {
  const [successMessage, setSuccessMessage] = useState("");
  const [search, setSearch] = useState('');
  const [searchUsers, { loading: loadingUsers, data: searchedData }] = useLazyQuery(SEARCH_USERS);
  const [addFriend, { loading: loadAdding, data: addingData }] = useMutation(ADD_FRIEND);
  const onChange = (e) => {
    setSearch(e.target.value)
  }

  const onSearch = async () => {
    await searchUsers({
      variables: { term: search }
    });
  }

  const sendRequest = async (_id) => {
    const res = await addFriend({
      variables: { recipient: _id }
    });
    setSuccessMessage(res.data.createFriendRequest);
  }
  console.log(data);
  if (!data.friendRequests) {
    console.log('No friend Requests');
  }
  else {
    console.log('Incoming friend request');
  }
  // console.log(data.friendRequests[0]); 
  
  return (
    <div>
      <Row className='p-2'>
        <input className='' placeholder='Search User' onChange={onChange}>

        </input>
        <div className='text-success'>{successMessage}</div>
        {
          searchedData && !loadingUsers && searchedData.searchUsers.map(d => {
            return <Row key={d._id} className="m-auto my-2 p-2 border border-1 rounded">
              <Col>
                Username: {d.username}
              </Col>
              <Col>
                <button className='btn btn-success' onClick={() => sendRequest(d._id)}>
                  Add Friend
                </button>
              </Col>
            </Row>
          })
        }
        <button className='btn btn-info' onClick={onSearch}>
          Search
        </button>
      </Row>
      <Row>
        <Incoming data={data} />;
      </Row>
      <Row>
        <Outgoing data={data} />;
      </Row>
      <Row>
        <CurrentFriends data={data} />
      </Row>
    </div>
  )
};