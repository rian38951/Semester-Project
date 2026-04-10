import { Link } from "expo-router";
import { useEffect, useState } from "react";
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

  // ✅ API state
  const [quote, setQuote] = useState("");
  const [loading, setLoading] = useState(true);

  // ✅ Function to fetch quote
  const fetchQuote = () => {
    setLoading(true);
    fetch("https://api.quotable.io/random")
      .then((res) => res.json())
      .then((data) => {
        setQuote(data.content);
        setLoading(false);
      })
      .catch(() => {
        setQuote("Could not load quote.");
        setLoading(false);
      });
  };

  // ✅ Run on app load
  useEffect(() => {
    fetchQuote();
  }, []);

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

      {/* ✅ API DISPLAY */}
      <Text style={{ marginBottom: 10, fontStyle: "italic", color: "#555" }}>
        {loading ? "Loading quote..." : quote}
      </Text>

      {/* ✅ Refresh Button */}
      <TouchableOpacity onPress={fetchQuote}>
        <Text style={{ color: "#1976D2", marginBottom: 15 }}>
          Refresh Quote
        </Text>
      </TouchableOpacity>

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

      {/* Optional empty state */}
      {tasks.length === 0 && (
        <Text style={{ textAlign: "center", marginTop: 20 }}>
          No tasks yet. Add one!
        </Text>
      )}

      <Link href="/add-task" asChild>
        <TouchableOpacity style={globalStyles.button}>
          <Text style={globalStyles.buttonText}>Add Task</Text>
        </TouchableOpacity>
      </Link>

      <Link href="/info" asChild>
        <TouchableOpacity style={{ marginTop: 10, alignItems: "center" }}>
          <Text style={{ color: "#1976D2", fontWeight: "bold" }}>
            App Info
          </Text>
        </TouchableOpacity>
      </Link>
    </View>
  );
}