import React, { useState } from "react";
import EmojiEventsOutlined from "@material-ui/icons/EmojiEventsOutlined";
import TimelineOutlined from "@material-ui/icons/TimelineOutlined";
import AddOutlined from "@material-ui/icons/AddOutlined";
import BarChart from "@material-ui/icons/BarChart";
import MenuOutlined from "@material-ui/icons/MenuOutlined";
import styled from "styled-components";
import {
  Tab,
  selectActiveTab,
  setActiveTab,
  showMood,
} from "../../state/navigationSlice";
import { useSelector, useDispatch } from "react-redux";
import { selectBlockMoods } from "../../state/dataSlice";
import PremiumPopup from "./PremiumPopup";

const StyledNavBar = styled.div`
  position: fixed;
  left: 0;
  bottom: 0;
  height: 60px;
  width: calc(100% - 20px);
  background-color: var(--bg-top);
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  box-shadow: var(--shadow);
  margin: 10px;
  border-radius: 15px;
`;

type NavItemProps = {
  isActive: boolean;
};

const NavItem = styled.button`
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
  margin: auto;
  text-decoration: none;
  transition: all 0.2s ease-in-out;
  color: ${(props: NavItemProps) => {
    return props.isActive ? "var(--primary)" : "var(--sub)";
  }};
`;

const CircleContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Circle = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 40px;
  display: flex;
  border-radius: 50%;
  background-color: var(--primary);
  color: var(--bg);
  box-shadow: var(--shadow);
`;

class State {
  blockMoodsPopupOpen: boolean = false;
}

const NavBar = () => {
  const [state, setState] = useState(new State());
  const activeTab = useSelector(selectActiveTab);
  const dispatch = useDispatch();
  const blockMoods = useSelector(selectBlockMoods);

  return (
    <StyledNavBar>
      <NavItem
        isActive={activeTab === Tab.Profile}
        onClick={() => dispatch(setActiveTab(Tab.Profile))}
      >
        <EmojiEventsOutlined />
      </NavItem>
      <NavItem
        isActive={activeTab === Tab.Entries}
        onClick={() => dispatch(setActiveTab(Tab.Entries))}
      >
        <TimelineOutlined />
      </NavItem>
      <CircleContainer
        onClick={() => {
          if (blockMoods) setState({ ...state, blockMoodsPopupOpen: true });
          else dispatch(showMood());
        }}
      >
        <Circle>
          <AddOutlined />
        </Circle>
      </CircleContainer>
      <NavItem
        isActive={activeTab === Tab.Stats}
        onClick={() => dispatch(setActiveTab(Tab.Stats))}
      >
        <BarChart />
      </NavItem>
      <NavItem
        isActive={activeTab === Tab.Settings}
        onClick={() => dispatch(setActiveTab(Tab.Settings))}
      >
        <MenuOutlined />
      </NavItem>

      <PremiumPopup
        header={"Daily Mood Limit Exceeded"}
        description={
          "You have run out of moods for today. Wait until tomorrow or get Haply Premium to unlock unlimited moods"
        }
        open={state.blockMoodsPopupOpen}
        close={() =>
          setState({
            ...state,
            blockMoodsPopupOpen: false,
          })
        }
      />
    </StyledNavBar>
  );
};

export default NavBar;
