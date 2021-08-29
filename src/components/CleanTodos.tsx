import {
    ReactNode,
    FC,
    FunctionComponent,
    useCallback,
    useState,
    useEffect,
    useReducer,
    useRef,
    ButtonHTMLAttributes,
    DetailedHTMLProps,
} from 'react';
import { RouteComponentProps, StaticContext } from 'react-router';
const Heading = ({ title }: { title: string }) => <h2>{title}</h2>;

//???  use React.FunctionComponent by convention. only use FC if you need the `children` property. doing `children: React.ReactNode` is also fine if you want to be very explicit.

//! uses ReactNode as type for child props
const Box = ({ children }: { children: ReactNode }) => {
    return (
        <div style={{ padding: '1 rem', fontWeight: 'bold' }}>{children}</div>
    );
};

//! uses type FC as alias for interface FunctionComponent
const Box2: FC = () => {
    return <div>Hi FC</div>;
};
//! uses interface FunctionComponent
const Box3: FunctionComponent = () => {
    return <div>Hi FunctionComponent</div>;
};

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

//! typing Custom Props with DetailedHTMLProps to create a DSL component
const Button: FunctionComponent<
    DetailedHTMLProps<
        ButtonHTMLAttributes<HTMLButtonElement>,
        HTMLButtonElement
    > & { title?: string }
> = ({ title, children, style, ...rest }) => (
    <button
        {...rest}
        style={{
            ...style,
            backgroundColor: 'red',
            color: 'white',
            fontSize: 'xx-large',
        }}
    >
        {/* super cool syntax */}
        {/* {title ?? children} */}
        {title ? `t: ${title}` : children}
    </button>
);

interface CleanTodosProps {
    blah: string;
}

interface RouterProps {
    rp: RouteComponentProps<{}, StaticContext, unknown>;
}

const CleanTodos: FC<CleanTodosProps & RouterProps> = ({ rp, blah }) => {
    useEffect(() => {
        console.log(rp.history.location.pathname);
        console.log(blah);
    }, [rp]);

    //! useReducer hook
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
            <Heading title="Introduction" />
            <Box>Hello there</Box>
            <Box2></Box2>
            <Box3> </Box3>

            <Heading title="Todos" />
            {todos.map((todo, index) => (
                <div key={index}>
                    {todo.text}
                    <Button
                        onClick={() =>
                            dispatch({ type: 'REMOVE', id: todo.id })
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

export default CleanTodos;
