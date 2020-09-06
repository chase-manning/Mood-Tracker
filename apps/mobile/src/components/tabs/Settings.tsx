import React, { Component } from "react";
import styled from "styled-components";
import { Line } from "../../styles/Line";
import ChevronRight from "@material-ui/icons/ChevronRight";

const StyledSettings = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 0 20px;
`;

const Header = styled.div`
  width: 100%;
  margin-top: 30px;
  margin-bottom: 5px;
  font-size: 16px;
  color: var(--main);
`;

const Label = styled.div`
  color: var(--sub);
  width: 50%;
`;

const Value = styled.div`
  color: var(--main);
  width: 50%;
`;

export default class Settings extends Component {
  render() {
    return (
      <StyledSettings data-testid="Settings">
        <Header>About</Header>
        <Line onClick={() => window.open("https://chasemanning.co.nz/")}>
          <Label>Created By</Label>
          <Value>Chase Manning</Value>
          <ChevronRight />
        </Line>
        <Line
          onClick={() =>
            window.open("https://github.com/chase-manning/Mood-Tracker/")
          }
        >
          <Label>Source Code</Label>
          <Value>GitHub</Value>
          <ChevronRight />
        </Line>
        <Line
          onClick={() =>
            window.open(
              "https://github.com/chase-manning/Mood-Tracker/blob/master/LICENSE"
            )
          }
        >
          <Label>License</Label>
          <Value>MIT</Value>
          <ChevronRight />
        </Line>
      </StyledSettings>
    );
  }
}
