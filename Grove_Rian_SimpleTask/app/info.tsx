import { Text, View } from "react-native";
import { globalStyles } from "./globalStyles";

export default function InfoScreen() {
  return (
    <View style={globalStyles.container}>
      <Text style={globalStyles.title}>About SimpleTask</Text>

      <Text style={{ marginBottom: 15 }}>
        SimpleTask is a basic to-do list app designed to help users keep track
        of daily tasks.
      </Text>

      <Text style={{ marginBottom: 15 }}>
        Users can view tasks, add new tasks, and mark tasks as completed.
      </Text>

      <Text style={{ marginBottom: 15 }}>
        This app was created as a semester project using React Native and Expo.
      </Text>

      <Text style={{ color: "gray", marginTop: 20 }}>
        Designed for students and anyone who wants a simple task list.
      </Text>
    </View>
  );
}
