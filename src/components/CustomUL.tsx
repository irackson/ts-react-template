import { ReactNode } from 'react';

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

export default UL;
