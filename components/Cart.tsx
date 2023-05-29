"use client";

import { useGlobalContext } from "@app/Context/store";
import React, { useState } from "react";
import Modal from "./Modal";
import Image from "next/image";
import OrderModal from "./OrderModal";
import FormInput from "./FormInput";

const Cart = ({ setShowModal }: any) => {
    const { data, setData, handleAddToCart, handleRemoveFromCart } =
        useGlobalContext();
    const [showOrderDetails, setShowOrderDetails] = useState(false);

    return (
        <Modal
            onClose={() => setShowModal(false)}
            title={
                <div className="flex flex-between">
                    <span>Кошик</span>{" "}
                    <div>
                        {data.reduce(
                            (acc, curr) =>
                                acc + curr.amount * Number(curr.price),
                            0
                        )}
                        &nbsp; грн
                    </div>
                </div>
            }
        >
            <div className="flex flex-col gap-4 max-h-[500px] overflow-auto">
                {data.map((element) => (
                    <div
                        className="flex flex-col flex-center gap-3"
                        key={element._id}
                    >
                        <p className="text-xs">{element.name}</p>
                        <div className="mx-auto">
                            <Image
                                src={element.imageUrl}
                                width={160}
                                height={40}
                                alt={element.name}
                            />
                        </div>
                        <div className="flex gap-3 flex-center">
                            <div className="flex gap-2">
                                <button
                                    onClick={() =>
                                        handleRemoveFromCart({
                                            id: element._id,
                                            isLast: element.amount === 1,
                                        })
                                    }
                                    className="text-2xl"
                                >
                                    -
                                </button>
                                <FormInput
                                    className="max-w-[45px]"
                                    disabled={true}
                                    value={element.amount}
                                />
                                <button
                                    className="text-2xl"
                                    onClick={() => handleAddToCart(element)}
                                >
                                    +
                                </button>
                            </div>
                            <div>
                                {Number(element.price) * element.amount} грн
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            {data.length < 1 ? (
                <p className="text-center">Кошик Пустий</p>
            ) : (
                <button
                    className="black_btn mx-auto mt-4"
                    onClick={() => setShowOrderDetails(true)}
                >
                    Замовити
                </button>
            )}

            {showOrderDetails && (
                <OrderModal
                    order={data}
                    setShowModal={() => {
                        setShowOrderDetails(false);
                    }}
                />
            )}
        </Modal>
    );
};

export default Cart;
