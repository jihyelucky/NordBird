import React, { useMemo } from "react";
import { Input, Form, Button } from "antd";

const NicknameEditForm = () => {
  const style = useMemo(
    () => ({
      marginBottom: "20px",
      border: "1px solid #ddd",
      padding: "20px",
    }),
    []
  );
  return (
    <>
      <Form style={style}>
        <Input.Search addonBefore="닉네임" />
        <Button type="primary">수정</Button>
      </Form>
    </>
  );
};

export default NicknameEditForm;
