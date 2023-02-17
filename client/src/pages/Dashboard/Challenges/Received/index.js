import React from "react";
import { ACCEPT_CHALLENGE, DECLINE_CHALLENGE } from "../../../../utils/mutations";

const Received = ({data}) => {
    console.log(data);
    return <div className="mt-4">
    <h2 className="text-center">Incoming Challenges</h2>
    {
        data.me && data.me.challenges ? <ul>
            {data.me.challenges
                .filter(f=>f.invitee._id === data.me._id)
                .map((f)=>{
                return <li key={f._id}>
                    {f.challenger.username}
                    {/* Add confirm friend functionality, use confirm friend mutation with f._id */}
                    <button className="btn btn-success ms-4">Confirm</button>
                    {/* Add cancel friend functionality, use cancel friend mutation with f._id */}
                    <button className="btn btn-danger ms-4">Decline</button>
                </li>
            })}
        </ul>:
        <div>No challenges awaiting you</div>
    }
  </div>;
}

export default Received;