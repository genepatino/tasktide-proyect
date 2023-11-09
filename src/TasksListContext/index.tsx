import { createContext, useState } from "react";

import {
  activeTasksLocalStorageKey,
  completedTasksLocalStorageKey,
} from "../utils/globalConsts/keyLocalStorage";
import { Task } from "../utils/modelTask";
import { v4 as uuidv4 } from "uuid";

interface TaskChildrenProps {
  children: JSX.Element | JSX.Element[];
}

interface TasksContext {
  inputName: string;
  setInputName: React.Dispatch<React.SetStateAction<string>>;
  handleAddTask: (e: React.FormEvent) => void;
  activeTasks: Task[];
  setActiveTasks: React.Dispatch<React.SetStateAction<Task[]>>;
  completedTasks: Task[];
  setCompletedTasks: React.Dispatch<React.SetStateAction<Task[]>>;
}

export const TasksListContext = createContext<TasksContext>({} as TasksContext);

export const TasksListContextProvider = ({ children }: TaskChildrenProps) => {
  //Declaramos los distintos estados estados o funciones globales

  // Input enter task name
  const [inputName, setInputName] = useState<string>("");

  // Handle Input name
  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();

    const newTask = {
      id: uuidv4(),
      taskName: inputName,
    };

    if (inputName) {
      setActiveTasks((prev) => {
        window.localStorage.setItem(
          activeTasksLocalStorageKey,
          JSON.stringify([...prev, newTask])
        );
        return [...prev, newTask];
      });
      setInputName("");
    }
  };

  // Active tasks
  const [activeTasks, setActiveTasks] = useState<Task[]>(() => {
    const activeTasksFromLocalStorage = window.localStorage.getItem(
      activeTasksLocalStorageKey
    );
    return activeTasksFromLocalStorage
      ? JSON.parse(activeTasksFromLocalStorage)
      : [];
  });

  // Completed Tasks
  const [completedTasks, setCompletedTasks] = useState<Task[]>(() => {
    const completedTasksFromLocalStorage = window.localStorage.getItem(
      completedTasksLocalStorageKey
    );
    return completedTasksFromLocalStorage
      ? JSON.parse(completedTasksFromLocalStorage)
      : [];
  });

  return (
    <TasksListContext.Provider
      value={{
        inputName,
        setInputName,
        handleAddTask,
        activeTasks,
        setActiveTasks,
        completedTasks,
        setCompletedTasks,
      }}
    >
      {children}
    </TasksListContext.Provider>
  );
};
