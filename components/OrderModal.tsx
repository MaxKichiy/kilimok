"use client";
import React, { useState } from "react";
import Modal from "./Modal";
import FormInput from "./FormInput";
function isValidPhoneNumber(number: any) {
    const regexPattern = /^\+380 \(\d{2}\) \d{3}-\d{2}-\d{2}$/;

    return regexPattern.test(number);
}

const formatUkrainianPhoneNumber = (phoneNumber: any) => {
    const cleanedPhoneNumber = phoneNumber.replace(/\D/g, "");
    const regexPattern = /^(?:\+?38)?0?(\d{2})(\d{3})(\d{2})(\d{2})$/;
    const matches = cleanedPhoneNumber.match(regexPattern);

    if (matches) {
        const formattedNumber = `+380 (${matches[1]}) ${matches[2]}-${matches[3]}-${matches[4]}`;
        return formattedNumber;
    }
    return phoneNumber;
};
const OrderModal = ({ setShowModal, order }: any) => {
    const stringOrder = order
        .map(({ name, amount }: any) => `${name}-${amount || 1}шт`)
        .join(",");
    const [name, setName] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [city, setCity] = useState("");
    const [post, setPost] = useState("");
    const handleSubmit = async (event: any) => {
        event.preventDefault();

        if (!isValidPhoneNumber(phoneNumber)) {
            setPhoneNumber("");
            return;
        }
        try {
            const response = await fetch("/api/order", {
                method: "POST",
                body: JSON.stringify({
                    post,
                    city,
                    phoneNumber,
                    name,
                    order: stringOrder,
                }),
            });
            if (response.ok) {
                setShowModal();
            }
        } catch (error) {
            console.log(
                "🚀 ~ file: OrderModal.tsx:32 ~ handleSubmit ~ error:",
                error
            );
        }
    };
    return (
        <Modal
            onClose={() => setShowModal()}
            title=" Менеджер зв'яжеться з Вами для підтвердження замовлення
        протягом 30 хв"
        >
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <FormInput
                    name="name"
                    placeholder="ПІБ"
                    value={name}
                    onChange={(event) => setName(event?.target.value)}
                    required
                />
                <FormInput
                    name="phoneNumber"
                    value={phoneNumber}
                    placeholder="Телефон"
                    onChange={(event) => setPhoneNumber(event?.target.value)}
                    onBlur={() =>
                        setPhoneNumber(formatUkrainianPhoneNumber(phoneNumber))
                    }
                    required
                />
                <FormInput
                    name="city"
                    placeholder="Місто"
                    value={city}
                    onChange={(event) => setCity(event?.target.value)}
                    required
                />
                <FormInput
                    name="post"
                    placeholder="Номер відділення Нової Пошти"
                    value={post}
                    onChange={(event) => setPost(event?.target.value)}
                    required
                />
                <button className="black_btn">Відправити замовлення</button>
            </form>
        </Modal>
    );
};

export default OrderModal;
