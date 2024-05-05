import React from "react";
import styled from "styled-components";

const ErrorContent = styled.h1`
  text-align: center;
  margin: 200px;
  font-size: 64px;
`;

const ErrorPage = () => {
  return <ErrorContent>404</ErrorContent>;
};

export default ErrorPage;
