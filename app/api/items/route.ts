import Item from "@models/file";
import { connectToDB } from "@utils/database";

export const POST = async (req: any) => {
    const { skip } = await req.json();

    try {
        await connectToDB();
        const items = await Item.find({}, undefined, {
            skip: skip,
            limit: 2,
        });
        return new Response(JSON.stringify(items), { status: 200 });
    } catch (error) {
        return new Response(`failed with ${error}`, { status: 500 });
    }
};
