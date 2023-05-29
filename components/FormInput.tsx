import React from "react";

const FormInput = ({
    className,
    ...rest
}: React.InputHTMLAttributes<HTMLInputElement>) => {
    return (
        <input className={`form_input ${className}`} type="text" {...rest} />
    );
};

export default FormInput;
