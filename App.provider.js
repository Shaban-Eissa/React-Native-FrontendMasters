import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const storageKey = 'my-app-data';

const getAppData = async () => {
  try {
    const data = await AsyncStorage.getItem(storageKey);

    if (data) {
      return JSON.parse(data);
    }
    return null;
  } catch {
    return null;
  }
};

const setAppData = async (newData) => {
  try {
    await AsyncStorage.setItem(storageKey, JSON.stringify(newData));
  } catch {}
};

const AppContext = React.createContext();

export const AppProvider = ({ children }) => {
  const [moodList, setMoodList] = React.useState([]);

  const handleSelectMood = React.useCallback((mood) => {
    setMoodList((current) => {
      const newValue = [...current, { mood, timestamp: Date.now() }];
      setAppData({ moods: newValue });
      return newValue;
    });
  }, []);

  const handleDeleteMood = React.useCallback((mood) => {
    setMoodList((current) => {
      const newValue = current.filter(
        (item) => item.timestamp !== mood.timestamp,
      );
      setAppData({ moods: newValue });
      return newValue;
    });
  }, []);

  React.useEffect(() => {
    const getDataFromStorage = async () => {
      const data = await getAppData();

      if (data) {
        setMoodList(data.moods);
      }
    };
    getDataFromStorage();
  }, []);

  return (
    <AppContext.Provider
      value={{ moodList, handleSelectMood, handleDeleteMood }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => React.useContext(AppContext);
