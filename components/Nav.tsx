import Image from "next/image";
import Link from "next/link";
import React from "react";

const Nav = () => {
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

            <Image
                src="/assets/images/cart.svg"
                alt="корзина"
                width={30}
                height={30}
                color="#f0f"
                className="object-contain"
            />
        </nav>
    );
};

export default Nav;
