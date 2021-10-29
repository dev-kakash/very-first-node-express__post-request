import React from "react";
import styled from "styled-components";

export const Header = () => {
  return (
    <HeaderStyle>
      <h1>Express.js</h1>
    </HeaderStyle>
  );
};

const HeaderStyle = styled.div`
  height: 6vh;
  background-color: #383e56;
  color: #c36839;
`;
