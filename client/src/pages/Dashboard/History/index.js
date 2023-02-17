import React, {useState} from 'react';
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useMutation } from '@apollo/client';
import { ACCEPT_CHALLENGE, DECLINE_CHALLENGE } from '../../../utils/mutations';


export default function History({data}) {
    const [acceptChallenge] = useMutation(ACCEPT_CHALLENGE);
    const [declineChallenge] = useMutation(DECLINE_CHALLENGE);
    console.log(data);

    const handleAccept = async (_id) =>{
      const res = await acceptChallenge({
        variables: {
          id: _id,
          inviteeWord: "water"
        }
      })
    }

    const handleDecline = async (_id) =>{
      const res = await declineChallenge({
        variables: {
          id: _id
        }
      })
    }
    //const []
    return <Row className='mt-4'>
        <Row>
            <h2>Sent Challenges</h2>
            <ul>
            {
              data
                .me
                .challenges
                .filter(c=>c.challengerId._id===data.me._id && c.status===0)
                .map(c=>{
                    return <li key={c._id} className="border border-2 p-2">
                      <p>Invitee: {c.inviteeId.username}</p>
                      <p>Word: {c.challengerWord}</p>
                      <button className='btn btn-danger' onClick={()=>handleDecline(c._id)}>Cancel</button>
                    </li>
                })
            }
            </ul>
        </Row>
        <hr></hr>

        <Row>
            <h2>Challenge Invitations</h2>
            <ul>
            {
              data
                .me
                .challenges
                .filter(c=>c.inviteeId._id===data.me._id && c.status===0)
                .map(c=>{
                    return <li key={c._id} className="border border-2 p-2">
                      <p>Challenger: {c.challengerId.username}</p>
                      <button className='btn btn-success' onClick={()=>handleAccept(c._id)}>Accept</button>
                      <button className='btn btn-danger' onClick={()=>handleDecline(c._id)}>Decline</button>
                    </li>
                })
            }
            </ul>
        </Row>
        <hr></hr>

        <Row>
            <h2>Accepted Challenges</h2>
            <ul>
            {
              data
                .me
                .challenges
                .filter(c=>c.inviteeId._id===data.me._id && c.status===1)
                .map(c=>{
                    return <li key={c._id} className="border border-2 p-2">
                      <p>Challenger: {c.challengerId.username}</p>
                      <button className='btn btn-info'>Play</button>
                    </li>
                })
            }
            </ul>
        </Row>
        <hr></hr>

        <Row>
            <h2>Finished Challenges</h2>
            <ul>
            {
              data
                .me
                .challenges
                .filter(c=>c.inviteeId._id===data.me._id && c.status===3)
                .map(c=>{
                    return <li key={c._id} className="border border-2 p-2">
                      <p>Challenger: {c.challengerId.username}</p>
                      <p>Word: {c.challengerWord}</p>
                    </li>
                })
            }
            </ul>
        </Row>

    </Row>
  };