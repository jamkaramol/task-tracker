
import { SWIM_LANE_TYPES } from "../../app/constants";
import { TaskType } from "../../app/taskDetailsSlice";
import './taskDetails.scss';
import { likeItem, updateItemDetails, deleteItem } from "../../app/taskDetailsSlice";
import { useDispatch } from "react-redux";
import { AiOutlineLike } from "react-icons/ai";
import { MdOutlineDelete } from "react-icons/md"
import { GoComment } from "react-icons/go";
import { useEffect, useState } from "react";
import AddUpdateTask from "../AddUpdateTask";

const TaskDetails = ({ taskDetails, type = "" }: { taskDetails: TaskType, type: string }): JSX.Element => {
    const [isEdit, setIsEdit] = useState(false);

    const { details, comments = [], likes = 0, id } = taskDetails;
    const dispatch = useDispatch();
    let containerClasses = "task-details "
    if (type === SWIM_LANE_TYPES.WENT_WELL) {
        containerClasses += "went-well-background";
    } else if (type === SWIM_LANE_TYPES.TO_IMPROVE) {
        containerClasses += "to-improve-background";
    } else if (type === SWIM_LANE_TYPES.ACTION_ITEMS) {
        containerClasses += "action-items-background";
    };

    const onLikeItemHandler = () => {
        dispatch(likeItem({ type: type, id }));
    };

    const detailsClickHandler = () => {
        setIsEdit(true);
    };

    const updateHandler = (updatedDetails: any) => {
        dispatch(updateItemDetails({ id: id, type, details: updatedDetails }));
        setIsEdit(false);
    };
    const onDeleteTaskHandler = () => {
        dispatch(deleteItem({ id: id, type }))
    };
    const onCancelHandler = () => {
        setIsEdit(false)
    }

    return (
        <div className={containerClasses} data-testid="task-details">
            {!isEdit && <div data-testid={"update-task" + id} className="details" onClick={detailsClickHandler}>
                {details}
            </div>}
            {isEdit && <AddUpdateTask label="Update" value={details} submitHandler={updateHandler} cancelHandler={onCancelHandler} />}
            {!isEdit && <div className="action-items">
                <div className="action-delete" data-testid={"delete-task" + id} onClick={onDeleteTaskHandler}>
                    <MdOutlineDelete />
                </div>
                <div className="action-comments">
                    <GoComment />
                    <div className="comment-count">{comments.length} </div>
                </div>
                <div className="action-like" data-testid={"like"+ id} onClick={onLikeItemHandler}>
                    <AiOutlineLike />
                    <div data-testid={"like-count" + id} className="like-count">{likes}</div>
                </div>
            </div>}
        </div>
    )
};
export default TaskDetails;