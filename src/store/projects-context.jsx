import { useState, createContext } from "react";

export const ProjectsContext = createContext({
    selectedProjectId: undefined,
    projects: [],
    tasks: [],
    startAddProject: () => {},
    addProject: () => {},
    deleteProject: () => {},
    selectProject: () => {},
    addTask: () => {},
    deleteTask: () => {},
    cancel: () => {}
});

export default function ProjectsContextProvider({ children }) {
    const [projectsState, setProjectsState] = useState({
        selectedProjectId: undefined,
        projects: [],
        tasks: []
    });

    function startAddProject() {
        setProjectsState(prevState => {
            return {
                ...prevState,
                selectedProjectId: null
            }
        });
    }

    function addProject(projectData) {
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

    function deleteProject() {
        setProjectsState(prevState => {
            return {
                ...prevState,
                selectedProjectId: undefined,
                projects: prevState.projects.filter(
                    project => project.id !== prevState.selectedProjectId
                ),
                tasks: prevState.tasks.filter(
                    task => task.projectId !== prevState.selectedProjectId
                )
            }
        });
    }
    
    function selectProject(id) {
        setProjectsState(prevState => {
            return {
                ...prevState,
                selectedProjectId: id
            }
        });
    }

    function addTask(text) {
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

    function deleteTask(id) {
        setProjectsState(prevState => {
            return {
                ...prevState,
                tasks: prevState.tasks.filter(
                    task => task.id !== id
                )
            };
        });
    }

    function cancel() {
        setProjectsState(prevState => {
            return {
                ...prevState,
                selectedProjectId: undefined
            }
        });
    }

    const contextValue = {
        selectedProjectId: projectsState.selectedProjectId,
        projects: projectsState.projects,
        tasks: projectsState.tasks,
        startAddProject,
        addProject,
        deleteProject,
        selectProject,
        addTask,
        deleteTask,
        cancel
    }

    return <ProjectsContext.Provider value={contextValue}>
        {children}
    </ProjectsContext.Provider>
}