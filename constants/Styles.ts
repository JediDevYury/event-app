import Colors from '@/constants/Colors';
import { StyleSheet } from 'react-native';

export const defaultStyles = StyleSheet.create({
  button: {
    marginVertical: 15,
    alignItems: 'center',
    backgroundColor: Colors.primary,
    padding: 12,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: Colors.white
  },
  buttonText: {
    color: Colors.white,
    fontWeight: 'bold'
  },
  loadingOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: Colors.blackBright,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000
  },
  inputField: {
    marginVertical: 4,
    height: 50,
    borderWidth: 1,
    borderColor: Colors.inputFieldBorder,
    borderRadius: 4,
    padding: 10,
    backgroundColor: Colors.white
  }
});
