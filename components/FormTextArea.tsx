import React from "react";

const FormTextArea = ({
    className,
    ...rest
}: React.TextareaHTMLAttributes<HTMLTextAreaElement>) => {
    return (
        <textarea
            className={`form_textarea ${className}`}
            name="descr"
            {...rest}
        ></textarea>
    );
};

export default FormTextArea;
