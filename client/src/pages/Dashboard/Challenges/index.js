import React, {useState} from 'react';
import ActiveGames from './ActiveGames';
import Received from './Received';
import Extended from './Extended';
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

export default function Challenges({data}) {
    console.log(data)
    //const []
    return <Row className='mt-4'>
        <Row>
            <h2>Sent Challenges</h2>

        </Row>
        <hr></hr>

        <Row>
            <h2>Challenge Invitations</h2>
        </Row>
        <hr></hr>

        <Row>
            <h2>Accepted Challenges</h2>
        </Row>
        <hr></hr>

        <Row>
            <h2>Finished Challenges</h2>
        </Row>

    </Row>
  };