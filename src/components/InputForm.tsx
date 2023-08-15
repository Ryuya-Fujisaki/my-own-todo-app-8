import { TextField } from '@mui/material'
import React from 'react'

// 後述TextFieldのスタイル指定。
const style1 = {
    width: '400px',
    height: '20px',
    padding: '8px 8px 0 0',
    margin: '10px 0 0 16px',
}

// App.tsxから渡すpropsの型を定義する
type InputFormProps = {
    todoText: string;
    setTodoText: React.Dispatch<React.SetStateAction<string>>
    onChangeTodoText: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onClickAdd: () => void;
};
// InputFormコンポーネントの定義。型はInputFormProps型で、todoTextとonChangeTodoTextを引数にとる。
const InputForm: React.FC<InputFormProps> = ({ todoText, onChangeTodoText }) => {

    return (
        <div>
            {/* Material UI のTextField要素を入力欄に使用。todoTextが入力値で、入力値に変更があったらonChangeTodoTextを実行しTodoTextを更新する。
            styleをstyle1で定義している。 */}
            <TextField
                type="text"
                value={todoText}
                onChange={onChangeTodoText}
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
