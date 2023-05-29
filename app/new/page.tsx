"use client";
import FormFileInput from "@components/FormFileInput";
import FormInput from "@components/FormInput";
import FormTextArea from "@components/FormTextArea";
import React, { FormEvent, useState } from "react";

const page = () => {
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [description, setDescription] = useState("");
    const [image, setImage] = useState<File | String>("");
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
            return imageUrl;
        } catch (error) {
            console.log("🚀 ~ file: page.tsx:19 ~ uploadImage ~ error:", error);
        }
    };
    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        if (!name) {
            throw new Error("empty name field");
        }
        event.preventDefault();
        const newFormData = new FormData(event.target as HTMLFormElement);
        const image = newFormData.get("image");

        try {
            const imageUrl = await uploadImage(image);
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
        } catch (error) {
            console.log(
                "🚀 ~ file: page.tsx:45 ~ handleSubmit ~ error:",
                error
            );
        }
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
