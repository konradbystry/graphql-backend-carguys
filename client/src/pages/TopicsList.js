import { AuthContext } from "../context/authContext";
import { useNavigate, useParams, Link } from "react-router-dom";
import { useContext } from "react";
import { useQuery } from "@apollo/react-hooks";
import { gql } from "graphql-tag";

const GET_TOPICS = gql`
  query GetTopics {
    getTopics {
      _id
      name
      posts
      premium
      ownerId
    }
  }
`;

function TopicsList() {
  const { loading, error, data } = useQuery(GET_TOPICS);

  if (loading) return <p>loading...</p>;
  if (error) return <p>error</p>;

  return (
    <div>
      {data.getTopics.map((topic) => (
        <Link to={topic._id}>
          <h1>{topic.name}</h1>
        </Link>
      ))}
      <div>
        <Link to="new">
          <h1>Create your own topic</h1>
        </Link>
      </div>
    </div>
  );
}

export default TopicsList;
