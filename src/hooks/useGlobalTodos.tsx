import { useCallback, useEffect } from 'react';
import { createGlobalState } from 'react-use';
import { v1 as uuidv1 } from 'uuid';

interface Todo {
    id: string;
    done: boolean;
    text: string;
}

const useGlobalTodos = createGlobalState<Todo[]>([]);

export function useTodos(initialTodos: Todo[]): {
    todos: Todo[];
    addTodo: (text: string) => void;
    removeTodo: (id: string) => void;
} {
    const [todos, setTodos] = useGlobalTodos();

    useEffect(() => {
        setTodos(initialTodos);
    }, [initialTodos, setTodos]);

    const addTodo = useCallback(
        (text: string) => {
            setTodos([
                ...todos,
                {
                    id: uuidv1(),
                    text: text,
                    done: false,
                },
            ]);
        },
        [todos, setTodos]
    );

    const removeTodo = useCallback(
        (removeId: string) => {
            setTodos(todos.filter(({ id }) => id !== removeId));
        },
        [todos, setTodos]
    );

    return { todos, addTodo, removeTodo };
}
