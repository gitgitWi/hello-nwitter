import React from "react";
import styled from "@emotion/styled";

const StyledAppWrapper = styled.div`
  font-display: san-serif;
  text-align: center;
`;

export default function App() {
  return (
    <StyledAppWrapper>
      <h1>Hello CodeSandbox</h1>
      <h2>Start editing to see some magic happen!</h2>
    </StyledAppWrapper>
  );
}
