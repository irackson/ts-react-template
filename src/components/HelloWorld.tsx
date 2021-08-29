import { FC } from 'react';

interface HelloWorldProps {
    foo: number;
    bar: string;
}

const HelloWorld: FC<HelloWorldProps> = (props) => {
    return (
        <>
            foo: {props.foo}, bar: {props.bar}
        </>
    );
};

export default HelloWorld;
