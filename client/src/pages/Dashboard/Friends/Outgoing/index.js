import React from "react";

const Outgoing = ({data}) => {
    return <div className="mt-4">
    <h2 className="text-center">Outgoing Friend Requests</h2>
    {
        data.me && data.me.friendRequests ? <ul>
            {data.me.friendRequests
                .filter(f=>f.requestor._id === data.me._id)
                .map((f)=>{
                return <li key={f._id}>
                    {f.recipient.username}
                    {/* Add cancel friend functionality, use cancel friend mutation with f._id */}
                    <button className="btn btn-success ms-4">Accept</button>
                    <button className="btn btn-danger ms-4">Cancel</button>
                </li>
            })}
        </ul>:
        <div>No outgoing friend requests</div>
    }
  </div>;
}

export default Outgoing;