import { Ionicons } from '@expo/vector-icons';
import { Stack, useRouter } from 'expo-router';
import { TouchableOpacity } from 'react-native';

const Layout = () => {
  const router = useRouter();

  return (
   <Stack>
     <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
   </Stack>
  );
};
