import { useParams } from "react-router-dom";

function UserProfilePage() {
  const { userId } = useParams()
  return <div>User profile page for user {userId}</div>;
}

export default UserProfilePage;
