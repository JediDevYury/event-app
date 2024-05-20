import { SafeAreaView } from 'react-native';
import { WebView } from 'react-native-webview';

const Page = () => {
  return (
   <SafeAreaView style={{ flex: 1 }}>
     <WebView source={{ uri: 'https://galaxies.dev/terms' }} />
   </SafeAreaView>
  );
};
export default Page;
