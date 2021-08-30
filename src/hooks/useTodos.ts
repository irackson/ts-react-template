import { v1 as uuidv1 } from 'uuid';

import { useCallback, useReducer } from 'react';

interface Todo {
    id: string;
    done: boolean;
    text: string;
}

type ActionType =
    | {
          type: 'ADD';
          text: string;
      }
    | {
          type: 'REMOVE';
          id: string;
      };
export function useTodos(initialTodos: Todo[]): {
    todos: Todo[];
    addTodo: (text: string) => void;
    removeTodo: (id: string) => void;
} {
    //! useReducer hook
    const [todos, dispatch] = useReducer(
        (state: Todo[], action: ActionType) => {
            switch (action.type) {
                case 'ADD':
                    return [
                        ...state,
                        {
                            id: uuidv1(),
                            text: action.text,
                            done: false,
                        },
                    ];
                case 'REMOVE':
                    return state.filter(({ id }) => id !== action.id);
                default:
                    throw new Error();
            }
        },
        initialTodos
    );

    const addTodo = useCallback((text: string) => {
        dispatch({
            type: 'ADD',
            text,
        });
    }, []);

    const removeTodo = useCallback((id: string) => {
        dispatch({
            type: 'REMOVE',
            id,
        });
    }, []);

    return { todos, addTodo, removeTodo };
}
