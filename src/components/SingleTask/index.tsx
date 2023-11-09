import React from "react";
import { useContext } from "react";
import { TasksListContext } from "../../TasksListContext/index";
import { useEffect, useRef, useState } from "react";
import { Task } from "../../utils/modelTask";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import { MdOutlineDoneOutline } from "react-icons/md";
import { Draggable } from "react-beautiful-dnd";
import {
  activeTasksLocalStorageKey,
  completedTasksLocalStorageKey,
} from "../../utils/globalConsts/keyLocalStorage";

import "./styles.css";

type Props = {
  index: number;
  isDone: boolean;
  task: Task;
};

const SingleTask: React.FC<Props> = ({ index, task, isDone }) => {
  const { activeTasks, setActiveTasks, completedTasks, setCompletedTasks } =
    useContext(TasksListContext);

  const inputRef = useRef<HTMLInputElement>(null);
  const [edit, setEdit] = useState<boolean>(false);
  const [editTask, setEditTask] = useState<string>(task.taskName);

  useEffect(() => {
    inputRef.current?.focus();
  }, [edit]);

  const renderIsSelectedEdit = () => {
    if (edit && !isDone) {
      return (
        <input
          ref={inputRef}
          type="input"
          value={editTask}
          onChange={(e) => setEditTask(e.target.value)}
          className="form_container_input_edit"
        />
      );
    } else {
      return (
        <span
          className={
            isDone
              ? "taskDone form_container_taskName"
              : "form_container_taskName"
          }
        >
          {task.taskName}
        </span>
      );
    }
  };

  const editSingleTask = (e: React.FormEvent, id: string) => {
    e.preventDefault();

    const editActiveTask = activeTasks.map((task) =>
      task.id === id ? { ...task, taskName: editTask } : task
    );

    const editaCompletedTask = completedTasks.map((task) =>
      task.id === id ? { ...task, taskName: editTask } : task
    );

    window.localStorage.setItem(
      completedTasksLocalStorageKey,
      JSON.stringify(editaCompletedTask)
    );
    window.localStorage.setItem(
      activeTasksLocalStorageKey,
      JSON.stringify(editActiveTask)
    );

    setCompletedTasks(editaCompletedTask);
    setActiveTasks(editActiveTask);

    setEdit(false);
  };

  const deleteTask = () => {
    const deleteActiveTask = activeTasks.filter(
      (singleTask) => singleTask !== task
    );
    const deleteCompletedTask = completedTasks.filter(
      (singleTask) => singleTask !== task
    );

    setCompletedTasks(deleteCompletedTask);
    setActiveTasks(deleteActiveTask);

    window.localStorage.setItem(
      completedTasksLocalStorageKey,
      JSON.stringify(deleteCompletedTask)
    );

    window.localStorage.setItem(
      activeTasksLocalStorageKey,
      JSON.stringify(deleteActiveTask)
    );
  };

  const isDoneTask = () => {
    if (isDone) {
      const newCompletedTasks = completedTasks.filter(
        (completedTask) => completedTask.id !== task.id
      );
      setActiveTasks([...activeTasks, task]);
      setCompletedTasks(newCompletedTasks);
      window.localStorage.setItem(
        activeTasksLocalStorageKey,
        JSON.stringify([...activeTasks, task])
      );
      window.localStorage.setItem(
        completedTasksLocalStorageKey,
        JSON.stringify(newCompletedTasks)
      );
    } else {
      const newActiveTasks = activeTasks.filter(
        (activeTask) => activeTask.id !== task.id
      );
      setActiveTasks(newActiveTasks);
      setCompletedTasks([...completedTasks, task]);
      window.localStorage.setItem(
        activeTasksLocalStorageKey,
        JSON.stringify(newActiveTasks)
      );
      window.localStorage.setItem(
        completedTasksLocalStorageKey,
        JSON.stringify([...completedTasks, task])
      );
    }
  };

  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided) => (
        <form
          className="form_container_task"
          onSubmit={(e) => editSingleTask(e, task.id)}
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          {renderIsSelectedEdit()}
          <div className="icon_container">
            <span className="icon" onClick={() => setEdit(!edit)}>
              <AiOutlineEdit />
            </span>
            <span className="icon" onClick={deleteTask}>
              <AiOutlineDelete />
            </span>
            <span className="icon" onClick={isDoneTask}>
              <MdOutlineDoneOutline />
            </span>
          </div>
        </form>
      )}
    </Draggable>
  );
};

export { SingleTask };
