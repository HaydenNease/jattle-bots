import { useMutation } from "@apollo/client";
import React, { useState } from "react";
import { ADD_CHALLENGE } from "../../../../utils/mutations";
import words from "../../../../utils/words";


const CurrentFriends = ({data}) => {
    const [word,setWord] = useState('');
    const [wordError,setWordError] = useState(false);
    const [addChallenge] = useMutation(ADD_CHALLENGE);
    console.log(data)

    const handleChange = e => {
        const text = e.target.value.toLowerCase();
        console.log(text)
        if(!text) {
            setWordError(false);
            return;
        }
        if(!words.includes(text)||text.length!==5) {
            setWordError(true);
            return;
        }
        setWord(text);
        setWordError(false);
    }

    const handleAccept = async (_id) => {
        console.log(wordError,word.length)
        if(wordError||word.length!==5) return;
        const res = await addChallenge({
            variables: {
                inviteeId: _id,
                challengerWord: word
            }
        });
        console.log(res)
    }

    return <div className="mt-4">
    <h2 className="text-center">Friends</h2>
    {
        data.me && data.me.friends ? <ul>
            {data.me.friends.map((f)=>{
                return <li key={f._id}>
                    {f.username}
                    {/* Add challenge friend functionality, use challenge friend mutation with f._id */}
                    <input 
                        className={wordError?"text-danger":"text-success"}
                        placeholder="5 letter word"
                        onChange={handleChange}
                    ></input>
                    <button 
                        className="btn btn-warning ms-4"
                        onClick={()=>handleAccept(f._id)}
                    >Challenge</button>
                </li>
            })}
        </ul>:
        <div>No friends</div>
    }
  </div>;
}

export default CurrentFriends;