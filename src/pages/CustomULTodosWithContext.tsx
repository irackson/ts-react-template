import { v1 as uuidv1 } from 'uuid';

import Button from 'components/Button';
import {
    useTodos,
    useAddTodo,
    useRemoveTodo,
    TodosProvider,
} from 'hooks/useContextTodos';
import { FC, useCallback, useRef } from 'react';
import { RouteComponentProps, StaticContext } from 'react-router';
import UL from 'components/CustomUL';

interface GenericListsProps {
    listTitles: string[];
}

interface RouterProps {
    rp: RouteComponentProps<{}, StaticContext, unknown>;
}

const GenericList: FC<{ title: string }> = ({ title }) => {
    const todos = useTodos();
    const addTodo = useAddTodo();
    const removeTodo = useRemoveTodo();

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
            <UL
                className="i__have__a__className__xD"
                style={{ margin: '1rem', padding: '1rem', listStyle: 'none' }}
                itemClick={(item) => alert(`${item.id}: ${item.text}`)}
                items={todos}
                render={(todo) => (
                    <>
                        {todo.text}
                        <Button
                            onClick={(e) => {
                                //* SO COOL --> STOPS ALERT DUE TO EVENT PROPAGATION
                                e.stopPropagation();
                                removeTodo(todo.id);
                            }}
                        >
                            Remove
                        </Button>
                    </>
                )}
            />

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

const JustShowTodos = () => {
    const todos = useTodos();
    return <UL items={todos} render={(todo) => <div>{todo.text}</div>} />;
};

const ContextWrapper: FC<GenericListsProps & RouterProps> = ({
    rp,
    listTitles,
}) => {
    return (
        <TodosProvider
            initialTodos={[{ id: uuidv1(), text: 'Click Me!', done: false }]}
        >
            <div style={{ display: 'grid', gridTemplateColumns: '50% 50%' }}>
                {listTitles.map((title, i) => (
                    <GenericList key={i} title={title} />
                ))}
            </div>
            <JustShowTodos />
        </TodosProvider>
    );
};

export default ContextWrapper;
