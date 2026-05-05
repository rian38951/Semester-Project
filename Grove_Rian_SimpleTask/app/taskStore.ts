import { useState } from "react";

export type Task = {
  id: string;
  text: string;
  completed: boolean;
  image?: string | null;
};

// simple shared state
let tasks: Task[] = [];

let listeners: ((tasks: Task[]) => void)[] = [];

export const addTask = (task: Task) => {
  tasks = [task, ...tasks];
  listeners.forEach((listener) => listener(tasks));
};

export const toggleTask = (id: string) => {
  tasks = tasks.map((task) =>
    task.id === id ? { ...task, completed: !task.completed } : task
  );
  listeners.forEach((listener) => listener(tasks));
};

export const useTasks = () => {
  const [state, setState] = useState(tasks);

  const subscribe = (callback: (tasks: Task[]) => void) => {
    listeners.push(callback);
    return () => {
      listeners = listeners.filter((l) => l !== callback);
    };
  };

  useState(() => {
    const unsubscribe = subscribe(setState);
    return unsubscribe;
  });

  return state;
};