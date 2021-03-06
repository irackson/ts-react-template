import { v1 as uuidv1 } from 'uuid';

import Button from 'components/Button';
import { useTodos } from 'hooks/useTodos';
import { FC, useCallback, useEffect, useRef } from 'react';
import { RouteComponentProps } from 'react-router-dom';
interface CleanTodosProps {
    blah: string;
}

const CleanTodos: FC<CleanTodosProps & RouteComponentProps> = ({
    blah,
    history,
}) => {
    useEffect(() => {
        console.log('rp: ', history.location.pathname);
        console.log('fc props: ', blah);
    }, [history, blah]);

    const { todos, addTodo, removeTodo } = useTodos([
        { id: uuidv1(), text: 'Hey there', done: false },
    ]);

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
            <h2>Clean Todos</h2>
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

export default CleanTodos;
