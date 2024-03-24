import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  LayoutAnimation,
  Image,
} from 'react-native';
import format from 'date-fns/format';

import { theme } from '../theme';

import { useAppContext } from '../App.provider';

export const MoodItemRow = ({ item }) => {
  const appContext = useAppContext();

  const handlePress = React.useCallback(() => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    appContext.handleDeleteMood(item);
  }, [appContext, item]);

  return (
    <View style={styles.moodItem}>
      <View style={styles.iconAndDescription}>
        <Image source={{ uri: item.mood.emoji }} style={styles.moodIcon} />
        <Text style={styles.moodDescription}>{item.mood.description}</Text>
      </View>
      <Text style={styles.moodDate}>
        {format(new Date(item.timestamp), "dd MMM, yyyy 'at' h:mmaaa")}
      </Text>
      <Pressable hitSlop={16} onPress={handlePress}>
        <Text style={styles.deleteButton}>Delete</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  moodItem: {
    backgroundColor: 'white',
    marginBottom: 10,
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 15,
    borderRadius: 10,
  },
  iconAndDescription: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  moodIcon: {
    width: 50,
    height: 50,
  },
  moodDescription: {
    fontSize: 18,
    color: theme.colorPurple,
    fontWeight: 'bold',
  },
  moodDate: {
    textAlign: 'center',
    color: theme.colorLavender,
  },
  deleteButton: {
    color: theme.colorBlue,
  },
});

export default MoodItemRow;
