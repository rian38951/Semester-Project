import { Link } from "expo-router";
import { useState } from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import { globalStyles } from "./globalStyles";

type Task = {
  id: string;
  text: string;
  completed: boolean;
};

export default function HomeScreen() {
  const [tasks, setTasks] = useState<Task[]>([
    { id: "1", text: "Finish homework", completed: false },
    { id: "2", text: "Study for exam", completed: false },
  ]);

  const toggleTask = (id: string) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task,
      ),
    );
  };

  return (
    <View style={globalStyles.container}>
      <Text style={globalStyles.title}>SimpleTask</Text>
      <Text style={globalStyles.subtitle}>Your daily task list</Text>

      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={globalStyles.card}
            onPress={() => toggleTask(item.id)}
          >
            <Text style={item.completed ? globalStyles.completed : undefined}>
              {item.completed ? "✔ " : ""}
              {item.text}
            </Text>
          </TouchableOpacity>
        )}
      />

      <Link href="/add-task" asChild>
        <TouchableOpacity style={globalStyles.button}>
          <Text style={globalStyles.buttonText}>Add Task</Text>
        </TouchableOpacity>
      </Link>

      <Link href="/info" asChild>
        <TouchableOpacity style={{ marginTop: 10, alignItems: "center" }}>
          <Text>App Info</Text>
        </TouchableOpacity>
      </Link>
    </View>
  );
}
