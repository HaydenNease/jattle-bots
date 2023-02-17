export default function Landing({data}) {
  return <div className="mt-4">
    <h2 className="text-center">Here is your landing Page</h2>
    <ul>
      <li>
        Challenges: {data.me.challenges.length}
      </li>
      <li>
        Friend Requests: {data.me.friendRequests.length}
      </li>
      <li>
        Friends: {data.me.friends.length}
      </li>
    </ul>
  </div>
};