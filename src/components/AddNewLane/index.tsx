import React, { useState } from "react";
import { useDispatch } from 'react-redux';
import { addNewLane } from "../../app/taskDetailsSlice";
import './addNewLane.scss';

const AddNewLane = () => {

    const [laneName, setLaneName] = useState("");
    const dispatch = useDispatch();

    const laneNameChangeHandler = (name: string) => {
        setLaneName(name);
    }

    const submitHandler = (): void => {
        if (laneName) {
            dispatch(addNewLane({ laneName }));
            setLaneName("");
        }
    }
    return (
        <div className="addNewLane">
            <input type="text" value={laneName} onChange={(e) => laneNameChangeHandler(e.target.value)} />
            <button onClick={submitHandler} disabled={!laneName}> Add New lane </button>
        </div>
    )
};

export default AddNewLane;