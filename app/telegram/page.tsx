"use client";
import React, { useEffect } from "react";

const page = () => {
    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(`/api/telegram`, {
                method: "POST",
            });
        };

        fetchData();
    }, []);
    return <div>telegram</div>;
};

export default page;
