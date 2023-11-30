import { useContext } from "react";
import { ProjectsContext } from "./store/projects-context";
import SelectedProject from "./components/SelectedProject";
import NoProjectSelected from "./components/NoProjectSelected";
import NewProject from "./components/NewProject";
import Sidebar from "./components/Sidebar";

function App() {
    const projectsContext = useContext(ProjectsContext);

    let content = <SelectedProject />;

    if(projectsContext.selectedProjectId === undefined) {
        content = <NoProjectSelected />;
    } else if(projectsContext.selectedProjectId === null) {
        content = <NewProject />;
    }

    return (
        <main className="h-screen my-8 flex gap-8">
            <Sidebar />
            {content}
        </main>
    );
}

export default App;
