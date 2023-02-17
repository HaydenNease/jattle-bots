import React, { useRef } from "react";
import { ACCEPT_FRIEND, DECLINE_FRIEND } from "../../../../utils/mutations";
import { useMutation } from '@apollo/client';

const Incoming = ({ data }) => {
    const [acceptFriend, {error: acceptError, data: acceptData}] = useMutation(ACCEPT_FRIEND);
    const [declineFriend, { error: declineError, data: errorData }] = useMutation(DECLINE_FRIEND);

    // NEED <AcceptButton/>
    

    // const declineSubmit = async (event) => {
    //     event.preventDefault();
    //     await declineFriend(_id: f._id)
    // };
    const handleAccept = async (_id) => {
        const res = await acceptFriend({
            variables: {
                id: _id
            }
        });
        console.log(res);
    }

    const handleDecline = async (_id) => {
        const res = await declineFriend({
            variables: {
                id: _id
            }
        });
        console.log(res);
    }

    return <div className="mt-4">
        <h2 className="text-center">Incoming Friend Requests</h2>
        {
            data.me && data.me.friendRequests ? <ul>
                {data.me.friendRequests
                    .filter(f => f.recipient._id === data.me._id)
                    .map((f) => {
                        return <li key={f._id}>
                            {f.requestor.username}
                            {/* Add confirm friend functionality, use confirm friend mutation with f._id */}
                            <button
                                className="btn btn-success ms-4"
                                onClick={() => handleAccept(f._id)}
                            >
                                Accept
                            </button>
                            {/* Add cancel friend functionality, use cancel friend mutation with f._id */}
                            <button 
                                className="btn btn-danger ms-4"
                                onClick={() => handleDecline(f._id)}
                            >
                                Decline
                            </button>
                        </li>
                    })}
            </ul> :
                <div>No friends</div>
        }
    </div>;
}

export default Incoming;