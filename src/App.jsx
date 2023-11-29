import { useState } from "react";
import Sidebar from "./components/Sidebar";
import NoProjectSelected from "./components/NoProjectSelected";
import NewProject from "./components/NewProject";
import SelectedProject from "./components/SelectedProject";

function App() {
  const [projectsState, setProjectsState] = useState({
    selectedProjectId: undefined,
    projects: []
  });

  function handleSelectProject(id) {
    setProjectsState(prevState => {
      return {
        ...prevState,
        selectedProjectId: id
      }
    });
  }

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
        selectedProjectId: undefined,
        projects: [...prevState.projects, newProject]
      };
    });
  }

  function handleCancelClick() {
    setProjectsState(prevState => {
      return {
        ...prevState,
        selectedProjectId: undefined
      }
    });
  }

  function handleDeleteProject() {
    setProjectsState(prevState => {
      return {
        ...prevState,
        selectedProjectId: undefined,
        projects: prevState.projects.filter(
          project => project.id !== prevState.selectedProjectId
        )
      }
    });
  }

  const selectedProject = projectsState.projects.find(project => project.id === projectsState.selectedProjectId);
  let content = <SelectedProject project={ selectedProject } onDeleteProject={handleDeleteProject} />;

  if(projectsState.selectedProjectId === undefined) {
    content = <NoProjectSelected onAddProjectButtonClick={handleAddProjectButtonClick} />;
  } else if(projectsState.selectedProjectId === null) {
    content = <NewProject onAddProject={handleAddProject} onCancelClick={handleCancelClick} />;
  }

  return (
    <main className="h-screen my-8 flex gap-8">
      <Sidebar 
        onAddProjectButtonClick={handleAddProjectButtonClick}
        projects={projectsState.projects}
        onSelectProject={handleSelectProject}
      />
      {content}
    </main>
  );
}

export default App;
