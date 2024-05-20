import {Slot} from "expo-router";
import {AuthProvider} from "@/providers/AuthProvider";

const InitialLayout = () => {
  return (<Slot/>)
};

const RootLayout = () => {
  return (
    <AuthProvider>
      <InitialLayout/>
    </AuthProvider>
  );
}

export default RootLayout;
