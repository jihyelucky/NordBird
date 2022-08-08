import React from "react";
import Link from "next/link";
import { Menu, Input, Row, Col } from "antd";
import PropTypes from "prop-types";
import LoginForm from "./LoginForm";
import UserProfile from "./UserProfile";
import styled from "styled-components";
import { useSelector } from "react-redux";

const AppLayout = ({ children }) => {
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const SearchInput = styled(Input.Search)`
    vertical-align: middle;
  `;
  return (
    <div>
      <Menu mode="horizontal">
        <Menu.Item key="home">
          <Link href="./">
            <a>노드버드</a>
          </Link>
        </Menu.Item>
        <Menu.Item key="profile">
          <Link href="/profile">
            <a>프로필</a>
          </Link>
        </Menu.Item>
        <Menu.Item key="mail">
          <SearchInput enterButton />
        </Menu.Item>
      </Menu>

      <Row gutter={8}>
        <Col xs={24} md={6}>
          {isLoggedIn ? <UserProfile /> : <LoginForm />}
        </Col>
        <Col xs={24} md={12}>
          {children}
        </Col>
        <Col xs={24} md={6}>
          <a
            href="http://www.zerocho.conm"
            target="_blank"
            rel="noopener noreferrer"
          >
            Made by Zecocho
          </a>
        </Col>
      </Row>
    </div>
  );
};

AppLayout.propTypes = {
  children: PropTypes.elementType.isRequired,
};
export default AppLayout;
