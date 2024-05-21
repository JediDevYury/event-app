import Colors from '@/constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import { Tabs } from 'expo-router';

export default () => {
  return (
    <Tabs
      screenOptions={{
        tabBarInactiveTintColor: Colors.tabBarInactiveTintColor,
        tabBarActiveTintColor: Colors.orange,
        headerStyle: {
          backgroundColor: Colors.background,
        },
        headerTintColor: Colors.white,
        tabBarBackground: () => (
          <BlurView
           intensity={100}
           tint="dark"
           style={{
             flex: 1,
             backgroundColor: Colors.halfTransparentBlack
           }}
          />
        ),
        tabBarStyle: {
          backgroundColor: "transparent",
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          elevation: 0,
          borderTopWidth: 0,
        },
      }}
    >
      <Tabs.Screen
        name="events"
        options={{
          tabBarLabel: "Events",
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Ionicons
             name="calendar-outline"
             size={size}
             color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
       name="my-events"
       options={{
         tabBarLabel: "My Events",
         headerTitle: "My Events",
         headerShadowVisible: false,
         tabBarIcon: ({ color, size }) => (
          <Ionicons
           name="list-outline"
           size={size}
           color={color}
          />
         ),
       }}
      />
      <Tabs.Screen
       name="profile"
       options={{
         tabBarLabel: "Profile",
         headerTitle: "My Profile",
         headerShadowVisible: false,
         tabBarIcon: ({ color, size }) => (
          <Ionicons
           name="person-circle-outline"
           size={size}
           color={color}
          />
         ),
       }}
      />
    </Tabs>
  );
}
