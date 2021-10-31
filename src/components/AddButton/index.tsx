
import './addButton.scss';

interface AddButtonType {
    onClickHandler: () => void,
    type: string
};

const AddButton = (
    { onClickHandler , type = "" }: AddButtonType) => {
    return (
        <div data-testid={"add-button" + type} className="add-button" onClick={onClickHandler}>
            +
        </div>
    )
};


export default AddButton;