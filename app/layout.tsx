import Nav from "@components/Nav";
import "@styles/global.css";

export const metadata = {
    title: "КилимОК",
    description: "Found your best kovrik in the world",
};
const RootLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <html lang="ru">
            <body>
                <div className="main">
                    <div className="gradient" />
                </div>
                <main className="app">
                    <Nav />
                    {children}
                </main>
            </body>
        </html>
    );
};

export default RootLayout;
