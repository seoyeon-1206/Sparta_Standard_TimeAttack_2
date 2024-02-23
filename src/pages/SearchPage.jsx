// SearchPage.jsx
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import postsAxios from "../axios/posts";

function SearchPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [posts, setPosts] = useState([]);
  //스탠다드
  const userId = searchParams.get("userId")

  // URL의 쿼리 스트링을 변경하는 함수
  const updateSearch = (userId) => {
    setSearchParams({ userId: userId }) //객체가 들어가요
  };

  // 밑에 부분을 이렇게 then으로 바꿔봄
  useEffect(() => {
    postsAxios.get("/").then((response) => {
      setPosts(response.updateSearch)
    }).catch((error) => {
      console.log(error)
    })
  })

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const { data } = await postsAxios.get('/');
        setPosts(data);
      } catch (error) {
        console.error("포스트를 불러오는데 실패했습니다:", error);
      }
    }
    fetchPosts();
  }, []);

  const filteredPosts = posts.filter((post) => {
    post.writerUserId === Number(userId) //파라미터로 붙는건 항상 string이라 number로 바꿔주기
    //const writerUserId = parseInt(searchParams.get("userId"));
    //return !writerUserId || post.writerUserId === writerUserId;
  })

  return (
    <div>
      <h1>Posting 정보 보기</h1>
      <div>
        {userId ? (
          <p>아이디 {userId}님이 쓰신 글</p>
        ) : (
          <p>아래 두 버튼 중 하나를 선택해주세요.</p>
        )}
      </div>

      <button onClick={() => updateSearch("1")}>1번유저의 글 보기</button>
      <button onClick={() => updateSearch("2")}>2번유저의 글 보기</button>

      {filteredPosts.map((post) => (
        <div key={post.id}>
          <h2>{post.title}</h2>
          <p>{post.author}</p>
          <p>{post.body}</p>
        </div>
      ))}
    </div>
  );
}

export default SearchPage;
