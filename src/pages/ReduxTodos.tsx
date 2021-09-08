import Button from 'components/Button';
import { FC, useCallback, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import { addTodo, removeTodo, selectTodos } from 'store';

interface ReduxTodosProps {
    title: string;
}

const ReduxTodos: FC<ReduxTodosProps & RouteComponentProps> = ({ title }) => {
    const todos = useSelector(selectTodos);
    const dispatch = useDispatch();
    //! useRef hook
    const newTodoRef = useRef<HTMLInputElement>(null);

    // //! another useCallback event handler
    const onAddTodo = useCallback(() => {
        if (newTodoRef.current) {
            dispatch(addTodo(newTodoRef.current.value));
            newTodoRef.current.value = '';
        }
    }, [dispatch]);

    return (
        <div>
            <h2>{title}</h2>
            {todos.map((todo, index) => (
                <div key={index}>
                    {todo.text}
                    <Button onClick={() => dispatch(removeTodo(todo.id))}>
                        Remove
                    </Button>
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

export default ReduxTodos;
