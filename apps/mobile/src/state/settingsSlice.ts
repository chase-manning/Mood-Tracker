import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";

const FREE_TAG_LIMIT = 5;

/* TYPES */
export enum Mode {
  Default,
  Dark,
  Light,
}

export interface SettingsState {
  remindersEnabled: boolean;
  randomReminders: boolean;
  frequencyMinutesMin: number;
  frequencyMinutesMax: number;
  nextNotification: string;
  feelings: string[];
  activities: string[];
  places: string[];
  people: string[];
  colorPrimary: string;
  colorSecondary: string;
  mode: Mode;
  timezone: string;
}

const initialState: SettingsState = {
  remindersEnabled: true,
  randomReminders: false,
  frequencyMinutesMin: 7 * 60,
  frequencyMinutesMax: 7 * 60,
  nextNotification: new Date(2040, 1, 1).toString(),
  feelings: ["Happy", "Love", "Anxious", "Sad"],
  activities: [
    "Working",
    "Watching TV",
    "Doing Housework",
    "Browsing Social Media",
  ],
  places: ["Home", "Work", "School", "The Mall"],
  people: ["Friends", "Family", "Myself", "Strangers"],
  colorPrimary: "#4071fe",
  colorSecondary: "#ff6584",
  mode: Mode.Default,
  timezone: "Asia/Shanghai",
};

/* SLICE */
export const settingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    setSettings: (state, action: PayloadAction<SettingsState>) => {
      if (action.payload.remindersEnabled)
        state.remindersEnabled = action.payload.remindersEnabled;
      if (action.payload.randomReminders)
        state.randomReminders = action.payload.randomReminders;
      if (action.payload.frequencyMinutesMin)
        state.frequencyMinutesMin = action.payload.frequencyMinutesMin;
      if (action.payload.frequencyMinutesMax)
        state.frequencyMinutesMax = action.payload.frequencyMinutesMax;
      if (action.payload.nextNotification)
        state.nextNotification = action.payload.nextNotification;
      if (action.payload.feelings) state.feelings = action.payload.feelings;
      if (action.payload.activities)
        state.activities = action.payload.activities;
      if (action.payload.places) state.places = action.payload.places;
      if (action.payload.people) state.people = action.payload.people;
      if (action.payload.colorPrimary)
        state.colorPrimary = action.payload.colorPrimary;
      if (action.payload.colorSecondary)
        state.colorSecondary = action.payload.colorSecondary;
      if (action.payload.mode) state.mode = action.payload.mode;
      if (action.payload.timezone) state.timezone = action.payload.timezone;
    },
    toggleRemindersEnabled: (state) => {
      state.remindersEnabled = !state.remindersEnabled;
    },
    toggleRandomReminders: (state) => {
      state.randomReminders = !state.randomReminders;
      if (!state.randomReminders)
        state.frequencyMinutesMax = state.frequencyMinutesMin;
    },
    setFrequencyMinutesMin: (state, action: PayloadAction<number>) => {
      state.frequencyMinutesMin = action.payload;
    },
    setFrequencyMinutesMax: (state, action: PayloadAction<number>) => {
      state.frequencyMinutesMax = action.payload;
    },
    updateNextNotification: (state) => {
      let randomNumber: number = Math.random();
      let minutesAdded: number =
        state.frequencyMinutesMin * randomNumber +
        state.frequencyMinutesMax * (1 - randomNumber);

      let now: Date = new Date();
      state.nextNotification = new Date(
        now.getTime() + minutesAdded * 60000
      ).toString();
    },
    addFeeling: (state, action: PayloadAction<string>) => {
      state.feelings.push(action.payload);
    },
    removeFeeling: (state, action: PayloadAction<string>) => {
      const index = state.feelings.indexOf(action.payload);
      if (index > -1) state.feelings.splice(index, 1);
    },
    addActivity: (state, action: PayloadAction<string>) => {
      state.activities.push(action.payload);
    },
    removeActivity: (state, action: PayloadAction<string>) => {
      const index = state.activities.indexOf(action.payload);
      if (index > -1) state.activities.splice(index, 1);
    },
    addPlace: (state, action: PayloadAction<string>) => {
      state.places.push(action.payload);
    },
    removePlace: (state, action: PayloadAction<string>) => {
      const index = state.places.indexOf(action.payload);
      if (index > -1) state.places.splice(index, 1);
    },
    addPerson: (state, action: PayloadAction<string>) => {
      state.people.push(action.payload);
    },
    removePerson: (state, action: PayloadAction<string>) => {
      const index = state.people.indexOf(action.payload);
      if (index > -1) state.people.splice(index, 1);
    },
    setColorPrimary: (state, action: PayloadAction<string>) => {
      state.colorPrimary = action.payload;
    },
    setColorSecondary: (state, action: PayloadAction<string>) => {
      state.colorSecondary = action.payload;
    },
    toggleMode: (state) => {
      if (state.mode === Mode.Dark) state.mode = Mode.Light;
      else state.mode = Mode.Dark;
    },
    setTimezone: (state) => {
      let timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
      if (timezone && timezone.length > 1) state.timezone = timezone;
    },
  },
});

export const {
  toggleRemindersEnabled,
  toggleRandomReminders,
  setFrequencyMinutesMin,
  setFrequencyMinutesMax,
  updateNextNotification,
  setSettings,
  addFeeling,
  removeFeeling,
  addActivity,
  removeActivity,
  addPlace,
  removePlace,
  addPerson,
  removePerson,
  setColorPrimary,
  setColorSecondary,
  toggleMode,
  setTimezone,
} = settingsSlice.actions;

/* SELECTS */
export const selectSettings = (state: RootState) => state.settings;
export const selectRemindersEnabled = (state: RootState) =>
  state.settings.remindersEnabled;
export const selectRandomReminders = (state: RootState) =>
  state.settings.randomReminders;
export const selectFrequencyMinutesMin = (state: RootState) =>
  state.settings.frequencyMinutesMin;
export const selectFrequencyMinutesMax = (state: RootState) =>
  state.settings.frequencyMinutesMax;
export const selectNextNotification = (state: RootState) =>
  state.settings.nextNotification;
export const selectFeelings = (state: RootState) => state.settings.feelings;
export const selectPlaces = (state: RootState) => state.settings.places;
export const selectActivities = (state: RootState) => state.settings.activities;
export const selectPeople = (state: RootState) => state.settings.people;
export const selectColorPrimary = (state: RootState) =>
  state.settings.colorPrimary;
export const selectColorSecondary = (state: RootState) =>
  state.settings.colorSecondary;
export const selectMode = (state: RootState) => state.settings.mode;
export const selectBlockFeelings = (state: RootState) =>
  !state.premium.isPremium && state.settings.feelings.length >= FREE_TAG_LIMIT;
export const selectBlockPlaces = (state: RootState) =>
  !state.premium.isPremium && state.settings.places.length >= FREE_TAG_LIMIT;
export const selectBlockActivities = (state: RootState) =>
  !state.premium.isPremium &&
  state.settings.activities.length >= FREE_TAG_LIMIT;
export const selectBlockPeople = (state: RootState) =>
  !state.premium.isPremium && state.settings.people.length >= FREE_TAG_LIMIT;

export default settingsSlice.reducer;
