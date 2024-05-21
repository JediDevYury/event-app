import {View, Button, StyleSheet} from 'react-native';
import Colors from "@/constants/Colors";
import {useAuth} from "@/providers/AuthProvider";

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const Events = () => {
  const {onLogout} = useAuth();

  return (
   <View style={styles.wrapper}>
     <Button title="Logout" onPress={onLogout} color={Colors.primary} />
   </View>
  );
};

export default Events;
