import { useContext } from "react";
import { BackgroundImages } from "../BackgroundImages/index";
import { InputNewTask } from "../InputNewTask/index";
import { TasksList } from "../TasksList/index";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { TasksListContext } from "../../TasksListContext/index";
import {
  activeTasksLocalStorageKey,
  completedTasksLocalStorageKey,
} from "../../utils/globalConsts/keyLocalStorage";

import "./styles.css";

const Home: React.FC = () => {
  const { activeTasks, completedTasks, setActiveTasks, setCompletedTasks } =
    useContext(TasksListContext);

  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result;
    if (
      !destination ||
      (destination.droppableId === source.droppableId &&
        destination.index === source.index)
    )
      return;

    let add;
    const newActiveTask = [...activeTasks];
    const newCompletedTask = [...completedTasks];

    if (source.droppableId === "active_task") {
      add = newActiveTask[source.index];
      newActiveTask.splice(source.index, 1);
    } else {
      add = newCompletedTask[source.index];
      newCompletedTask.splice(source.index, 1);
    }

    if (destination.droppableId === "active_task") {
      newActiveTask.splice(destination.index, 0, add);
    } else {
      newCompletedTask.splice(destination.index, 0, add);
    }

    setActiveTasks(newActiveTask);
    setCompletedTasks(newCompletedTask);

    localStorage.setItem(
      activeTasksLocalStorageKey,
      JSON.stringify(newActiveTask)
    );
    localStorage.setItem(
      completedTasksLocalStorageKey,
      JSON.stringify(newCompletedTask)
    );
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <main className="page_container">
        <h1 className="page_container_header">Welcome to TaskTide</h1>
        <InputNewTask />
        <section className="page_container_background">
          <BackgroundImages />
          <TasksList />
        </section>
      </main>
    </DragDropContext>
  );
};

export { Home };
