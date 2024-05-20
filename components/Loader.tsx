import {ActivityIndicator, View} from "react-native";
import {defaultStyles} from "@/constants/Styles";
import Colors from "@/constants/Colors";

type LoaderProps = {
  loading: boolean;
};

export const Loader = ({loading}: LoaderProps) => {
  if(!loading) return null;

  return (
   <View style={defaultStyles.loadingOverlay}>
     <ActivityIndicator size="large" color={Colors.white} />
   </View>
  );
};
