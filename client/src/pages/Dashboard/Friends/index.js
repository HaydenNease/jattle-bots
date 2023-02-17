import React, {useState} from 'react';
import CurrentFriends from './CurrentFriends';
import Incoming from './Incoming';
import Outgoing from './Outgoing';
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
// import { Navigate, useParams } from 'react-router-dom';
// import { useQuery } from '@apollo/client';

// import { useMutation } from '@apollo/client';
// import { ADD_FRIEND, DECLINE_FRIEND, ACCEPT_FRIEND } from '../utils/mutations';


export default function Friends({data}) {
  const [friendsTab,setFriendsTab] = useState("CurrentFriends")
  console.log(data)
  const renderTab = () => {
    switch(friendsTab){
      case "CurrentFriends":
        return <CurrentFriends data={data}/>;
      case "Incoming":
        return <Incoming data={data} />;
      default:
        return <Outgoing data={data} />;
    }
  }
  return <Row className='mt-4'>
  <Col className='text-center'>
      <button 
          className={friendsTab==="CurrentFriends"?'btn border border-2 border-primary rounded text-primary bg-light':'btn btn-primary'}
          onClick={()=>setFriendsTab("CurrentFriends")}
      >
          Friends
      </button>
  </Col>
  <Col className='text-center'>
      <button 
          className={friendsTab==="Incoming"?'btn border border-2 border-primary rounded text-primary bg-light':'btn btn-primary'}
          onClick={()=>setFriendsTab("Incoming")}
      >
          Incoming
      </button>
  </Col>
  <Col className='text-center'>
      <button 
          className={friendsTab==="Outgoing"?'btn border border-2 border-primary rounded text-primary bg-light':'btn btn-primary'}
          onClick={()=>setFriendsTab("Outgoing")}
      >
          Outgoing
      </button>
  </Col>
  {renderTab()}
</Row>
};