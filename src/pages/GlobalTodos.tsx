import Button from 'components/Button';
import { useCallback, useReducer, useRef, FC } from 'react';
import { RouteComponentProps } from 'react-router-dom';

//! uses ReactNode as type for child props

interface Todo {
    id: number;
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
          id: number;
      };

interface GlobalTodoProps {
    title: string;
}

const GlobalTodos: FC<GlobalTodoProps & RouteComponentProps> = ({ title }) => {
    const [todos, dispatch] = useReducer(
        (state: Todo[], action: ActionType) => {
            switch (action.type) {
                case 'ADD':
                    return [
                        ...state,
                        {
                            id: state.length,
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
        []
    );

    //! useRef hook
    const newTodoRef = useRef<HTMLInputElement>(null);

    //! another useCallback event handler
    const onAddTodo = useCallback(() => {
        if (newTodoRef.current) {
            dispatch({
                type: 'ADD',
                text: newTodoRef.current.value,
            });
            newTodoRef.current.value = '';
        }
    }, []);

    return (
        <div>
            <h2>{title}</h2>
            {todos.map((todo, index) => (
                <div key={index}>
                    {todo.text}
                    <Button
                        onClick={() =>
                            dispatch({
                                type: 'REMOVE',
                                id: todo.id,
                            })
                        }
                    >
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

export default GlobalTodos;
