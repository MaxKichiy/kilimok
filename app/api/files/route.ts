import Item from "@models/file";
import { connectToDB } from "@utils/database";

export const POST = async (req: any) => {
    const data = await req.json();
    console.log("Hello --------------");
    try {
        await connectToDB();
        const newItem = new Item({
            name: data.name,
            description: data.descr,
            price: data.price,
            imageUrl: data.imageUrl,
        });
        await newItem.save();
    } catch (error) {
        console.log("🚀 ~ file: route.ts:11 ~ POST ~ error:", error);
    }
};
// const getFiles = async () => {
//     await connectToDB();

//     const isFiles = await Item.findOne();
// };
