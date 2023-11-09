import React from "react";
import { useContext } from "react";
import { TasksListContext } from "../../TasksListContext/index";
import { Droppable } from "react-beautiful-dnd";
import { SingleTask } from "../SingleTask/index";

import "./styles.css";
import { LoadingSkeleton } from "../LoadingSkeleton";

const TasksList: React.FC = () => {
  const { activeTasks, completedTasks, loader, messageError } =
    useContext(TasksListContext);

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
              {loader && <LoadingSkeleton />}
              {messageError && <p>Oh no, hubo un error</p>}
              {!loader && activeTasks.length === 0 && (
                <p className="message">Create your task</p>
              )}
              <ul className={loader ? "hidden" : "list_container"}>
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
              {loader && <LoadingSkeleton />}
              {messageError && <p>Oh no, hubo un error</p>}
              {!loader && completedTasks.length === 0 && (
                <p className="message">No tasks completed</p>
              )}
              <ul className={loader ? "hidden" : "list_container"}>
                {completedTasks?.map((task, index) => (
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
