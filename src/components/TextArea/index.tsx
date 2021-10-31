import './textArea.scss';

const TextArea = ({ value, onChange }: { value: string, onChange: (e: any) => void }): JSX.Element => {
    return (
        <div className="task-text-area">
            <textarea
                data-testid="task-text-area-id"
                className="task-text-area"
                name="task-details"
                id="task-details"
                placeholder="Type something..."
                value={value}
                onChange={onChange}>
            </textarea>
        </div>
    );
};

export default TextArea;