"use client";
import Image from "next/image";
import React, { useCallback, useEffect, useRef, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";

const Items = () => {
    const [items, setItems] = useState([]);
    const [skip, setSkip] = useState(0);
    const [isNoMore, setIsNoMore] = useState(false);
    console.log("🚀 ~ file: Items.tsx:7 ~ Items ~ skip:", skip);
    console.log("🚀 ~ file: Items.tsx:7 ~ Items ~ items:", items);
    const fetchItems = async (skip: any) => {
        console.log("🚀 ~ file: Items.tsx:15 ~ fetchItems ~ skip:", skip);

        const response = await fetch(`/api/items`, {
            method: "POST",
            body: JSON.stringify({ skip: skip }),
        });
        const data = await response.json();
        console.log("🚀 ~ file: Items.tsx:11 ~ fetchItems ~ data:", data);
        return data;
    };
    // useEffect(() => {
    //     const fetchFirstTime = async () => {
    //         const data = await fetchItems();
    //         setSkip(data.length);
    //         setItems((prev) => [...prev, ...data]);
    //     };
    //     fetchFirstTime();
    // }, []);

    const fetchData = async (skip: any) => {
        console.log("🚀 ~ file: Items.tsx:37 ~ fetchData ~ fetchData:");
        const data = await fetchItems(skip);
        console.log("🚀 ~ file: Items.tsx:27 ~ fetchData ~ data:", data);
        setItems((prev) => [...prev, ...data] as any);

        setSkip((prev) => prev + data.length);
    };

    const observerTarget = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                console.log(
                    "🚀 ~ file: Items.tsx:64 ~ useEffect ~ entries:",
                    entries
                );

                if (entries[0].isIntersecting) {
                    console.log(
                        "🚀 ~ file: Items.tsx:39 ~ Items ~ observerTarget:",
                        observerTarget
                    );
                    console.log(
                        "🚀 ~ file: Items.tsx:57 ~ useEffect ~ skip:",
                        skip
                    );

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
                            <button className="outline_btn">
                                Оформити замовлення
                            </button>
                            <button className="black_btn">
                                Добавити в кошик
                            </button>
                        </div>
                    </div>
                );
            })}
            <div ref={observerTarget}></div>
            <div>&nbsp;</div>
        </div>
    );
    // return (
    //     <InfiniteScroll
    //         dataLength={items.length} //This is important field to render the next data
    //         next={fetchData}
    //         hasMore={true}
    //         loader={<h4>Loading...</h4>}
    //         endMessage={
    //             <p style={{ textAlign: "center" }}>
    //                 <b>Yay! You have seen it all</b>
    //             </p>
    //         }
    //     >
    //         <div>
    //             {items.map((element) => {
    //                 return (
    //                     <div key={element._id} className="prompt_card">
    //                         <div>
    //                             {/* <Image
    //              width={400}
    //              height={200}
    //              alt="hey"
    //              src="/assets/images/test.png"
    //          /> */}
    //                         </div>
    //                         <h3>{element.name}</h3>
    //                         <div className="flex flex-col gap-2 mt-4">
    //                             <button className="outline_btn">
    //                                 Оформити замовлення
    //                             </button>
    //                             <button className="black_btn">
    //                                 Добавити в кошик
    //                             </button>
    //                         </div>
    //                     </div>
    //                 );
    //             })}
    //         </div>
    //     </InfiniteScroll>
    // );
};

export default Items;
