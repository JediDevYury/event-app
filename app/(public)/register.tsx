import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  TextInput,
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator,
  Alert
} from 'react-native';
import React, { useState } from 'react';
import { useAuth } from '@/providers/AuthProvider';
import Colors from '@/constants/Colors';
import { defaultStyles } from '@/constants/Styles';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import { Link } from 'expo-router';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: '15%',
    justifyContent: 'center',
    backgroundColor: Colors.background
  },
  header: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 40,
    color: Colors.lightGrey
  },
  checkboxWrapper: {flexDirection: 'row', justifyContent: 'center', marginTop: 10},
  termsText: {
    color: Colors.white,
    textDecorationColor: Colors.white,
    textDecorationLine: 'underline'
  }
});

const RegisterPage = () => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);

  const { onRegister, onLogin } = useAuth();

  const handleRegistration = async () => {
    try {
      setLoading(true);
      await onRegister!(email, password, name);
      await onLogin!(email, password);
    } catch (error: any) {
      Alert.alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
   <KeyboardAvoidingView
    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    style={styles.container}
   >
     {loading && (
      <View style={defaultStyles.loadingOverlay}>
        <ActivityIndicator size="large" color="#fff" />
      </View>
     )}
     <Text style={styles.header}>
       Create your account for free and start your first event in minutes.
     </Text>

     <TextInput
      placeholder="Name"
      value={name}
      onChangeText={setName}
      style={defaultStyles.inputField}
      inputMode="text"
     />
     <TextInput
      placeholder="Email"
      value={email}
      onChangeText={setEmail}
      style={defaultStyles.inputField}
      inputMode="email"
     />

     <TextInput
      secureTextEntry
      placeholder="Password"
      value={password}
      onChangeText={setPassword}
      style={defaultStyles.inputField}
     />

     <View style={styles.checkboxWrapper}>
       <BouncyCheckbox
        onPress={setTermsAccepted}
        size={25}
        fillColor={Colors.primary}
        unFillColor={Colors.white}
       />
       <View style={{
          flexDirection: 'row',
          alignItems: 'center',
       }}>
         <Text style={{
           color: Colors.white,
         }}>I agree to the </Text>
         <Link href="/(public)/tos" asChild>
           <TouchableOpacity>
             <Text
              style={styles.termsText}
             >
               Terms of Service
             </Text>
           </TouchableOpacity>
         </Link>
       </View>
     </View>

     <TouchableOpacity
      style={defaultStyles.button}
      onPress={handleRegistration}
      disabled={!termsAccepted}
     >
       <Text style={defaultStyles.buttonText}>Sign up</Text>
     </TouchableOpacity>
   </KeyboardAvoidingView>
  );
};

export default RegisterPage;
