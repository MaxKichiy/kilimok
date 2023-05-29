"use client";
import FormFileInput from "@components/FormFileInput";
import FormInput from "@components/FormInput";
import FormTextArea from "@components/FormTextArea";
import React, { FormEvent, useState } from "react";

const page = () => {
    const [name, setName] = useState("");
    console.log("🚀 ~ file: page.tsx:9 ~ page ~ name:", name);
    const [price, setPrice] = useState("");
    const [description, setDescription] = useState("");
    const [image, setImage] = useState<File | String>("");
    console.log("🚀 ~ file: page.tsx:13 ~ page ~ image:", image);
    const CLOUD_NAME = "diapevcxl";
    const MY_UPLOAD_PRESET = "kovriki";

    const uploadImage = async (photo: any) => {
        if (!photo.name) {
            throw new Error("NOT a FILE");
        }
        const imageData = new FormData();
        imageData.append("file", photo);
        imageData.append("upload_preset", MY_UPLOAD_PRESET);

        try {
            const res = await fetch(
                `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
                {
                    method: "POST",
                    body: imageData,
                }
            );
            const data = await res.json();

            const imageUrl = data["secure_url"];
            console.log(
                "🚀 ~ file: page.tsx:24 ~ uploadImage ~ imageUrl:",
                imageUrl
            );
            return imageUrl;
        } catch (error) {
            console.log("🚀 ~ file: page.tsx:19 ~ uploadImage ~ error:", error);
        }
    };
    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        if (!name) {
            throw new Error("empty name field");
        }
        console.log("🚀 ~ file: page.tsx:8 ~ handleSubmit ~ event:", event);
        event.preventDefault();
        const newFormData = new FormData(event.target as HTMLFormElement);
        const image = newFormData.get("image");

        try {
            const imageUrl = await uploadImage(image);
            console.log(
                "🚀 ~ file: page.tsx:44 ~ handleSubmit ~ imageUrl:",
                imageUrl
            );
            const response = await fetch("/api/files", {
                method: "POST",
                body: JSON.stringify({
                    name: newFormData.get("name"),
                    descr: newFormData.get("descr"),
                    imageUrl: imageUrl,
                    price: newFormData.get("price"),
                }),
            });

            const data = response.json();
            console.log("🚀 ~ file: page.tsx:49 ~ handleSubmit ~ data:", data);
        } catch (error) {
            console.log(
                "🚀 ~ file: page.tsx:45 ~ handleSubmit ~ error:",
                error
            );
        }
        console.log("🚀 ~ file: page.tsx:12 ~ handleSubmit ~ newFormData:", [
            ...(newFormData as any),
        ]);
    };
    return (
        <div className="flex">
            <form onSubmit={handleSubmit}>
                <FormInput
                    placeholder="Назва"
                    name="name"
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                />
                <FormInput placeholder="Ціна" name="price" />

                <FormTextArea placeholder="Опис" />
                <FormFileInput
                    value={image as any}
                    onChange={(event) => {
                        console.log(
                            "🚀 ~ file: page.tsx:111 ~ page ~ event:",
                            event
                        );

                        if (event?.target?.files?.[0]) {
                            // convertToBase64(event.target)?.then(setFile);
                            setImage(
                                URL.createObjectURL(event.target.files[0])
                            );
                        }
                    }}
                />
                <button type="submit" className="black_btn">
                    Зберегти
                </button>
            </form>
        </div>
    );
};

export default page;
