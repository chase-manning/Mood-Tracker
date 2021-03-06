import React from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import {
  selectMoodDateSearch,
  hideMoodDateSearch,
  showMood,
} from "../../state/navigationSlice";
import { Button, HideComponentProps } from "../../styles/Shared";
import dateFormat from "dateformat";
import { selectDateSearchMoods } from "../../state/dataSlice";
import NoData from "./NoData";
import Mood from "../../models/mood";
import Entry from "./Entry";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { selectDateSearchMoodsLoading } from "../../state/loadingSlice";
import LoadingSpinner from "./LoadingSpinner";

const StyledMoodDateSearch = styled.div`
  display: ${(props: HideComponentProps) => (props.show ? "flex" : "none")};
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background-color: var(--bg);
  flex-direction: column;
`;

const NavigationHeader = styled.div`
  width: 100%;
  background-color: var(--bg-top);
  display: flex;
  flex-direction: column;
  box-shadow: var(--shadow);
  border-bottom-left-radius: 30px;
  border-bottom-right-radius: 30px;
  position: relative;
`;

const BackButton = styled.button`
  position: absolute;
  left: 0;
  top: 0;
  color: var(--main);
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 35px 25px;
`;

const HeaderText = styled.div`
  width: 100%;
  margin-top: 35px;
  margin-bottom: 25px;
  color: var(--main);
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 18px;
`;

const ScrollContainer = styled.div`
  width: 100%;
  height: 100%;
  overflow: auto;
  position: relative;
`;

const Content = styled.div`
  width: 100%;
  padding: 30px;
  display: flex;
  flex-direction: column;
`;

const ButtonContainer = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 30px;
`;

const MoodDateSearch = () => {
  const dispatch = useDispatch();
  const date = useSelector(selectMoodDateSearch);
  const moods = useSelector(selectDateSearchMoods);
  const loading = useSelector(selectDateSearchMoodsLoading);

  return (
    <StyledMoodDateSearch show={!!date}>
      <NavigationHeader>
        <BackButton onClick={() => dispatch(hideMoodDateSearch())}>
          <ArrowBackIcon />
        </BackButton>
        {date && (
          <HeaderText>{dateFormat(new Date(date), "dS mmmm yyyy")}</HeaderText>
        )}
      </NavigationHeader>
      <ScrollContainer>
        {moods.length > 0 && (
          <Content>
            {moods.map((mood: Mood) => (
              <Entry key={mood.id || mood.value} mood={mood} />
            ))}
          </Content>
        )}
        <NoData
          show={moods.length === 0 && !loading}
          text={
            "No Moods exist for this period. Create a new one with the button below."
          }
        />
        <LoadingSpinner loading={loading} />
      </ScrollContainer>
      <ButtonContainer>
        <Button onClick={() => dispatch(showMood())}>Create Mood</Button>
      </ButtonContainer>
    </StyledMoodDateSearch>
  );
};

export default MoodDateSearch;
