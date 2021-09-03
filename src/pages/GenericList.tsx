import { v1 as uuidv1 } from 'uuid';

import Button from 'components/Button';
import { useTodos } from 'hooks/useTodos';
import { FC, ReactNode, useCallback, useRef } from 'react';
import { RouteComponentProps, StaticContext } from 'react-router';

interface GenericListsProps {
    listTitles: string[];
}

interface RouterProps {
    rp: RouteComponentProps<{}, StaticContext, unknown>;
}

//! Generic Component function syntax
/* function UL<T>({
	items,
	render,
}: {
	items: T[];
	render: (item: T) => ReactNode;
}) {
	return (
		<ul>
			{items.map((item, index) => (
				<li key={index}>{render(item)}</li>
			))}
		</ul>
	);
} */

//! Generic Component arrow syntax with button props
//? for arrow function, must use T extends {} in jsx
//? https://stackoverflow.com/questions/41112313/how-to-use-generics-with-arrow-functions-in-typescript-jsx-with-react/41112882#41112882
const UL = <T extends {}>({
    items,
    render,
    itemClick,
    style,
    children,
}: React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLUListElement>,
    HTMLUListElement
> & {
    items: T[];
    render: (item: T) => ReactNode;
    itemClick?: (item: T) => void;
}) => {
    return (
        <ul style={{ ...style, color: 'blue' }}>
            {items.map((item, index) => (
                <li
                    key={index}
                    onClick={() => (itemClick ? itemClick(item) : null)}
                >
                    {render(item)}
                </li>
            ))}
        </ul>
    );
};

const GenericList: FC<{ title: string }> = ({ title }) => {
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
            <h2>{title}</h2>
            <UL
                className="i__have__a__className__xD"
                style={{ margin: '0', padding: '0' }}
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

const ContextWrapper: FC<GenericListsProps & RouterProps> = ({
    rp,
    listTitles,
}) => {
    return (
        <div style={{ display: 'grid', gridTemplateColumns: '50% 50%' }}>
            {listTitles.map((title) => (
                <GenericList title={title} />
            ))}
        </div>
    );
};

export default ContextWrapper;
