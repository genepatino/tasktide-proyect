import { createContext, useEffect, useState } from "react";
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
  activeTasks: Task[];
  completedTasks: Task[];
  loader: boolean;
  messageError: boolean;
  setInputName: React.Dispatch<React.SetStateAction<string>>;
  setActiveTasks: React.Dispatch<React.SetStateAction<Task[]>>;
  setCompletedTasks: React.Dispatch<React.SetStateAction<Task[]>>;
  setLoader: React.Dispatch<React.SetStateAction<boolean>>;
  setMessageError: React.Dispatch<React.SetStateAction<boolean>>;
  handleAddTask: (e: React.FormEvent) => void;
}

export const TasksListContext = createContext<TasksContext>({} as TasksContext);

export const TasksListContextProvider = ({ children }: TaskChildrenProps) => {
  //Declaramos los distintos estados estados o funciones globales

  //Loader
  const [loader, setLoader] = useState<boolean>(true);

  //Message error
  const [messageError, setMessageError] = useState<boolean>(false);

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

  useEffect(() => {
    setTimeout(() => {
      try {
        const activeTasksFromLocalStorage = window.localStorage.getItem(
          activeTasksLocalStorageKey
        );
        activeTasksFromLocalStorage
          ? JSON.parse(activeTasksFromLocalStorage)
          : [];

        const completedTasksFromLocalStorage = window.localStorage.getItem(
          completedTasksLocalStorageKey
        );
        completedTasksFromLocalStorage
          ? JSON.parse(completedTasksFromLocalStorage)
          : [];

        setLoader(false);
      } catch (error) {
        setLoader(false);
        setMessageError(true);
      }
    }, 2000);
  }, []);

  return (
    <TasksListContext.Provider
      value={{
        inputName,
        activeTasks,
        completedTasks,
        loader,
        messageError,
        setInputName,
        setActiveTasks,
        setCompletedTasks,
        setLoader,
        setMessageError,
        handleAddTask,
      }}
    >
      {children}
    </TasksListContext.Provider>
  );
};
