import React, { useState, useEffect } from 'react';
import './App.css';
import { Button } from '@mui/material';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import InputForm from './components/InputForm';
import { db, addTodoToFirestore } from './components/FireBase';
import { collection, getDocs } from 'firebase/firestore';

const style4 = {
  paddingTop: '8px',
  paddingLeft: '14px',
  fontWeight: 'bold',
}

const style5 = {
  borderRadius: '4px',
  backgroundColor: '#c0bebc',
  color: '#fff',
}

const style6 = {
  borderRadius: '4px',
  backgroundColor: '#3c9951',
  color: '#fff',
}

type Todo = {
  id: number;
  title: string;
};

const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  // input form 内のtodoテキストのstateとそれを管理する関数を定義したuseStateフック。初期値は空白。
  const [todoText, setTodoText] = useState('');
  // 未完了todoリスト配列のstateとそれを管理する関数を定義したuseStateフック。初期値は空白の配列。
  const [inCompleteTodos, setInCompleteTodos] = useState<string[]>([]);
  // 完了済todoリスト配列のstateとそれを管理する関数を定義したuseStateフック。初期値は空白の配列。
  const [completeTodos, setCompleteTodos] = useState<string[]>([]);
  // input form 内の変更時に実行するイベントハンドラ。eventを引数にとり、todoTextを入力値に更新する。
  const onChangeTodoText = (event: React.ChangeEvent<HTMLInputElement>) => setTodoText(event.target.value);
  // ADD ボタン押下時に実行するonClickメソッド。入力欄が空白ならば実行しない。既存の未完了todoリスト配列に新たなtodoテキストを追加した配列をnewTodosと定義。
  // 未完了todoリストをnewTodosに更新し、todoテキストを空白の初期値に更新する。
  const onClickAdd = async () => {
    if (todoText === '') return;
    await addTodoToFirestore(todoText);
    const newTodos: any = [...inCompleteTodos, todoText];
    setInCompleteTodos(newTodos);
    setTodoText('');
  }

  useEffect(() => {
    // Firestoreからデータを取得してtodosステートを更新
    const fetchData = async () => {
      try {
        const todoCollection = collection(db, 'todo');
        const querySnapshot = await getDocs(todoCollection);
        const todosData: Todo[] = [];
        querySnapshot.forEach(doc => {
          const todoData = doc.data();
          todosData.push({ id: parseInt(doc.id), title: todoData.title });
        });
        setTodos(todosData);
      } catch (error) {
        console.error('Error fetching todos:', error);
      }
    };

    fetchData();
  }, []);

  const onClickComplete = (index: number) => {
    // 新しい未完了todo配列に既存の未完了todo配列を代入する
    const newIncompleteTodos = [...inCompleteTodos];
    // 新しい未完了todo配列として、index番目の配列を1つ削除する
    newIncompleteTodos.splice(index, 1);
    // 新しい完了todo配列として、既存の完了todo配列に、index番目の未完了todoを追加する
    const newCompleteTodos = [...completeTodos, inCompleteTodos[index]];
    // 未完了todo配列を更新する
    setInCompleteTodos(newIncompleteTodos);
    // 完了todo配列を更新する
    setCompleteTodos(newCompleteTodos);
  };
  // DELETEボタン押下時に実行するonClickメソッド。引数は配列の順番を示すindex。
  const onClickDelete = (index: number) => {
    // 新しいTodo配列に既存の未完了のTodo配列を代入する
    const newTodos = [...inCompleteTodos];
    // splice構文でindex番目の配列を1つ削除する
    newTodos.splice(index, 1);
    // 1配列を削除したnewTodosに未完了todoリストを更新する
    setInCompleteTodos(newTodos);
  }
  // REVERSEボタン押下時に実行するonClickメソッド。引数は配列の順番を示すindex。
  const onClickReverse = (index: number) => {
    // 新しい完了todo配列に既存の完了todo配列を代入する
    const newCompleteTodos = [...completeTodos];
    // 新しい完了todo配列として、index番目の配列を配列を1つ削除する
    newCompleteTodos.splice(index, 1);
    // 新しい未完了todo配列として、既存の未完了todo配列に、index番目の完了todoを追加する
    const newIncompleteTodos = [...inCompleteTodos, completeTodos[index]];
    // 完了todo配列を更新する
    setCompleteTodos(newCompleteTodos);
    // 未完了todo配列を更新する
    setInCompleteTodos(newIncompleteTodos);
  }

  return (
    <>
      <div className="App">
        <div style={{ display: 'flex' }}>
          {/* TODOリスト入力フォームをInputFormコンポーネントとして分けて作成。4つのpropsをAppからInputFormに渡す。 */}
          <InputForm todoText={todoText} setTodoText={setTodoText} onChangeTodoText={onChangeTodoText} onClickAdd={onClickAdd} />
          {/* Material UI のButton要素をADDボタンに使用。クリックされたらonClickAddイベントハンドラを実行。スタイルinJSを使用。 */}
          <Button onClick={onClickAdd} style={{ marginTop: '24px' }} variant="contained">ADD</Button>
        </div>
      </div>
      {/* 未完了のTODOリスト領域 */}
      <div style={style5}>
        <p style={style4}>TASKS TO DO</p>
        {/* 以下ListやListItemはMUIを使用。*/}
        <List>
          {/* 未完了のtodo配列をmap関数で取得。  */}
          {inCompleteTodos.map((todo, index) => {
            return (

              <ListItem key={todo}>
                <ListItemText primary={todo} />
                {/* DeleteとCompletedのクリックイベントハンドラを設置。 */}
                <Button onClick={() => onClickComplete(index)} style={{ marginRight: '8px' }} variant="contained">Completed</Button>
                <Button onClick={() => onClickDelete(index)} variant="contained">Delete</Button>
              </ListItem>
            )
          })}
        </List>
      </div>
      {/* 完了済のTODOリスト領域 */}
      <div style={style6}>
        <p style={style4}>COMPLETED TASKS</p>
        <List>
          {/* 完了済のtodo配列をmap関数で取得。 */}
          {completeTodos.map((todo, index) => {
            return (
              // todo配列の各要素を特定するためのkeyの設定
              <ListItem key={todo}>
                <ListItemText primary={todo} />
                {/* Reverseのクリックイベントハンドラを設置。 */}
                <Button onClick={() => onClickReverse(index)} variant="contained">Reverse</Button>
              </ListItem>
            )
          })}
        </List>
      </div>
    </>
  );
}

export default App;
