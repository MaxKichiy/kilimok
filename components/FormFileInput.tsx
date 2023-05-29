"use client";
import { convertToBase64 } from "@utils/utils";
import Image from "next/image";
import React, { useState } from "react";

const FormFileInput = ({
    value,
    ...rest
}: React.InputHTMLAttributes<HTMLInputElement>) => {
    return (
        <div>
            <label className="outline_btn">
                Виберіть картинку
                <input
                    id="image"
                    name="image"
                    type="file"
                    className="hidden"
                    {...rest}
                />
            </label>
            {value && (
                <Image
                    width={200}
                    height={100}
                    src={value as any}
                    alt=""
                    unoptimized
                />
            )}
        </div>
    );
};

export default FormFileInput;
