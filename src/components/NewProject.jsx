import { useRef } from "react";
import { useContext } from "react";
import { ProjectsContext } from "../store/projects-context";
import Input from "./Input";
import Modal from "./Modal";

export default function NewProject() {
    const projectsContext = useContext(ProjectsContext);

    const modal = useRef();

    const title = useRef();
    const description = useRef();
    const dueDate = useRef();

    function handleSave() {
        const enteredTitle = title.current.value;
        const enteredDescription = description.current.value;
        const enteredDueDate = dueDate.current.value;

        if(enteredTitle.trim() === "" || enteredDescription.trim() === "" || enteredDueDate.trim() === "") {
            modal.current.open();
            return;
        }

        projectsContext.addProject({
            title: enteredTitle,
            description: enteredDescription,
            dueDate: enteredDueDate
        });
    }

    return (
        <>
            <Modal ref={modal} buttonText="Close">
                <p className="text-stone-600 mb-4">Please provide a valid value for every input field.</p>
            </Modal>
            <div className="w-[35rem] mt-16">
                <menu className="flex items-center justify-end gap-4 my-4">
                    <li><button onClick={projectsContext.cancel} className="text-stone-800 hover:text-stone-950">Cancel</button></li>
                    <li><button onClick={handleSave} className="px-6 py-2 rounded-md bg-stone-800 text-stone-50 hover:bg-stone-950">Save</button></li>
                </menu>
                <Input type="text" ref={title} label="Title" />
                <Input ref={description} label="Description" textarea />
                <Input type="date" ref={dueDate} label="Due date"/>
            </div>
        </>
    );
}