import Colors from '@/constants/Colors';
import { useAuth } from '@/providers/AuthProvider';
import { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Button,
  Platform
} from 'react-native';
import {Loader} from "@/components/Loader";
import {Avatar} from "@/components/profile/Avatar";

const env = process.env.NODE_ENV;
let API_URL = process.env.EXPO_PUBLIC_API_URL;
if (env === 'development' && Platform.OS === 'android') {
  API_URL = 'http://10.0.2.2:3000';
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  email: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 20,
  },
});

const Profile = () => {
  const [uploading, setUploading] = useState(false);
  const {getUserData, onLogout} = useAuth();
  const user = getUserData!();

  return (
   <View style={styles.container}>
     <Text>Profile</Text>
     <Loader loading={uploading} />
     <Avatar onUploading={setUploading} />
     <Text style={styles.name}>{user?.name}</Text>
     <Text style={styles.email}>{user?.email}</Text>
     <Button title="Logout" onPress={onLogout} color={Colors.primary} />
   </View>
  );
};
export default Profile;
