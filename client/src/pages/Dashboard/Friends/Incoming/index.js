import React from "react";

const Incoming = ({data}) => {
    console.log(data);
    return <div className="mt-4">
    <h2 className="text-center">Incoming Friend Requests</h2>
    {
        data.me && data.me.friendRequests ? <ul>
            {data.me.friendRequests
                .filter(f=>f.recipient._id === data.me._id)
                .map((f)=>{
                return <li key={f._id}>
                    {f.requestor.username}
                    {/* Add confirm friend functionality, use confirm friend mutation with f._id */}
                    <button className="btn btn-success ms-4">Confirm</button>
                    {/* Add cancel friend functionality, use cancel friend mutation with f._id */}
                    <button className="btn btn-danger ms-4">Decline</button>
                </li>
            })}
        </ul>:
        <div>No friends</div>
    }
  </div>;
}

export default Incoming;