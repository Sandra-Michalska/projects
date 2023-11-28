import { useState } from "react";
import Sidebar from "./components/Sidebar";
import NoProjectSelected from "./components/NoProjectSelected";
import NewProject from "./components/NewProject";

function App() {
  const [projectsState, setProjectsState] = useState({
    selectedProjectId: undefined,
    projects: []
  });

  function handleAddProjectButtonClick() {
    setProjectsState(prevState => {
      return {
        ...prevState,
        selectedProjectId: null
      }
    });
  }

  function handleAddProject(projectData) {
    setProjectsState(prevState => {
      const newProject = {
        ...projectData,
        id: Math.random()
      };

      return {
        ...prevState,
        projects: [...prevState.projects, newProject]
      };
    });
  }

  let content;

  if(projectsState.selectedProjectId === undefined) {
    content = <NoProjectSelected onAddProjectButtonClick={handleAddProjectButtonClick} />;
  } else if(projectsState.selectedProjectId === null) {
    content = <NewProject onAddProject={handleAddProject} />;
  }

  return (
    <main className="h-screen my-8 flex gap-8">
      <Sidebar onAddProjectButtonClick={handleAddProjectButtonClick} />
      {content}
    </main>
  );
}

export default App;
