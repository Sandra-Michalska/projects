import { useState } from "react";
import Sidebar from "./components/Sidebar";
import NoProjectSelected from "./components/NoProjectSelected";
import NewProject from "./components/NewProject";
import SelectedProject from "./components/SelectedProject";

function App() {
  const [projectsState, setProjectsState] = useState({
    selectedProjectId: undefined,
    projects: [],
    tasks: []
  });

  function handleAddTask(text) {
    setProjectsState((prevState) => {
      const taskId = Math.random();
      const newTask = {
        text: text,
        projectId: prevState.selectedProjectId,
        id: taskId
      };

      return {
        ...prevState,
        tasks: [newTask, ...prevState.tasks]
      };
    });
  }

  function handleDeleteTaskButtonClick(id) {
    setProjectsState(prevState => {
      return {
        ...prevState,
        tasks: prevState.tasks.filter(
          task => task.id !== id
        )
      };
    });
  }

  function handleSelectProjectButtonClick(id) {
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

  function handleCancelButtonClick() {
    setProjectsState(prevState => {
      return {
        ...prevState,
        selectedProjectId: undefined
      }
    });
  }

  function handleDeleteProjectButtonClick() {
    setProjectsState(prevState => {
      return {
        ...prevState,
        selectedProjectId: undefined,
        projects: prevState.projects.filter(
          project => project.id !== prevState.selectedProjectId
        ),
        tasks: prevState.tasks.filter(
          task => task.projectId !== prevState.selectedProjectId
        ),
      }
    });
  }

  const selectedProject = projectsState.projects.find(project => project.id === projectsState.selectedProjectId);
  const selectedProjectTasks = projectsState.tasks.filter(task => task.projectId === projectsState.selectedProjectId);

  let content = (
    <SelectedProject
      project={selectedProject}
      selectedProjectTasks={selectedProjectTasks}
      onDeleteProjectButtonClick={handleDeleteProjectButtonClick}
      onAddTask={handleAddTask}
      onDeleteTaskButtonClick={handleDeleteTaskButtonClick}
    />
  );

  if(projectsState.selectedProjectId === undefined) {
    content = <NoProjectSelected onAddProjectButtonClick={handleAddProjectButtonClick} />;
  } else if(projectsState.selectedProjectId === null) {
    content = <NewProject onAddProject={handleAddProject} onCancelButtonClick={handleCancelButtonClick} />;
  }

  return (
    <main className="h-screen my-8 flex gap-8">
      <Sidebar 
        onAddProjectButtonClick={handleAddProjectButtonClick}
        projects={projectsState.projects}
        selectedProjectId={projectsState.selectedProjectId}
        onSelectProjectButtonClick={handleSelectProjectButtonClick}
      />
      {content}
    </main>
  );
}

export default App;
