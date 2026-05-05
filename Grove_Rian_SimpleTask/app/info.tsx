import { View, Text } from "react-native";
import { globalStyles } from "./globalStyles";

export default function InfoScreen() {
  return (
    <View style={globalStyles.container}>
      <Text style={globalStyles.title}>About SimpleTask</Text>

      <Text style={{ marginBottom: 15 }}>
        SimpleTask helps users stay organized by keeping track of daily tasks.
      </Text>

      <Text style={{ marginBottom: 15 }}>
        Users can create tasks, attach images, and mark them as completed.
      </Text>

      <Text style={{ marginBottom: 15 }}>
        Built using React Native and Expo.
      </Text>

      <Text style={{ color: "gray", marginTop: 20 }}>
        Designed for students and everyday productivity.
      </Text>
    </View>
  );
}