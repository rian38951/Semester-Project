import * as ImagePicker from "expo-image-picker";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  Alert,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { globalStyles } from "./globalStyles";
import { addTask } from "./taskStore";

export default function AddTaskScreen() {
  const [task, setTask] = useState("");
  const [image, setImage] = useState<string | null>(null);
  const router = useRouter();

  const pickImage = async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permission.granted) {
      Alert.alert("Permission required", "Please allow access to photos.");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const saveTask = () => {
    if (task.trim() === "") {
      Alert.alert("Error", "Please enter a task.");
      return;
    }

    // Save task to global store
    addTask({
      id: Date.now().toString(),
      text: task,
      completed: false,
      image: image,
    });

    // Clear inputs
    setTask("");
    setImage(null);

    // Navigate back to Home
    router.replace("/");
  };

  return (
    <View style={globalStyles.container}>
      <Text style={globalStyles.title}>Add a New Task</Text>

      <Text style={{ marginBottom: 10, color: "#555" }}>
        Enter a task and optionally attach an image.
      </Text>

      <TextInput
        style={globalStyles.input}
        placeholder="Enter a task..."
        value={task}
        onChangeText={setTask}
      />

      <TouchableOpacity style={globalStyles.button} onPress={pickImage}>
        <Text style={globalStyles.buttonText}>Pick an Image</Text>
      </TouchableOpacity>

      {image && (
        <Image
          source={{ uri: image }}
          style={{
            width: "100%",
            height: 150,
            marginTop: 15,
            borderRadius: 8,
          }}
        />
      )}

      <TouchableOpacity style={globalStyles.button} onPress={saveTask}>
        <Text style={globalStyles.buttonText}>Save Task</Text>
      </TouchableOpacity>
    </View>
  );
}