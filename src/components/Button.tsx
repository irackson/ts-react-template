import {
    ButtonHTMLAttributes,
    DetailedHTMLProps,
    FunctionComponent,
} from 'react';

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
        {title ? `😎${title}😎` : children}
    </button>
);

export default Button;
