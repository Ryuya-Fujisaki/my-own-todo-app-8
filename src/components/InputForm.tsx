import { TextField } from '@mui/material'
import React from 'react'

const style1 = {
    width: '400px',
    height: '20px',
    padding: '8px 8px 0 0',
    margin: '10px 0 0 16px',
}

type InputFormProps = {
    todoText: string;
    setTodoText: React.Dispatch<React.SetStateAction<string>>
    onChangeTodoText: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onClickAdd: () => void;
};

const InputForm: React.FC<InputFormProps> = ({ todoText, setTodoText, onChangeTodoText, onClickAdd }) => {
    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            event.stopPropagation();
            onClickAdd();
        }
    };

    return (
        <div>
            <TextField
                type="text"
                value={todoText}
                onChange={onChangeTodoText}
                onKeyDown={handleKeyDown}
                style={style1}
                id="standard-textarea"
                label="Please describe 'todo' here."
                placeholder="And press 'ADD' button."
                multiline
                variant="standard"
            />
        </div>
    )
}

export default InputForm
