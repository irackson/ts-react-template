import { v1 as uuidv1 } from 'uuid';

import Button from 'components/Button';
import { useTodos } from 'hooks/useGlobalTodos';
import { FC, useCallback, useRef } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import UL from 'components/CustomUL';
interface GlobalTodosProps {
    title: string;
}

const initialTodos = [{ id: uuidv1(), text: 'Hey there', done: false }];

const GlobalTodos: FC<GlobalTodosProps> = ({ title }) => {
    const { todos, addTodo, removeTodo } = useTodos(initialTodos);

    //! useRef hook
    const newTodoRef = useRef<HTMLInputElement>(null);

    // //! another useCallback event handler
    const onAddTodo = useCallback(() => {
        if (newTodoRef.current) {
            addTodo(newTodoRef.current.value);
            newTodoRef.current.value = '';
        }
    }, [addTodo]);

    return (
        <div>
            <h2>{title}</h2>
            {todos.map((todo, index) => (
                <div key={index}>
                    {todo.text}
                    <Button onClick={() => removeTodo(todo.id)}>Remove</Button>
                </div>
            ))}
            <div>
                <input type="text" ref={newTodoRef} />
                <Button
                    onClick={onAddTodo}
                    style={{ textDecoration: 'underline' }}
                    title={'Add Todo'}
                ></Button>
            </div>
        </div>
    );
};

const JustTheTodos = () => {
    const { todos } = useTodos(initialTodos);

    return (
        <UL
            items={todos}
            itemClick={() => {}}
            render={(todo) => <div>{todo.text}</div>}
        />
    );
};

const GlobalWrapper: FC<{ listTitles: string[] } & RouteComponentProps> = ({
    listTitles,
}) => {
    return (
        <div style={{ display: 'grid', gridTemplateColumns: '50% 50%' }}>
            {listTitles.map((title, i) => (
                <GlobalTodos key={i} title={title} />
            ))}
            <JustTheTodos />
        </div>
    );
};

export default GlobalWrapper;
