import { useContext, useRef } from "react";
import { TasksListContext } from "../../TasksListContext/index";

import "./styles.css";

const InputNewTask: React.FC = () => {
  const { handleAddTask, inputName, setInputName } =
    useContext(TasksListContext);

  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <form
      className="form_container"
      onSubmit={(e) => {
        handleAddTask(e);
        inputRef.current?.blur();
      }}
    >
      <input
        ref={inputRef}
        value={inputName}
        onChange={(e) => setInputName(e.target.value)}
        className="form_container_input"
        type="input"
        placeholder="Wash the doggy"
      />
      <button className="form_container_button" type="submit">
        Save
      </button>
    </form>
  );
};

export { InputNewTask };
