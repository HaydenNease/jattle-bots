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
  const [friendsTab, setFriendsTab] = useState("CurrentFriends")
  console.log(data)
  const renderTab = () => {
    switch (friendsTab) {
      case "CurrentFriends":
        return <CurrentFriends data={data} />;
      case "Incoming":
        return <Incoming data={data} />;
      default:
        return <Outgoing data={data} />;
    }
  }
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
      <Row className='mt-4'>
        <Col className='text-center'>
          <button
            className={friendsTab === "CurrentFriends" ? 'btn border border-2 border-primary rounded text-primary bg-light' : 'btn btn-primary'}
            onClick={() => setFriendsTab("CurrentFriends")}
          >
            Friends
          </button>
        </Col>
        <Col className='text-center'>
          <button
            className={friendsTab === "Incoming" ? 'btn border border-2 border-primary rounded text-primary bg-light' : 'btn btn-primary'}
            onClick={() => setFriendsTab("Incoming")}
          >
            Incoming
          </button>
        </Col>
        <Col className='text-center'>
          <button
            className={friendsTab === "Outgoing" ? 'btn border border-2 border-primary rounded text-primary bg-light' : 'btn btn-primary'}
            onClick={() => setFriendsTab("Outgoing")}
          >
            Outgoing
          </button>
        </Col>
        {renderTab()}
      </Row>
    </div>
  )
};