import { v1 as uuidv1 } from 'uuid';

import { useCallback, useReducer, useContext, createContext, FC } from 'react';

interface Todo {
    id: string;
    done: boolean;
    text: string;
}

type UseTodosManagerResult = ReturnType<typeof useTodosManager>;

const TodoContext = createContext<UseTodosManagerResult>({
    todos: [],
    addTodo: () => {},
    removeTodo: () => {},
});

type ActionType =
    | {
          type: 'ADD';
          text: string;
      }
    | {
          type: 'REMOVE';
          id: string;
      };
function useTodosManager(initialTodos: Todo[]): {
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

export const TodosProvider: FC<{
    initialTodos: Todo[];
}> = ({ initialTodos, children }) => (
    <TodoContext.Provider value={useTodosManager(initialTodos)}>
        {children}
    </TodoContext.Provider>
);

export const useTodos = (): Todo[] => {
    const { todos } = useContext(TodoContext);
    return todos;
};

export const useAddTodo = (): UseTodosManagerResult['addTodo'] => {
    const { addTodo } = useContext(TodoContext);
    return addTodo;
};

export const useRemoveTodo = (): UseTodosManagerResult['removeTodo'] => {
    const { removeTodo } = useContext(TodoContext);
    return removeTodo;
};
