import { useState } from "react";
import TextArea from "../TextArea";

const AddUpdateTask = ({ submitHandler, label = "Submit", value = "", cancelHandler }:
    { submitHandler: (taskDetails: string) => void, label: string, value?: string, cancelHandler: () => void }) => {

    const [taskDetails, setTaskDetails] = useState(value);

    const onChangeHandler = (event: any) => {
        const { target: { value } } = event;
        setTaskDetails(value);
    };

    return (
        <div>
            <TextArea value={taskDetails} onChange={onChangeHandler} />
            <button data-testid="submit-task" onClick={() => submitHandler(taskDetails)} > {label} </button>
            <button data-testid="cancel-task" onClick={cancelHandler} > Cancel </button>
        </div>
    );
};

export default AddUpdateTask;