import {
  StyleSheet,
  Image,
  TextInput,
  Button,
  Text,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
} from 'react-native';
import React, { useState } from 'react';
import { Link } from 'expo-router';
import { useAuth } from '@/providers/AuthProvider';
import Colors from '@/constants/Colors';
import { defaultStyles } from '@/constants/Styles';
import { LinearGradient } from 'expo-linear-gradient';
import {Loader} from "@/components/Loader";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: "15%",
    justifyContent: 'center',
    backgroundColor: Colors.background,
  },
  linearGradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    height: '100%',
  },
  logo: {
    width: 200,
    height: 200,
    alignSelf: 'center',
    marginBottom: 40,
  },
});

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { onLogin } = useAuth();

  const handleLogin = async () => {
    setLoading(true);
    try {
      await onLogin!(email, password);
    } catch (error: any) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
   <KeyboardAvoidingView
    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    style={styles.container}
   >
     <LinearGradient
      colors={[Colors.primary, 'transparent']}
      style={styles.linearGradient}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
     />
     <Loader loading={loading}/>
     <Image
      style={styles.logo}
      source={{
        uri: 'https://galaxies.dev/img/mika-transparent.png',
      }}
     />
     <TextInput
      style={defaultStyles.inputField}
      placeholder="Email"
      value={email}
      onChangeText={setEmail}
     />
     <TextInput
      style={defaultStyles.inputField}
      placeholder="Password"
      value={password}
      onChangeText={setPassword}
      secureTextEntry
     />
     <TouchableOpacity style={defaultStyles.button} onPress={handleLogin}>
      <Text style={defaultStyles.buttonText}>Sign In</Text>
     </TouchableOpacity>
     <Link href="/(public)/register" asChild>
      <Button
       title="Create a new account"
       color={Platform.OS !== 'ios' ? Colors.primary : Colors.white}
      />
     </Link>
   </KeyboardAvoidingView>
  )
};

//(public)/register
export default LoginPage;
