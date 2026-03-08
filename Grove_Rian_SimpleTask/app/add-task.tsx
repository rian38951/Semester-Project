import { useRouter } from "expo-router";
import { useState } from "react";
import { Alert, Text, TextInput, TouchableOpacity, View } from "react-native";
import { globalStyles } from "./globalStyles";

export default function AddTaskScreen() {
  const [task, setTask] = useState("");
  const router = useRouter();

  const saveTask = () => {
    if (task.trim() === "") {
      Alert.alert("Please enter a task.");
      return;
    }

    Alert.alert("Task Saved", `"${task}" was added.`);
    setTask("");
    router.push("/");
  };

  return (
    <View style={globalStyles.container}>
      <Text style={globalStyles.title}>Add a New Task</Text>

      <Text style={{ marginBottom: 20 }}>
        Enter a task you want to remember.
      </Text>

      <TextInput
        style={globalStyles.input}
        placeholder="Enter a task..."
        value={task}
        onChangeText={setTask}
      />

      <TouchableOpacity style={globalStyles.button} onPress={saveTask}>
        <Text style={globalStyles.buttonText}>Save Task</Text>
      </TouchableOpacity>
    </View>
  );
}
