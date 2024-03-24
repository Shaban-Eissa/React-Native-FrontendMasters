import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Image,
  ImageBackground,
} from 'react-native';
import Reanimated, {
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';

import { theme } from '../theme';

const ReanimatedPressable = Reanimated.createAnimatedComponent(Pressable);

const imageSrcBackground =
  'https://cdn.shopify.com/s/files/1/0070/7032/files/business_20success.jpg?v=1683674387';

const imageSrcIcon =
  'https://t4.ftcdn.net/jpg/05/75/25/11/360_F_575251162_yBFuRNYrfBiuTQrALgABqk1PlDPRnPjV.jpg';

const moodOptions = [
  {
    emoji:
      'https://png.pngtree.com/png-clipart/20221006/ourmid/pngtree-calendar-3d-icon-render-png-image_6275730.png',
    description: 'studious',
    bgColor: '#12551b',
  },
  {
    emoji:
      'https://cdn3d.iconscout.com/3d/premium/thumb/file-8334581-6648107.png',
    description: 'pensive',
    bgColor: '#1B614E',
  },
  {
    emoji:
      'https://cdn3d.iconscout.com/3d/premium/thumb/favorite-folder-7848009-6294060.png',
    description: 'happy',
    bgColor: '#54B391',
  },
  {
    emoji:
      'https://cdn3d.iconscout.com/3d/premium/thumb/checklist-7181066-5807273.png',
    description: 'celebrate',
    bgColor: '#B6E4D0',
  },
  {
    emoji:
      'https://cdn3d.iconscout.com/3d/premium/thumb/mail-check-6985933-5691420.png?f=webp',
    description: 'frustrated',
    bgColor: '#EFFAF5',
  },
];

export const MoodPicker = ({ onSelect }) => {
  const [selectedMood, setSelectedMood] = React.useState();
  const [hasSelected, setHasSelected] = React.useState(false);

  const buttonStyle = useAnimatedStyle(
    () => ({
      opacity: selectedMood ? withTiming(1) : withTiming(0.5),
      transform: [{ scale: selectedMood ? withTiming(1) : 0.8 }],
    }),
    [selectedMood],
  );

  const handleSelect = React.useCallback(() => {
    if (selectedMood) {
      onSelect(selectedMood);
      setSelectedMood(undefined);
      setHasSelected(true);
    }
  }, [onSelect, selectedMood]);

  if (hasSelected) {
    return (
      <View style={styles.BackButtonContainer}>
        <ImageBackground
          source={{ uri: imageSrcBackground }}
          style={styles.BackContainerImageBackground}
        >
          <LinearGradient
            colors={['transparent', '#001']}
            start={[0.1, 0.1]}
            style={styles.linearGradient}
          >
            <Image
              source={{ uri: imageSrcIcon }}
              style={styles.BackContainerImageSrcIcon}
            />
            <Text style={styles.BackContainerTitle}>Submitted!</Text>
            <Text style={styles.BackContainerDescription}>
              I also appreciate the attention to detail and the unique design of
              the app. It is clear that the apparel company puts a lot of
              thought and effort into the design and production of its products.
              - Emily Davis - SEO Expert
            </Text>
            <Pressable
              style={styles.BackButton}
              onPress={() => setHasSelected(false)}
            >
              <Text style={styles.ButtonText}>Go Back</Text>
            </Pressable>
          </LinearGradient>
        </ImageBackground>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.moodList}>
        {moodOptions.map((option) => (
          <View key={option.emoji}>
            <Pressable
              onPress={() => setSelectedMood(option)}
              style={[
                styles.moodItem,
                selectedMood === option && styles.selectedMoodItem,
                { backgroundColor: option.bgColor },
              ]}
            >
              <Image source={{ uri: option.emoji }} style={styles.emojiImage} />
              <Text style={styles.moodDescription}>{option.description}</Text>
            </Pressable>
          </View>
        ))}
      </View>
      <ReanimatedPressable
        style={[styles.ChooseButton, buttonStyle]}
        onPress={handleSelect}
      >
        <Text style={styles.ButtonText}>Choose</Text>
      </ReanimatedPressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    marginTop: 20,
    borderRadius: 30,
    padding: 20,
    justifyContent: 'space-between',
    height: 230,
    backgroundColor: '#fde48e',
    height: 'auto',
  },
  moodList: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 10,
    flexWrap: 'wrap',
    marginTop: 20,
  },
  moodItem: {
    height: 160,
    width: 150,
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    paddingHorizontal: 20,
    borderRadius: 30,
    marginBottom: 5,
    backgroundColor: 'white',
  },
  selectedMoodItem: {
    borderWidth: 2,
    backgroundColor: theme.colorPurple,
    borderColor: theme.colorWhite,
  },
  moodDescription: {
    color: theme.colorPurple,
    fontSize: 14,
    textAlign: 'center',
    fontFamily: theme.fontFamilyBold,
    backgroundColor: 'white',
    paddingHorizontal: 5,
    paddingVertical: 5,
    borderRadius: 20,
    width: '100%',
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 30,
  },
  moodText: {
    fontSize: 24,
  },

  ChooseButton: {
    backgroundColor: 'white',
    width: '100%',
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 20,
    marginTop: 20,
  },
  emojiImage: {
    width: 100,
    height: 100,
  },
  ButtonText: {
    color: 'black',
    textAlign: 'center',
    fontFamily: theme.fontFamilyBold,
  },

  BackButtonContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  linearGradient: {
    width: '100%',
    height: '100%',
    opacity: 1,
    justifyContent: 'flex-end',
    alignItems: 'flex-start',
    paddingBottom: 50,
    backgroundColor: 'rgba(0,0,0,0.6)',
  },
  BackContainerImageBackground: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
  },
  BackContainerTitle: {
    color: 'white',
    fontSize: 50,
    fontFamily: theme.fontFamilyBold,
    paddingHorizontal: 20,
    marginBottom: 10,
    marginTop: 20,
  },
  BackContainerImageSrcIcon: {
    width: 80,
    height: 80,
    borderRadius: 15,
    marginHorizontal: '5%',
  },
  BackContainerDescription: {
    color: 'white',
    paddingHorizontal: 20,
  },
  BackButton: {
    backgroundColor: 'white',
    width: '70%',
    borderRadius: 20,
    paddingHorizontal: 4,
    paddingVertical: 20,
    marginTop: 20,
    marginHorizontal: '5%',
  },
});
