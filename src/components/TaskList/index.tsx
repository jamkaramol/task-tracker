import TaskDetails from "../TaskDetails";
import { TaskType } from "../../app/taskDetailsSlice";
import { SWIM_LANE_TYPES } from "../../app/constants";
import { getAllTasks } from "../../app/taskDetailsSlice";
import { useSelector } from 'react-redux';
import "./taskList.scss";

const TaskList = ({ type = SWIM_LANE_TYPES.WENT_WELL }: { type: SWIM_LANE_TYPES }): JSX.Element => {

    const allTaskList: any = useSelector(getAllTasks);
    const taskList: TaskType[] = allTaskList[type];
    return (
        <div className="task-list" data-testid="task-list">
            {taskList.length > 0 && taskList.map((task: TaskType) => {
                return <TaskDetails taskDetails={task} key={task.id} type={type} />
            })}
        </div>
    )
};

export default TaskList;