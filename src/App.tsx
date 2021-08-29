import Main from 'components/Main';
import {
    ReactNode,
    FC,
    FunctionComponent,
    useCallback,
    useState,
    useEffect,
    useReducer,
    useRef,
} from 'react';
import 'App.scss';

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

const List: FC<{
    items: string[];
    onClick?: (item: string) => void;
}> = ({ items, onClick }) => {
    return (
        <ul>
            {items.map((item, index) => (
                <li key={index} onClick={() => onClick?.(item)}>
                    {item}
                </li>
            ))}
        </ul>
    );
};

interface Payload {
    text: string;
}

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

function App() {
    //! custom callback
    const onListClick = useCallback((item: string) => {
        alert(item);
    }, []);

    //! useState hook
    const [payload, setPayload] = useState<Payload | null>(null);

    const getPayload = async () => {
        const res = await fetch('/data.json');
        const data = await res.json();
        setPayload(data);
    };

    useEffect(() => {
        getPayload();
    }, []);

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
        <div className="App">
            <Heading title="Introduction" />
            <Box>Hello there</Box>
            <Box2></Box2>
            <Box3> </Box3>
            <Box>{payload?.text}</Box>
            <List items={['one', 'two', 'three']} onClick={onListClick}></List>
            <Main foo={5} bar={'Hello World'}></Main>

            <Heading title="Todos" />
            {todos.map((todo, index) => (
                <div key={index}>
                    {todo.text}
                    <button
                        onClick={() =>
                            dispatch({ type: 'REMOVE', id: todo.id })
                        }
                    >
                        Remove
                    </button>
                </div>
            ))}
            <div>
                <input type="text" ref={newTodoRef} />
                <button onClick={onAddTodo}>Add Todo</button>
            </div>

            {/* <Heading title="Todos"> </Heading> */}
        </div>
    );
}

export default App;
