import Nav from "@components/Nav";
import "@styles/global.css";
import { GlobalContextProvider } from "./Context/store";

export const metadata = {
    title: "КилимОК",
    description: "Found your best kovrik in the world",
};
const RootLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <html lang="ru">
            <body>
                <GlobalContextProvider>
                    <div className="main">
                        <div className="gradient" />
                    </div>
                    <main className="app relative">
                        <Nav />
                        <div className="mt-20">{children}</div>
                    </main>

                    <div id="modal-root"></div>
                </GlobalContextProvider>
            </body>
        </html>
    );
};

export default RootLayout;
