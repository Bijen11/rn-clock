import { MotiView } from 'moti';
import 'react-native-reanimated';
import { useEffect } from 'react';
import { Stack } from 'expo-router';
import { useFonts } from 'expo-font';
import {Feather} from '@expo/vector-icons';
import * as SplashScreen from 'expo-splash-screen';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';

import { View,Text, StyleSheet } from 'react-native';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Easing } from 'react-native-reanimated';

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
  
  const hiddenCircle = (index:number) => {
  return(
    <MotiView 
    from={{opacity:.5, scale : 1}}
    animate={{opacity:0 , scale :4 }}
    key={index} style={[StyleSheet.absoluteFillObject,style.dot ]} 
    transition={{type: 'timing', duration: 2000, easing: Easing. out (Easing.ease), loop : true , delay:index* 400 , repeatReverse:false }}/>

  )  
  }

  return (
    
    <View style={{flex:1, alignItems:'center', justifyContent:'center' ,backgroundColor:'white'}}>   
    <View style={[style.dot,style.center]}>
     
      {[...Array(3).keys()].map((index)=>{
        return(hiddenCircle(index))
      })}
      <MotiView 
        from={{ rotate: '2deg' }}
        animate={{ rotate: '-2deg' }}
        transition={{ type: 'timing', loop: true, repeat: Infinity }}>
        <Feather name='phone-outgoing' size= {32} color='#FFF'/>
      </MotiView>
      
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
