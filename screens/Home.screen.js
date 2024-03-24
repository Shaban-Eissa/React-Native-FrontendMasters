import React from 'react';

import { useAppContext } from '../App.provider';
import { MoodPicker } from '../components/MoodPicker';

export const Home = () => {
  const appContext = useAppContext();

  return <MoodPicker onSelect={appContext.handleSelectMood} />;
};
