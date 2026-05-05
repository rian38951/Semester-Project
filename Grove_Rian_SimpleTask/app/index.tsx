import { Link } from "expo-router";
import { useState } from "react";
import { FlatList, Image, Text, TouchableOpacity, View } from "react-native";
import { globalStyles } from "./globalStyles";

type Task = {
  id: string;
  text: string;
  completed: boolean;
  image?: string;
};

export default function HomeScreen() {
  const [tasks, setTasks] = useState<Task[]>([]);

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
      <Text style={globalStyles.subtitle}>Stay organized every day</Text>

      {tasks.length === 0 ? (
        <Text style={globalStyles.emptyText}>
          No tasks yet. Tap "Add Task" to get started!
        </Text>
      ) : (
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

              {item.image && (
                <Image
                  source={{ uri: item.image }}
                  style={{
                    width: "100%",
                    height: 150,
                    marginTop: 10,
                    borderRadius: 8,
                  }}
                />
              )}
            </TouchableOpacity>
          )}
        />
      )}

      <Link href="/add-task" asChild>
        <TouchableOpacity style={globalStyles.button}>
          <Text style={globalStyles.buttonText}>+ Add Task</Text>
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
