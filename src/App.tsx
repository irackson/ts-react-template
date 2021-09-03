import 'App.scss';
import Button from 'components/Button';
import HelloWorld from 'components/HelloWorld';
import CleanTodos from 'pages/CleanTodos';
import GenericListsWrappedWithContext from 'pages/CustomULTodosWithContext';
import {
    FC,
    FunctionComponent,
    ReactNode,
    useCallback,
    useEffect,
    useReducer,
    useRef,
    useState,
} from 'react';
import { Link, Route, Switch } from 'react-router-dom';

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

interface Todo {
    id: number;
    done: boolean;
    text: string;
}

interface Payload {
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

//! clean version of using ReturnType (a utility type) to type useState as props in a Custom Hook 😀
//* allows DRY changing of ex. number to string
const useNumber = (initialValue: number) => useState<number>(initialValue);

type UseNumberValue = ReturnType<typeof useNumber>[0];
type UseNumberSetValue = ReturnType<typeof useNumber>[1];

const Incrementer: FC<{
    value: UseNumberValue;
    setValue: UseNumberSetValue;
}> = ({ value, setValue }) => (
    <Button
        onClick={() => setValue(value + 1)}
        title={`Add - ${value}`}
    ></Button>
);

//! verbose version of typing useState as props
/* const Incrementer: FC<{
    value: number;
    setValue: React.Dispatch<React.SetStateAction<number>>;
}> = ({ value, setValue }) => (
    <Button onClick={() => setValue(value + 1)}>Add - {value}</Button>
); */

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

    const [value, setValue] = useNumber(0);

    return (
        <div className="App">
            <Link to={'/'}>Home</Link>
            <span> | </span>
            <Link to={'/clean-todos'}>Clean Todos</Link>
            <span> | </span>
            <Link to={'/generic-list'}>Generic List</Link>
            <Switch>
                <Route
                    exact
                    path="/"
                    render={(rp) => (
                        <div>
                            <HelloWorld
                                foo={5}
                                bar={'Hello World'}
                            ></HelloWorld>
                            <Heading title="Introduction" />
                            <Box>Hello there</Box>
                            <Box2></Box2>
                            <Box3> </Box3>
                            <Box>{payload?.text}</Box>
                            <List
                                items={['one', 'two', 'three']}
                                onClick={onListClick}
                            ></List>
                            <Incrementer value={value} setValue={setValue} />

                            <Heading title="Todos" />
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
                    )}
                />
                <Route
                    path="/clean-todos"
                    render={(rp) => <CleanTodos rp={rp} blah={'hi'} />}
                />
                <Route
                    path="/generic-list"
                    render={(rp) => (
                        <GenericListsWrappedWithContext
                            rp={rp}
                            listTitles={['A List', 'Another List']}
                        />
                    )}
                />
            </Switch>
        </div>
    );
}

export default App;
