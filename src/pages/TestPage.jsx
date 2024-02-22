import React from "react";
import commentsAxios from "../axios/comments";
import postsAxios from "../axios/posts";

const TestPage = () => {
  const [posts, setPosts] = React.useState([]);
  const [comments, setComments] = React.useState([]);

  const handleGetPostButtonClick = async () => {
    try {
      // 불러오기 전 comments 초기화
      setComments([])
      const { data } = await postsAxios.get('/');
      setPosts(data);
    } catch (error) {
      console.error("포스트를 불러오는데 실패했습니다:", error);
    }
  };

  const handleGetCommentsButtonClick = async () => {
    try {
      // 불러오기 전 comments 초기화
      setPosts([])
      const { data } = await commentsAxios.get('/');
      setComments(data);
    } catch (error) {
      console.error("댓글을 불러오는데 실패했습니다:", error);
    }
  };

  return (
    <div>
      <h1>Test Page</h1>
      <p>api 테스트를 진행합니다.</p>
      <button onClick={handleGetPostButtonClick}>
        posts가져오기 테스트(로그인필요없음)
      </button>
      <button onClick={handleGetCommentsButtonClick}>
        comments가져오기 테스트(로그인필요)
      </button>

      {posts?.map((post) => (
        <div key={post.id}>
          <h2>{post.title}</h2>
          <p>{post.auth}</p>
        </div>
      ))}

      {comments?.map((comment) => (
        <div key={comment.id}>
          <p>{comment.body}</p>
        </div>
      ))}
    </div>
  );
};

export default TestPage;
