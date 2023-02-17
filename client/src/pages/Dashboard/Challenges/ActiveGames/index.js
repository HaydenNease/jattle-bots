import React from "react";

const ActiveGames = ({data}) => {
    return <div className="mt-4">
    <h2 className="text-center">Challenges</h2>
    {
        data.me && data.me.challenges ? <ul>
            {data.me.challenges.map((f)=>{
                <li key={f._id}>
                    {f.username}
                    {/* Add challenge friend functionality, use challenge friend mutation with f._id */}
                    <button className="btn btn-warning ms-4">Acces Active Game</button>
                </li>
            })}
        </ul>:
        <div>No active games</div>
    }
  </div>;
}

export default CurrentFriends;