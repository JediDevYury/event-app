import { Slot, useRouter, useSegments } from 'expo-router';
import { AuthProvider, useAuth } from '@/providers/AuthProvider';
import { useEffect } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Toast from 'react-native-toast-message';

const queryClient = new QueryClient();

const InitialLayout = () => {
  const { token, initialized } = useAuth();
  const router = useRouter();
  const segments = useSegments();

  useEffect(() => {
    if (!initialized) return;

    const inAuthGroup = segments[0] === '(auth)';

    if (token && !inAuthGroup) {
      router.replace('/(auth)/(tabs)/events');
    } else if (!token && inAuthGroup) {
      router.replace('/(public)/login');
    }
  }, [token, initialized]);

  return <Slot />;
};

const RootLayout = () => {
  return (
   <AuthProvider>
     <QueryClientProvider client={queryClient}>
       <InitialLayout />
       <Toast position="top" topOffset={80} />
     </QueryClientProvider>
   </AuthProvider>
  );
};

export default RootLayout;
