import { AuthContext } from "../context/authContext";
import { useNavigate, useParams } from "react-router-dom";
import { useContext } from "react";

function User() {
  const { id } = useParams();

  return <h1>This is user {id} profile</h1>;
}

export default User;
