import React, { useCallback, useEffect, useRef, useState } from "react";
import { Button, Form, Input } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { postRequestAction } from "../reducers/post";

const PostForm = () => {
  const dispatch = useDispatch();
  const [text, setText] = useState("");
  const { imagePaths, isAddingPost, postAdded } = useSelector(
    (state) => state.post
  );
  useEffect(() => {
    setText("");
  }, [postAdded === true]);

  const imageInput = useRef();
  const onClickImageUpload = useCallback(() => {
    imageInput.current.click();
  }, [imageInput.current]);

  const onSubmitForm = useCallback(() => {
    dispatch(postRequestAction(text));
  }, [text]);

  const onChangeText = useCallback((e) => {
    setText(e.target.value);
  }, []);

  return (
    <>
      <Form
        encType="multipart/form-data"
        style={{ padding: 10 }}
        onFinish={onSubmitForm}
      >
        <div>
          <Input.TextArea
            maxLength={140}
            placeholder="어떤 신기한 일이 있었나요?"
            value={text}
            onChange={onChangeText}
          ></Input.TextArea>
          <div>
            <input type="file" multiple hidden ref={imageInput} />
            <Button onClick={onClickImageUpload}>이미지 업로드</Button>
            <Button
              type="primary"
              style={{ float: "right" }}
              htmlType="submit"
              loading={isAddingPost}
            >
              짹짹
            </Button>
          </div>
        </div>
        <div>
          {imagePaths.map((v) => {
            return (
              <div key={v} style={{ display: "inline-block" }}>
                <img
                  src={`http://localhost:3000/${v}`}
                  style={{ width: "200px" }}
                  alt={v}
                />
                <div>
                  <Button>제거</Button>
                </div>
              </div>
            );
          })}
        </div>
      </Form>
    </>
  );
};

export default PostForm;
