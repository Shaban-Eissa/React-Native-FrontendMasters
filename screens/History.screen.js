import React from 'react';
import { ScrollView } from 'react-native';

import { useAppContext } from '../App.provider';
import { MoodItemRow } from '../components/MoodItemRow';

export const History = () => {
  const appContext = useAppContext();

  return (
    <ScrollView style={{ marginTop: 15 }}>
      {appContext.moodList
        .slice()
        .reverse()
        .map((item) => (
          <MoodItemRow item={item} key={item.timestamp} />
        ))}
    </ScrollView>
  );
};
