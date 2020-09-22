import React, { Component } from "react";
import styled from "styled-components";
//import DeleteOutline from "@material-ui/icons/DeleteOutline";
import dateFormat from "dateformat";
import MoodService from "../../services/MoodService";
import { Line } from "../../styles/Line";
import Mood from "../../models/mood";
import { User } from "firebase";
import Popup from "./Popup";
import ChevronRight from "@material-ui/icons/ChevronRight";

const StyledEntry = styled.div`
  width: 100%;
`;

const EntryText = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const EntryHeader = styled.div`
  color: black;
  margin-bottom: 10px;
`;

const EntrySubHeader = styled.div`
  color: var(--sub);
  font-size: 12px;
`;

const PopupContent = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const PopupHeader = styled.div`
  color: var(--main);
  margin-bottom: 20px;
  font-size: 16px;
  width: 100%;
  text-align: center;
`;

const PopupDetails = styled.div`
  color: var(--sub);
  font-size: 14px;
  margin-bottom: 10px;
  display: flex;
`;

const HighlightedWord = styled.p`
  color: var(--main);
  margin-right: 5px;
`;

const Button = styled.button`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: var(--highlight);
  border: solid 1px var(--highlight);
  padding: 17px;
  font-size: 16px;
  font-weight: 400;
  border-radius: 10px;
  background-color: white;
  outline: none;
  margin-top: 20px;
`;

class State {
  popupOpen: boolean = false;
}

type Props = {
  user: User;
  mood: Mood;
  removeMood: (mood: Mood) => void;
};

export default class Entry extends Component<Props> {
  state: State;

  constructor(props: any) {
    super(props);
    this.state = new State();
  }

  async deleteMood(): Promise<void> {
    MoodService.deleteMood(this.props.user, this.props.mood.moodId!);
    this.props.removeMood(this.props.mood);
  }

  render() {
    return (
      <StyledEntry data-testid="Entry">
        <Line onClick={() => this.setState({ popupOpen: true })}>
          <EntryText>
            <EntryHeader>{this.props.mood.description}</EntryHeader>
            <EntrySubHeader>
              {dateFormat(this.props.mood.date, " dddd h:MM tt")}
            </EntrySubHeader>
          </EntryText>
          <EntrySubHeader>
            {this.props.mood.note.substring(0, 20) +
              (this.props.mood.note.length > 20 ? "..." : "")}
          </EntrySubHeader>
          <ChevronRight />
        </Line>
        {this.state.popupOpen && (
          <Popup
            content={
              <PopupContent>
                <PopupHeader>{this.props.mood.description}</PopupHeader>
                <PopupDetails>
                  <HighlightedWord>Mood: </HighlightedWord>
                  {this.props.mood.value}
                </PopupDetails>
                <PopupDetails>
                  <HighlightedWord>Recorded: </HighlightedWord>
                  {dateFormat(this.props.mood.date, "h:MM tt d/m/yy")}
                </PopupDetails>
                {this.props.mood.note.length > 0 && (
                  <PopupDetails>
                    <HighlightedWord>Note: </HighlightedWord>

                    {this.props.mood.note}
                  </PopupDetails>
                )}
                <Button onClick={() => this.deleteMood()}>Delete</Button>
              </PopupContent>
            }
            closePopup={() => this.setState({ popupOpen: false })}
          ></Popup>
        )}
      </StyledEntry>
    );
  }
}
