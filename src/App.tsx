import Main from 'components/Main';
import { ReactNode, FC, FunctionComponent, useCallback } from 'react';
import 'App.scss';

const Heading = ({ title }: { title: string }) => <h2>{title}</h2>;

//* uses ReactNode as type for child props
const Box = ({ children }: { children: ReactNode }) => {
    return (
        <div style={{ padding: '1 rem', fontWeight: 'bold' }}>{children}</div>
    );
};
//* uses type FC as alias for interface FunctionComponent
const Box2: FC = () => {
    return <div>Hi FC</div>;
};
//* uses interface FunctionComponent
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

function App() {
    const onListClick = useCallback((item: string) => {
        alert(item);
    }, []);

    return (
        <div className="App">
            <Heading title="Introduction"></Heading>
            <Box>Hello there</Box>
            <Box2> </Box2>
            <Box3> </Box3>
            <List items={['one', 'two', 'three']} onClick={onListClick}></List>
            <Main foo={5} bar={'Hello World'}></Main>
        </div>
    );
}

export default App;
