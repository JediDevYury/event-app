import { Ionicons } from '@expo/vector-icons';
import { Stack, useRouter } from 'expo-router';
import { TouchableOpacity } from 'react-native';
import Colors from "@/constants/Colors";

const Layout = () => {
  const router = useRouter();

  return (
   <Stack>
     <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
     <Stack.Screen
      name="(modals)/new"
      options={{
        presentation: 'transparentModal',
        animation: 'fade',
        headerTransparent: true,
        headerTintColor: Colors.white,
        headerTitle: 'New Event',
        headerLeft: () => (
         <TouchableOpacity onPress={() => router.dismiss()}>
           <Ionicons name="close-outline" size={24} color={Colors.white} />
         </TouchableOpacity>
        )
      }}
     />
   </Stack>
  );
};
export default Layout;
