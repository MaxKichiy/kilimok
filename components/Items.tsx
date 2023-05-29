"use client";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import { useGlobalContext } from "@app/Context/store";

import OrderModal from "./OrderModal";

const Items = () => {
    const [items, setItems] = useState([]);
    const [skip, setSkip] = useState(0);
    const [currentOrder, setCurrentOrder] = useState(null);
    const { handleAddToCart } = useGlobalContext();

    const [showModal, setShowModal] = useState(false);

    const fetchItems = async (skip: any) => {
        const response = await fetch(`/api/items`, {
            method: "POST",
            body: JSON.stringify({ skip: skip }),
        });
        const data = await response.json();
        return data;
    };

    const fetchData = async (skip: any) => {
        const data = await fetchItems(skip);
        setItems((prev) => [...prev, ...data] as any);

        setSkip((prev) => prev + data.length);
    };

    const observerTarget = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) {
                    fetchData(skip);
                }
            },
            { threshold: 1 }
        );

        if (observerTarget.current) {
            observer.observe(observerTarget.current);
        }

        return () => {
            if (observerTarget.current) {
                observer.unobserve(observerTarget.current);
            }
        };
    }, [observerTarget, skip]);

    return (
        <div className="flex flex-col gap-2">
            {items.map((element: any) => {
                return (
                    <div key={element._id} className="prompt_card">
                        <div>
                            <Image
                                width={400}
                                height={200}
                                alt="hey"
                                src={element.imageUrl}
                            />
                        </div>
                        <h3 className="text-center p-2">{element.name}</h3>
                        <div className="flex px-5 flex-col gap-2 mt-4">
                            <button
                                className="outline_btn"
                                onClick={() => {
                                    setCurrentOrder(element);
                                    setShowModal(true);
                                }}
                            >
                                Оформити замовлення
                            </button>
                            <button
                                onClick={() =>
                                    handleAddToCart({ ...element, amount: 1 })
                                }
                                className="black_btn"
                            >
                                Добавити в кошик
                            </button>
                        </div>
                    </div>
                );
            })}
            <div className="relative">
                {showModal && (
                    <OrderModal
                        order={[currentOrder]}
                        setShowModal={() => {
                            setShowModal(false);
                            setCurrentOrder(null);
                        }}
                    />
                )}
            </div>

            <div ref={observerTarget}></div>
            <div>&nbsp;</div>
        </div>
    );
};

export default Items;
