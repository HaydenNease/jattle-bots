import React from "react";


const Extended = ({data}) => {
    return <div className="mt-4">
    <h2 className="text-center">Extended Challenges</h2>
    {
        data.me && data.me.challenges ? <ul>
            {data.me.challenges
                .filter(f=>f.challenger._id === data.me._id)
                .map((f)=>{
                return <li key={f._id}>
                    {f.invitee.username}
                    {/* Add cancel friend functionality, use cancel friend mutation with f._id */}
                    <button className="btn btn-success ms-4">Accept</button>
                    <button className="btn btn-danger ms-4">Decline</button>
                </li>
            })}
        </ul>:
        <div>No extended challenges awaiting response</div>
    }
  </div>;
}

export default Extended;