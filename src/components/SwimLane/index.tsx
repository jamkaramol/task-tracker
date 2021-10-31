import { useState } from "react";
import AddButton from "../AddButton";
import AddUpdateTask from "../AddUpdateTask";
import TaskList from "../TaskList";
import './swimLane.scss';
import { addItem } from '../../app/taskDetailsSlice';
import { useDispatch } from "react-redux";
import { SWIM_LANE_TYPES } from "../../app/constants";
import { MdDragIndicator } from "react-icons/md";
import { HiDotsVertical } from "react-icons/hi";

const SwimLane = (
    {
        label = "",
        type = SWIM_LANE_TYPES.WENT_WELL
    }: { label: string, type: SWIM_LANE_TYPES })
    : JSX.Element => {
    const dispatch = useDispatch();
    const [isShowAddTask, setIsShowAddTask] = useState(false);

    const onClickHandler = () => {
        setIsShowAddTask(true);
    };

    const getNewTask = (details: string) => {
        return {
            id: new Date().getTime(),
            details,
            type: type,
            likes: 0,
            comments: []
        }
    }

    const addTaskHandler = (taskDetails: string) => {
        dispatch(addItem({
            type: type,
            payload: getNewTask(taskDetails)
        }));
        setIsShowAddTask(false);
    };
    const onCancelHandler = () => {
        setIsShowAddTask(false);
    }

    return (
        <div className="swim-lane" data-testid={type}>
            <div className="lane-heading">
                <MdDragIndicator />
                {label}
                <HiDotsVertical />
            </div>
            <AddButton onClickHandler={onClickHandler} type={type} />
            {isShowAddTask && <AddUpdateTask label="Add" submitHandler={addTaskHandler} cancelHandler={onCancelHandler} />}
            <TaskList type={type} />
        </div>
    )

};

export default SwimLane;