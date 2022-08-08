import React from "react";
import PostForm from "../components/PostForm";
import PostCard from "../components/PostCard";
import { useSelector } from "react-redux";

const Home = () => {
  const { me, isLoggedIn } = useSelector((state) => state.user);
  const { mainPosts } = useSelector((state) => state.post);
  return (
    <>
      <div>
        {isLoggedIn ? (
          <div>로그인 했습니다. {me.nickname}</div>
        ) : (
          <div>로그아웃 했습니다.</div>
        )}
        {isLoggedIn && <PostForm />}
        {mainPosts.map((c) => {
          return <PostCard key={c} post={c} />;
        })}
      </div>
    </>
  );
};

export default Home;
