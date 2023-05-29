"use client";
import { useGlobalContext } from "@app/Context/store";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import Cart from "./Cart";

const Nav = ({ openCart }: any) => {
    const { data, setData } = useGlobalContext();
    const [showCart, setShowCart] = useState(false);
    return (
        <nav className="flex-between w-full py-3 border-b-2 px-5">
            <Link href="/" className="flex gap-2 flex-center">
                <Image
                    src="/assets/images/logo.svg"
                    alt="килимок"
                    width={30}
                    height={30}
                    className="object-contain"
                />
                <p className="logo_text">КилимОК</p>
            </Link>
            <div
                className="relative cursor-pointer"
                onClick={() => setShowCart(true)}
            >
                <Image
                    src="/assets/images/cart.svg"
                    alt="корзина"
                    width={30}
                    height={30}
                    color="#f0f"
                    className="object-contain"
                />
                {data.length > 0 && (
                    <span className="absolute number-pill bg-black text-white rounded-full w-5 h-5 flex items-center justify-center top-[-10px] right-[-10px]">
                        {data.reduce((acc, curr) => acc + curr.amount, 0)}
                    </span>
                )}
            </div>
            {showCart && <Cart setShowModal={() => setShowCart(false)} />}
        </nav>
    );
};

export default Nav;
