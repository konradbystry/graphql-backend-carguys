import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/react-hooks";
import { gql } from "graphql-tag";

const GET_POSTS = gql`
  query Query($topicId: String) {
    getPosts(topicId: $topicId) {
      userId
      topicId
      date
      text
      image
    }
  }
`;

function Topic() {
  const { id } = useParams();
  const { loading, error, data } = useQuery(GET_POSTS, {
    variables: { topicId: id },
  });

  if (loading) return <p>loading...</p>;
  if (error) return <p>error</p>;

  return (
    <div>
      <h1>This is topic {id} page</h1>
      {data.getPosts.map((post) => (
        <h1>{post.text}</h1>
      ))}
    </div>
  );
}

export default Topic;
