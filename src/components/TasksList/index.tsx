import React from "react";
import { useContext } from "react";
import { TasksListContext } from "../../TasksListContext/index";
import { Droppable } from "react-beautiful-dnd";
import { SingleTask } from "../SingleTask/index";

import "./styles.css";

const TasksList: React.FC = () => {
  const { activeTasks, completedTasks } = useContext(TasksListContext);

  return (
    <main className="tasks_container">
      <section className="active_completed_task_container">
        <Droppable droppableId="active_task">
          {(provided) => (
            <article
              className="active_task container"
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              <h2 className="title_container_task">Active tasks</h2>
              <ul className="list_container">
                {activeTasks?.map((task, index) => (
                  <SingleTask
                    isDone={false}
                    index={index}
                    key={task.id}
                    task={task}
                  />
                ))}
                {provided.placeholder}
              </ul>
            </article>
          )}
        </Droppable>
        <Droppable droppableId="completed_task">
          {(provided) => (
            <article
              className="completed_task container"
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              <h2 className="title_container_task">Completed tasks</h2>
              <ul className="list_container">
                {completedTasks.map((task, index) => (
                  <SingleTask
                    isDone={true}
                    index={index}
                    key={task.id}
                    task={task}
                  />
                ))}
                {provided.placeholder}
              </ul>
            </article>
          )}
        </Droppable>
      </section>
    </main>
  );
};

export { TasksList };
