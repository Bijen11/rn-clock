import {Tabs} from 'expo-router';
import React from 'react';

import {TabBarIcon} from '@/components/navigation/TabBarIcon';
import {Colors} from '@/constants/Colors';
import {useColorScheme} from '@/hooks/useColorScheme';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({color, focused}) => (
            <TabBarIcon
              color={color}
              name={focused ? 'home' : 'home-outline'}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="explore"
        options={{
          title: 'Explore',
          tabBarIcon: ({color, focused}) => (
            <TabBarIcon
              color={color}
              name={focused ? 'code-slash' : 'code-slash-outline'}
            />
          ),
        }}
      />
    </Tabs>
  );
}
