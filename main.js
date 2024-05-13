import 'react-native-reanimated';
import { useEffect } from 'react';
import { Stack } from 'expo-router';
import { useFonts } from 'expo-font';
import {Feather} from '@expo/vector-icons';
import * as SplashScreen from 'expo-splash-screen';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';

import { View,Text } from 'react-native';
import { useColorScheme } from '@/hooks/useColorScheme';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();


  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }
  
  return (
      <View style={{flex:1, alignItems:'center', justifyContent:'center'}}>   
        <View style={[styles.dot,style.center]}>
          <Feather name='phone-outgoing' size= {32} color='#FFF'/>
          <Text>here</Text>
        </View>
     </View>
  
  );
}

const style= StyleSheet.create({
  dot:{
    width:100,
    height:100,
    borderRadius:100,
    backgroundColor:'#6E01EF'
  },
  center:{alignItems:'center' , justifyContent:'center'}
  
})


