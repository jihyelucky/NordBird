import React from "react";
import { Card, Avatar, Button } from "antd";
import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logoutRequestAction } from "../reducers/user";

const UserProfile = () => {
  const dispatch = useDispatch();
  const { me, isLoggingOut, Post, Followings, Followers } = useSelector(
    (state) => state.user
  );
  const onLogOut = useCallback(() => {
    dispatch(logoutRequestAction());
  }, []);
  return (
    <>
      <Card
        actions={[
          <div key="twit">
            짹짹
            <br />
            {Post.length}
          </div>,
          <div key="followings">
            팔로잉
            <br />
            {Followings.length}
          </div>,
          <div key="followers">
            팔로워
            <br />
            {Followers.length}
          </div>,
        ]}
      >
        <Card.Meta
          avatar={<Avatar>{me.nickname[0]}</Avatar>}
          title={me.nickname}
        />
        <Button onClick={onLogOut} loading={isLoggingOut}>
          로그아웃
        </Button>
      </Card>
    </>
  );
};

export default UserProfile;
