import React from "react";
import Head from "next/head";
import AppLayout from "../components/AppLayout";
import "antd/dist/antd.css";
import PropTypes from "prop-types";
import withReduxSaga from "next-redux-saga";
import wrapper from "../store/configureStore";

const NodeBird = ({ Component }) => {
  return (
    <>
      <Head>
        <title>NodeBird</title>
      </Head>
      <AppLayout>
        <Component />
      </AppLayout>
    </>
  );
};

NodeBird.propTypes = {
  Component: PropTypes.elementType.isRequired,
};

export default wrapper.withRedux(withReduxSaga(NodeBird));
