import React, { useCallback, useEffect, useState } from "react";
import { Avatar, Button, Card, Form, Input, List, Comment } from "antd";
import { useSelector, useDispatch } from "react-redux";
import {
  RetweetOutlined,
  HeartTwoTone,
  HeartOutlined,
  MessageOutlined,
  EllipsisOutlined,
} from "@ant-design/icons";
import PropTypes from "prop-types";
import { commentRequestAction } from "../reducers/post";
const PostCard = ({ post }) => {
  const dispatch = useDispatch();
  const [commentFormOpened, setCommentFormOpened] = useState(false);
  const [commentText, setCommentText] = useState("");
  const { me } = useSelector((state) => state.user);
  const { isAddingComment, commentAdded } = useSelector((state) => state.post);
  const id = useSelector((state) => state.user.me?.id);

  const onToggleComnnet = useCallback(() => {
    setCommentFormOpened((prev) => !prev);
  }, []);

  const onSubmitComment = useCallback(() => {
    if (!me) {
      return alert("로그인이 필요합니다.");
    }
    return dispatch(
      commentRequestAction({
        // content: commentText,
        // userId: id,
        postId: post.id,
      })
    );
  }, [me && me.id]);

  const onChangeCommentText = useCallback((e) => {
    setCommentText(e.target.value);
  }, []);

  useEffect(() => {
    setCommentText("");
  }, [commentAdded === true]);

  return (
    <>
      <Card
        key={+post.createdAt}
        cover={post.img && <img alt="example" src={post.img} />}
        actions={[
          <RetweetOutlined type="retweet" key="retweet" />,
          <HeartOutlined type="heart" key="heart" />,
          <MessageOutlined
            type="message"
            key="message"
            onClick={onToggleComnnet}
          />,
          <EllipsisOutlined type="ellipsis" key="ellipsis" />,
        ]}
        extra={<Button>팔로우</Button>}
      >
        <Card.Meta
          avatar={<Avatar>{post.User.nickname[0]}</Avatar>}
          title={post.User.nickname}
          description={post.content}
        />
      </Card>
      {commentFormOpened && (
        <>
          <Form onFinish={onSubmitComment}>
            <Form.Item>
              <Input.TextArea
                rows={4}
                value={commentText}
                onChange={onChangeCommentText}
              />
            </Form.Item>
            <Button type="primary" htmlType="submit" loading={isAddingComment}>
              삐약
            </Button>
          </Form>
          <List
            header={`${post.Comments ? post.Comments.length : 0} 댓글`}
            itemLayout="horizontal"
            dataSource={post.Comments || []}
            renderItem={(item) => (
              <li>
                <Comment
                  author={item.User.nickname}
                  avatar={<Avatar>{item.User.nickname[0]}</Avatar>}
                  content={item.content}
                ></Comment>
              </li>
            )}
          ></List>
        </>
      )}
    </>
  );
};

PostCard.propTypes = {
  post: PropTypes.shape({
    User: PropTypes.object,
    content: PropTypes.string,
    img: PropTypes.string,
    createdAt: PropTypes.object,
  }),
};
export default PostCard;
