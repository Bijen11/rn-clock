import {MotiView} from 'moti';
import {useEffect} from 'react';
import 'react-native-reanimated';
import {Easing} from 'react-native-reanimated';
import {View, Dimensions, StyleSheet} from 'react-native';
import {DarkTheme, DefaultTheme, ThemeProvider} from '@react-navigation/native';

import {Stack} from 'expo-router';
import {useFonts} from 'expo-font';
import {Feather} from '@expo/vector-icons';
import * as SplashScreen from 'expo-splash-screen';

import {useColorScheme} from '@/hooks/useColorScheme';

const {width} = Dimensions.get('screen');

const SIZE = width * 0.9;

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <View style={style.container}>
      <View style={[style.bigQuadran]} />
      <View style={[style.mediumQuadran]} />
      <View style={[style.smallQuadran]} />

      <View style={[style.mover]}>
        <View style={[style.hours]} />
      </View>

      <View style={[style.mover]}>
        <View style={[style.minutes]} />
      </View>

      <View style={[style.mover]}>
        <View style={[style.seconds]} />
      </View>
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  mover: {
    width: SIZE,
    height: SIZE,
    position: 'absolute',
    alignItems: 'center',
    borderRadius: SIZE / 2,
    justifyContent: 'flex-start',
  },
  hours: {
    width: 4,
    height: '35%',
    borderRadius: 4,
    marginTop: '15%',
    position: 'absolute',
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  minutes: {
    width: 3,
    height: '45%',
    borderRadius: 3,
    marginTop: '5%',
    position: 'absolute',
    backgroundColor: 'rgba(0,0,0,0.8)',
  },
  seconds: {
    width: 2,
    height: '50%',
    borderRadius: 2,
    position: 'absolute',
    backgroundColor: 'rgba(277,71,134,1)',
  },
  bigQuadran: {
    width: SIZE * 0.8,
    height: SIZE * 0.8,
    position: 'absolute',
    borderRadius: SIZE * 0.4,
    backgroundColor: 'rgba(200,200,200,0.2)',
  },
  mediumQuadran: {
    width: SIZE * 0.5,
    height: SIZE * 0.5,
    position: 'absolute',
    borderRadius: SIZE * 0.25,
    backgroundColor: 'rgba(200,200,200,0.4)',
  },
  smallQuadran: {
    width: 10,
    height: 10,
    borderRadius: 5,
    position: 'absolute',
    backgroundColor: 'rgba(277,71,134,1)',
  },
});
