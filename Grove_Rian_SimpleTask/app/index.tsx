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
  const [author, setAuthor] = useState("");
  const [loading, setLoading] = useState(true);

  // ✅ Fetch quote from API
  const fetchQuote = () => {
    setLoading(true);
    fetch("https://zenquotes.io/api/random")
      .then((res) => res.json())
      .then((data) => {
        setQuote(data[0].q);
        setAuthor(data[0].a);
        setLoading(false);
      })
      .catch(() => {
        setQuote("Could not load quote.");
        setAuthor("");
        setLoading(false);
      });
  };

  // ✅ Run when app loads
  useEffect(() => {
    fetchQuote();
  }, []);

  const toggleTask = (id: string) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  return (
    <View style={globalStyles.container}>
      <Text style={globalStyles.title}>SimpleTask</Text>
      <Text style={globalStyles.subtitle}>Your daily task list</Text>

      {/* ✅ Quote Section */}
      <Text style={{ fontStyle: "italic", color: "#555", marginBottom: 5 }}>
        {loading ? "Loading quote..." : `"${quote}"`}
      </Text>

      <Text style={{ color: "#777", marginBottom: 10 }}>
        {author ? `- ${author}` : ""}
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