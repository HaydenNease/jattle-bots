import React from "react";

const CurrentFriends = ({data}) => {
    return <div className="mt-4">
    <h2 className="text-center">Friends</h2>
    {
        data.me && data.me.friends ? <ul>
            {data.me.friends.map((f)=>{
                <li key={f._id}>
                    {f.username}
                    {/* Add challenge friend functionality, use challenge friend mutation with f._id */}
                    <button className="btn btn-warning ms-4">Challenge</button>
                </li>
            })}
        </ul>:
        <div>No friends</div>
    }
  </div>;
}

export default CurrentFriends;