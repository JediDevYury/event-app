import React from 'react';
import { Stack } from 'expo-router';
import Colors from '@/constants/Colors';

const Page = () => {
  return (
   <Stack
    screenOptions={{
      headerStyle: {
        backgroundColor: Colors.background
      },
      headerTintColor: Colors.white,
    }}
   >
     <Stack.Screen name="index" options={{ headerTitle: 'Event List' }} />
   </Stack>
  );
};

export default Page;
