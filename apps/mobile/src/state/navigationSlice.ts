import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";

/* TYPES */
export enum Tab {
  Profile,
  Entries,
  Stats,
  Settings,
}

interface NavigationState {
  activeTab: Tab;
  moodShowing: boolean;
  loggingIn: boolean;
  premium: boolean;
  error: string;
}

const initialState: NavigationState = {
  activeTab: Tab.Profile,
  moodShowing: false,
  loggingIn: false,
  premium: false,
  error: "",
};

/* SLICE */
export const navigationSlice = createSlice({
  name: "navigation",
  initialState,
  reducers: {
    showMood: (state) => {
      state.moodShowing = true;
    },
    hideMood: (state) => {
      state.moodShowing = false;
    },
    showLogin: (state) => {
      state.loggingIn = true;
    },
    hideLogin: (state) => {
      state.loggingIn = false;
    },
    showPremium: (state) => {
      state.premium = true;
    },
    hidePremium: (state) => {
      state.premium = false;
    },
    setActiveTab: (state, action: PayloadAction<Tab>) => {
      state.activeTab = action.payload;
    },
    showError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
    hideError: (state) => {
      state.error = "";
    },
  },
});

export const {
  showMood,
  hideMood,
  showLogin,
  hideLogin,
  showPremium,
  hidePremium,
  setActiveTab,
  showError,
  hideError,
} = navigationSlice.actions;

/* SELECTS */
export const selectMoodShowing = (state: RootState) =>
  state.navigation.moodShowing;
export const selectLoggingIn = (state: RootState) => state.navigation.loggingIn;

export const selectActiveTab = (state: RootState) => state.navigation.activeTab;
export const selectPremium = (state: RootState) => state.navigation.premium;

export const selectActiveTabText = (state: RootState) => {
  switch (state.navigation.activeTab) {
    case Tab.Profile:
      return "Achievements";
    case Tab.Entries:
      return "Entries";
    case Tab.Stats:
      return "Analytics";
    case Tab.Settings:
      return "Settings";
    default:
      return "Error";
  }
};

export const selectError = (state: RootState) => state.navigation.error;

export default navigationSlice.reducer;
