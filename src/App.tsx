import { TasksListContextProvider } from "./TasksListContext";
import { Home } from "./components/Home";

const App: React.FC = () => {
  return (
    <TasksListContextProvider>
      <Home />
    </TasksListContextProvider>
  );
};

export default App;
