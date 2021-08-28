import { FC } from 'react';

interface MainProps {
    foo: number;
    bar: string;
}

const Main: FC<MainProps> = (props) => {
    return (
        <>
            foo: {props.foo}, bar: {props.bar}
        </>
    );
};

export default Main;
