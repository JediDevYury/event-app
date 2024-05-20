import React from 'react';
import { Stack } from 'expo-router';
import Colors from '@/constants/Colors';


const Page = () => {
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: Colors.background,
        },
        headerTintColor: Colors.white,
      }}
    >
      <Stack.Screen name="login" options={{
        headerTitle: 'Magic Events',
      }}/>
      {/*<Stack.Screen name="register" options={{*/}
      {/*  headerTitle: "Create an account",*/}
      {/*  headerBackTitle: 'Login',*/}
      {/*}} />*/}
      {/*<Stack.Screen name="tos" options={{*/}
      {/*  presentation: 'modal',*/}
      {/*  headerShown: false,*/}
      {/*}}/>*/}
    </Stack>
  );
}

export default Page;
