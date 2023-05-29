"use client";

import {
    createContext,
    useContext,
    Dispatch,
    SetStateAction,
    useState,
    ReactNode,
} from "react";

type DataType = {
    name: string;
    price: string;
    _id: string;
    description: string;
    imageUrl: string;
    amount: number;
};

interface ContextProps {
    userId: string;
    setUserId: Dispatch<SetStateAction<string>>;
    data: DataType[];
    setData: Dispatch<SetStateAction<DataType[]>>;
    handleAddToCart: any;
    handleRemoveFromCart: any;
}

const GlobalContext = createContext<ContextProps>({
    userId: "",
    setUserId: (): string => "",
    data: [],
    setData: (): DataType[] => [],
    handleAddToCart: (element: DataType) => [],
    handleRemoveFromCart: (id: string, isLast: boolean) => [],
});

export const GlobalContextProvider = ({
    children,
}: {
    children: ReactNode;
}) => {
    const [userId, setUserId] = useState("");
    const [data, setData] = useState<[] | DataType[]>([]);

    const handleAddToCart = (newElement: DataType) => {
        if (!data.length) {
            setData([newElement]);
            return;
        }
        const isElementExist = data.find(
            (element) => element._id === newElement._id
        );
        if (isElementExist) {
            setData((prev) =>
                prev.map((element) =>
                    element._id === newElement._id
                        ? { ...element, amount: element.amount + 1 }
                        : element
                )
            );
            return;
        }
        setData((prev) => [...prev, newElement]);
    };
    const handleRemoveFromCart = ({
        id,
        isLast,
    }: {
        id: string;
        isLast: boolean;
    }) => {
        setData((prev) =>
            isLast
                ? prev.filter((element) => element._id !== id)
                : prev.map((element) =>
                      element._id === id
                          ? { ...element, amount: element.amount - 1 }
                          : element
                  )
        );
    };

    return (
        <GlobalContext.Provider
            value={{
                userId,
                setUserId,
                data,
                setData,
                handleAddToCart,
                handleRemoveFromCart,
            }}
        >
            {children}
        </GlobalContext.Provider>
    );
};

export const useGlobalContext = () => useContext(GlobalContext);
