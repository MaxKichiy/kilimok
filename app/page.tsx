import Items from "@components/Items";
import Image from "next/image";

const Home = () => {
    return (
        <section className="w-full px-2 flex-center flex-col">
            <h1 className="head_text  orange_gradient text-center">
                КилимОК
                <br className="max-md:hid den" />
            </h1>
            <h2>
                <span className="desc text-center">
                    Придверні килимки з унікальними принтами
                </span>
            </h2>

            <div className="flex flex-col gap-2">
                <Items />
            </div>
        </section>
    );
};

export default Home;
